(function () {
  'use strict';

  let allQuestions = [];
  let quizQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let selectedFilter = 'all';
  let wrongAnswers = [];
  let answered = false;

  const STATS_KEY = 'jlpt4_stats';

  const TYPE_LABELS = {
    reading: '읽기',
    writing: '쓰기',
    context: '문맥 어휘',
    synonym: '유의 표현',
    grammar: '문법',
    weak: '약한 문제'
  };

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem(STATS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }

  function recordAnswer(questionId, isCorrect) {
    var stats = loadStats();
    if (!stats[questionId]) {
      stats[questionId] = { correct: 0, wrong: 0 };
    }
    if (isCorrect) {
      stats[questionId].correct++;
    } else {
      stats[questionId].wrong++;
    }
    saveStats(stats);
  }

  function getWeakQuestions() {
    var stats = loadStats();
    return allQuestions.filter(function (q) {
      var s = stats[q.id];
      if (!s) return false;
      if (s.wrong === 0) return false;
      return s.wrong >= s.correct;
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
  fetch('data/n4.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      allQuestions = data;
      updateQuestionCount();
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
    var typeLabel = selectedFilter === 'all' ? '전체' : TYPE_LABELS[selectedFilter];
    questionCountEl.textContent = typeLabel + ' ' + total + '문제 중 ' + quizSize + '문제 출제';
  }

  function getFilteredQuestions() {
    if (selectedFilter === 'all') return allQuestions.slice();
    if (selectedFilter === 'weak') return getWeakQuestions();
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
    startQuiz(questions);
  });

  function showQuestion() {
    answered = false;
    btnNext.style.display = 'none';
    var q = quizQuestions[currentIndex];
    var total = quizQuestions.length;

    progressText.textContent = (currentIndex + 1) + ' / ' + total;
    scoreText.textContent = score + '점';
    progressFill.style.width = ((currentIndex / total) * 100) + '%';
    typeBadge.textContent = TYPE_LABELS[q.type] || q.type;

    sentenceEl.innerHTML = q.sentence;
    questionEl.textContent = q.question;

    choicesEl.innerHTML = '';
    q.choices.forEach(function (choice, i) {
      var btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = '<span class="choice-label">' + CHOICE_LABELS[i] + '</span><span>' + choice + '</span>';
      btn.addEventListener('click', function () {
        selectAnswer(i);
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

    buttons.forEach(function (btn, i) {
      btn.classList.add('disabled');
      if (i === correct) {
        btn.classList.add('correct');
      }
      if (i === selected && selected !== correct) {
        btn.classList.add('wrong');
      }
    });

    if (selected === correct) {
      score++;
      scoreText.textContent = score + '점';
      recordAnswer(q.id, true);
    } else {
      wrongAnswers.push({
        question: q,
        selected: selected
      });
      recordAnswer(q.id, false);
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
      btnNext.textContent = '결과 보기';
    } else {
      btnNext.textContent = '다음 →';
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

    document.getElementById('result-score-num').textContent = score;
    document.getElementById('result-total-num').textContent = total;
    document.getElementById('result-percent').textContent = percent + '%';

    var msg = '';
    if (percent === 100) msg = '만점! 완벽합니다!';
    else if (percent >= 80) msg = '훌륭합니다!';
    else if (percent >= 60) msg = '좋아요, 조금만 더!';
    else if (percent >= 40) msg = '복습이 필요해요.';
    else msg = '더 열심히 공부합시다!';
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
          '<div class="wrong-yours">내 답: ' + item.question.choices[item.selected] + '</div>' +
          '<div class="wrong-answer">정답: ' + item.question.choices[item.question.answer] + '</div>';
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
        selectAnswer(keyMap[e.key]);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btnNext.click();
    }
  });
})();
