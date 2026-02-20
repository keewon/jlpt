(function () {
  'use strict';

  var t = window.i18n.t;

  var QUESTION_INSTRUCTIONS = {
    reading: '＿＿の ことばは ひらがなで どう かきますか。',
    writing: '＿＿の ことばは どう かきますか。',
    context: '（　）に なにを いれますか。',
    synonym: '＿＿の ぶんと だいたい おなじ いみの ぶんは どれですか。',
    grammar: '（　）に なにを いれますか。'
  };

  let allQuestions = [];
  let quizQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let selectedFilter = 'all';
  let selectedLevel = 'n5';
  let wrongAnswers = [];
  let answered = false;

  function statsKey() {
    return 'jlpt_' + selectedLevel + '_stats';
  }

  function getTypeLabel(type) {
    var key = 'typeLabel' + type.charAt(0).toUpperCase() + type.slice(1);
    return t(key);
  }

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem(statsKey())) || {};
    } catch (e) {
      return {};
    }
  }

  function saveStats(stats) {
    localStorage.setItem(statsKey(), JSON.stringify(stats));
  }

  var BOX_INTERVALS = [0, 86400000, 259200000, 604800000, 2592000000]; // 0, 1d, 3d, 7d, 30d

  function recordAnswer(questionId, isCorrect) {
    var stats = loadStats();
    if (!stats[questionId]) {
      stats[questionId] = { correct: 0, wrong: 0, box: 0 };
    }
    var s = stats[questionId];
    if (isCorrect) {
      s.correct++;
      s.box = Math.min((s.box || 0) + 1, 4);
      s.lastCorrect = Date.now();
    } else {
      s.wrong++;
      s.box = 0;
      s.lastWrong = Date.now();
    }
    saveStats(stats);
  }

  function isDue(s) {
    if (!s) return false;
    // Migration: no box field means old data
    if (s.box === undefined) {
      return s.wrong > 0 && s.wrong >= s.correct;
    }
    if (s.box === 0) return true;
    var lastAnswered = Math.max(s.lastCorrect || 0, s.lastWrong || 0);
    if (lastAnswered === 0) return true;
    return Date.now() >= lastAnswered + BOX_INTERVALS[s.box];
  }

  function getReviewQuestions() {
    var stats = loadStats();
    return allQuestions.filter(function (q) {
      return isDue(stats[q.id]);
    });
  }

  const CHOICE_LABELS = ['A', 'B', 'C', 'D'];

  // DOM elements
  const screenStart = document.getElementById('screen-start');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenResult = document.getElementById('screen-result');
  const btnStart = document.getElementById('btn-start');
  const btnNext = document.getElementById('btn-next');
  const btnRestart = document.getElementById('btn-restart');
  const btnRetryWrong = document.getElementById('btn-retry-wrong');
  const btnHome = document.getElementById('btn-home');
  const questionCountEl = document.getElementById('question-count');
  const progressText = document.getElementById('progress-text');
  const scoreText = document.getElementById('score-text');
  const progressFill = document.getElementById('progress-fill');
  const typeBadge = document.getElementById('type-badge');
  const sentenceEl = document.getElementById('sentence');
  const questionEl = document.getElementById('question');
  const choicesEl = document.getElementById('choices');

  // Load questions
  function loadQuestions() {
    fetch('data/' + selectedLevel + '.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        allQuestions = data;
        updateQuestionCount();
      });
  }

  loadQuestions();

  // Level buttons
  document.querySelectorAll('.level-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.level-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      selectedLevel = btn.dataset.level;
      loadQuestions();
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      selectedFilter = btn.dataset.type;
      updateQuestionCount();
    });
  });

  function updateQuestionCount() {
    var filtered = getFilteredQuestions();
    var total = filtered.length;
    var quizSize = Math.min(total, QUIZ_SIZE);
    var typeLabel = selectedFilter === 'all' ? t('filterAll') : getTypeLabel(selectedFilter);
    questionCountEl.textContent = t('questionCountFmt', { type: typeLabel, total: total, size: quizSize });
    updateReviewCount();
  }

  function getFilteredQuestions() {
    if (selectedFilter === 'all') return allQuestions.slice();
    if (selectedFilter === 'review') return getReviewQuestions();
    return allQuestions.filter(function (q) { return q.type === selectedFilter; });
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function showScreen(screen) {
    [screenStart, screenQuiz, screenResult].forEach(function (s) {
      s.classList.remove('active');
    });
    screen.classList.add('active');
    window.scrollTo(0, 0);
  }

  var QUIZ_SIZE = 20;

  function startQuiz(questions) {
    quizQuestions = shuffle(questions).slice(0, QUIZ_SIZE);
    currentIndex = 0;
    score = 0;
    wrongAnswers = [];
    showScreen(screenQuiz);
    showQuestion();
  }

  // Start button
  btnStart.addEventListener('click', function () {
    var questions = getFilteredQuestions();
    if (questions.length === 0) return;
    logEvent('quiz_start', { level: selectedLevel, filter: selectedFilter, question_count: Math.min(questions.length, QUIZ_SIZE) });
    startQuiz(questions);
  });

  var choiceOrder = [];

  function showQuestion() {
    answered = false;
    btnNext.style.display = 'none';
    var q = quizQuestions[currentIndex];
    var total = quizQuestions.length;

    progressText.textContent = (currentIndex + 1) + ' / ' + total;
    scoreText.textContent = score + t('scoreUnit');
    progressFill.style.width = ((currentIndex / total) * 100) + '%';
    typeBadge.textContent = getTypeLabel(q.type);

    sentenceEl.innerHTML = q.sentence;
    questionEl.textContent = QUESTION_INSTRUCTIONS[q.type] || q.question;

    // Shuffle choice order
    choiceOrder = [0, 1, 2, 3];
    shuffle(choiceOrder);

    choicesEl.innerHTML = '';
    choiceOrder.forEach(function (origIdx, displayIdx) {
      var btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = '<span class="choice-label">' + CHOICE_LABELS[displayIdx] + '</span><span>' + q.choices[origIdx] + '</span>';
      btn.addEventListener('click', function () {
        selectAnswer(origIdx);
      });
      choicesEl.appendChild(btn);
    });
  }

  function selectAnswer(selected) {
    if (answered) return;
    answered = true;

    var q = quizQuestions[currentIndex];
    var correct = q.answer;
    var buttons = choicesEl.querySelectorAll('.choice-btn');

    buttons.forEach(function (btn, displayIdx) {
      var origIdx = choiceOrder[displayIdx];
      btn.classList.add('disabled');
      if (origIdx === correct) {
        btn.classList.add('correct');
      }
      if (origIdx === selected && selected !== correct) {
        btn.classList.add('wrong');
      }
    });

    if (selected === correct) {
      score++;
      scoreText.textContent = score + t('scoreUnit');
      recordAnswer(q.id, true);
      logEvent('answer_correct', { level: selectedLevel, question_type: q.type, question_id: q.id });
    } else {
      wrongAnswers.push({
        question: q,
        selected: selected
      });
      recordAnswer(q.id, false);
      logEvent('answer_wrong', { level: selectedLevel, question_type: q.type, question_id: q.id });
    }

    // Show readings for choices if available
    if (q.readings) {
      buttons.forEach(function (btn, displayIdx) {
        var origIdx = choiceOrder[displayIdx];
        if (q.readings[origIdx] !== q.choices[origIdx]) {
          var readingEl = document.createElement('span');
          readingEl.className = 'choice-reading';
          readingEl.textContent = q.readings[origIdx];
          btn.appendChild(readingEl);
        }
      });
    }

    // Show explanation if available
    if (q.explanations) {
      var expDiv = document.createElement('div');
      expDiv.className = 'explanation';
      expDiv.textContent = q.explanations[selected];
      choicesEl.appendChild(expDiv);
    }

    // Last question: show result after brief delay
    if (currentIndex === quizQuestions.length - 1) {
      btnNext.textContent = t('viewResult');
    } else {
      btnNext.textContent = t('nextBtn');
    }
    btnNext.style.display = 'block';
  }

  // Next button
  btnNext.addEventListener('click', function () {
    if (currentIndex < quizQuestions.length - 1) {
      currentIndex++;
      showQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    showScreen(screenResult);
    var total = quizQuestions.length;
    var percent = Math.round((score / total) * 100);
    logEvent('quiz_complete', { level: selectedLevel, filter: selectedFilter, score: score, total: total, percent: percent });

    document.getElementById('result-score-num').textContent = score;
    document.getElementById('result-total-num').textContent = total;
    document.getElementById('result-percent').textContent = percent + '%';

    var msg = '';
    if (percent === 100) msg = t('msgPerfect');
    else if (percent >= 80) msg = t('msgGreat');
    else if (percent >= 60) msg = t('msgGood');
    else if (percent >= 40) msg = t('msgReview');
    else msg = t('msgStudyMore');
    document.getElementById('result-message').textContent = msg;

    // Wrong answers
    var wrongSection = document.getElementById('wrong-section');
    var wrongList = document.getElementById('wrong-list');
    wrongList.innerHTML = '';

    if (wrongAnswers.length > 0) {
      wrongSection.style.display = 'block';
      btnRetryWrong.style.display = 'block';

      wrongAnswers.forEach(function (item) {
        var div = document.createElement('div');
        div.className = 'wrong-item';
        div.innerHTML =
          '<div class="wrong-sentence">' + item.question.sentence + '</div>' +
          '<div class="wrong-yours">' + t('yourAnswer') + item.question.choices[item.selected] + '</div>' +
          '<div class="wrong-answer">' + t('correctAnswer') + item.question.choices[item.question.answer] + '</div>';
        wrongList.appendChild(div);
      });
    } else {
      wrongSection.style.display = 'none';
      btnRetryWrong.style.display = 'none';
    }
  }

  // Restart
  btnRestart.addEventListener('click', function () {
    showScreen(screenStart);
  });

  // Home (quit quiz)
  btnHome.addEventListener('click', function () {
    showScreen(screenStart);
  });

  // Retry wrong
  btnRetryWrong.addEventListener('click', function () {
    var retryQuestions = wrongAnswers.map(function (item) { return item.question; });
    startQuiz(retryQuestions);
  });

  // Keyboard support
  document.addEventListener('keydown', function (e) {
    if (!screenQuiz.classList.contains('active')) return;

    if (!answered) {
      var keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
      if (keyMap[e.key] !== undefined) {
        selectAnswer(choiceOrder[keyMap[e.key]]);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btnNext.click();
    }
  });

  function updateReviewCount() {
    var badge = document.getElementById('review-count');
    if (!badge) return;
    var count = getReviewQuestions().length;
    badge.textContent = count > 0 ? count : '';
  }

  // Re-render dynamic text when language changes
  window.i18n.onLangChange.push(function () {
    updateQuestionCount();
  });
})();
