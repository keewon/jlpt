(function () {
  'use strict';

  var translations = {
    en: {
      subtitle: 'Vocabulary Quiz',
      filterLabel: 'Question Type',
      filterAll: 'All',
      filterReading: 'Reading (読み)',
      filterWriting: 'Writing (書き)',
      filterContext: 'Context',
      filterSynonym: 'Synonyms',
      filterGrammar: 'Grammar',
      filterReview: 'Review',
      startBtn: 'Start',
      homeTitle: 'Home',
      nextBtn: 'Next →',
      viewResult: 'View Result',
      resultTitle: 'Result',
      wrongReviewTitle: 'Review Mistakes',
      retryWrongBtn: 'Retry Mistakes',
      restartBtn: 'Home',
      scoreUnit: ' pts',
      questionCountFmt: '{size} of {total} {type} questions',
      msgPerfect: 'Perfect score!',
      msgGreat: 'Great job!',
      msgGood: 'Good, almost there!',
      msgReview: 'Needs more review.',
      msgStudyMore: 'Keep studying!',
      yourAnswer: 'Your answer: ',
      correctAnswer: 'Correct: ',
      typeLabelReading: 'Reading',
      typeLabelWriting: 'Writing',
      typeLabelContext: 'Context',
      typeLabelSynonym: 'Synonym',
      typeLabelGrammar: 'Grammar',
      typeLabelReview: 'Review'
    },
    'zh-CN': {
      subtitle: '文字·词汇 测验',
      filterLabel: '题目类型',
      filterAll: '全部',
      filterReading: '读音 (読み)',
      filterWriting: '书写 (書き)',
      filterContext: '语境词汇',
      filterSynonym: '近义表达',
      filterGrammar: '语法',
      filterReview: '复习',
      startBtn: '开始',
      homeTitle: '返回首页',
      nextBtn: '下一题 →',
      viewResult: '查看结果',
      resultTitle: '结果',
      wrongReviewTitle: '错题回顾',
      retryWrongBtn: '重做错题',
      restartBtn: '返回首页',
      scoreUnit: '分',
      questionCountFmt: '{type} {total}题中出{size}题',
      msgPerfect: '满分！完美！',
      msgGreat: '太棒了！',
      msgGood: '不错，再加把劲！',
      msgReview: '需要复习。',
      msgStudyMore: '继续努力！',
      yourAnswer: '你的答案: ',
      correctAnswer: '正确答案: ',
      typeLabelReading: '读音',
      typeLabelWriting: '书写',
      typeLabelContext: '语境',
      typeLabelSynonym: '近义',
      typeLabelGrammar: '语法',
      typeLabelReview: '复习'
    },
    'zh-TW': {
      subtitle: '文字·語彙 測驗',
      filterLabel: '題目類型',
      filterAll: '全部',
      filterReading: '讀音 (読み)',
      filterWriting: '書寫 (書き)',
      filterContext: '語境詞彙',
      filterSynonym: '近義表達',
      filterGrammar: '文法',
      filterReview: '複習',
      startBtn: '開始',
      homeTitle: '返回首頁',
      nextBtn: '下一題 →',
      viewResult: '查看結果',
      resultTitle: '結果',
      wrongReviewTitle: '錯題回顧',
      retryWrongBtn: '重做錯題',
      restartBtn: '返回首頁',
      scoreUnit: '分',
      questionCountFmt: '{type} {total}題中出{size}題',
      msgPerfect: '滿分！完美！',
      msgGreat: '太棒了！',
      msgGood: '不錯，再加把勁！',
      msgReview: '需要複習。',
      msgStudyMore: '繼續努力！',
      yourAnswer: '你的答案: ',
      correctAnswer: '正確答案: ',
      typeLabelReading: '讀音',
      typeLabelWriting: '書寫',
      typeLabelContext: '語境',
      typeLabelSynonym: '近義',
      typeLabelGrammar: '文法',
      typeLabelReview: '複習'
    },
    ja: {
      subtitle: '文字·語彙クイズ',
      filterLabel: '問題タイプ',
      filterAll: 'すべて',
      filterReading: '読み',
      filterWriting: '書き',
      filterContext: '文脈語彙',
      filterSynonym: '類義表現',
      filterGrammar: '文法',
      filterReview: '復習',
      startBtn: 'スタート',
      homeTitle: 'ホームへ',
      nextBtn: '次へ →',
      viewResult: '結果を見る',
      resultTitle: '結果',
      wrongReviewTitle: '間違えた問題',
      retryWrongBtn: '間違えた問題をやり直す',
      restartBtn: 'ホームへ',
      scoreUnit: '点',
      questionCountFmt: '{type} {total}問中{size}問出題',
      msgPerfect: '満点！完璧です！',
      msgGreat: '素晴らしい！',
      msgGood: 'いいですね、もう少し！',
      msgReview: '復習が必要です。',
      msgStudyMore: 'もっと頑張りましょう！',
      yourAnswer: 'あなたの答え: ',
      correctAnswer: '正解: ',
      typeLabelReading: '読み',
      typeLabelWriting: '書き',
      typeLabelContext: '文脈',
      typeLabelSynonym: '類義',
      typeLabelGrammar: '文法',
      typeLabelReview: '復習'
    },
    ko: {
      subtitle: '문자·어휘 퀴즈',
      filterLabel: '문제 유형 선택',
      filterAll: '전체',
      filterReading: '읽기 (読み)',
      filterWriting: '쓰기 (書き)',
      filterContext: '문맥 어휘',
      filterSynonym: '유의 표현',
      filterGrammar: '문법',
      filterReview: '복습',
      startBtn: '시작하기',
      homeTitle: '처음으로',
      nextBtn: '다음 →',
      viewResult: '결과 보기',
      resultTitle: '결과',
      wrongReviewTitle: '틀린 문제 복습',
      retryWrongBtn: '틀린 문제만 다시',
      restartBtn: '처음으로',
      scoreUnit: '점',
      questionCountFmt: '{type} {total}문제 중 {size}문제 출제',
      msgPerfect: '만점! 완벽합니다!',
      msgGreat: '훌륭합니다!',
      msgGood: '좋아요, 조금만 더!',
      msgReview: '복습이 필요해요.',
      msgStudyMore: '더 열심히 공부합시다!',
      yourAnswer: '내 답: ',
      correctAnswer: '정답: ',
      typeLabelReading: '읽기',
      typeLabelWriting: '쓰기',
      typeLabelContext: '문맥 어휘',
      typeLabelSynonym: '유의 표현',
      typeLabelGrammar: '문법',
      typeLabelReview: '복습'
    },
    vi: {
      subtitle: 'Trắc nghiệm Từ vựng',
      filterLabel: 'Loại câu hỏi',
      filterAll: 'Tất cả',
      filterReading: 'Đọc (読み)',
      filterWriting: 'Viết (書き)',
      filterContext: 'Ngữ cảnh',
      filterSynonym: 'Đồng nghĩa',
      filterGrammar: 'Ngữ pháp',
      filterReview: 'Ôn tập',
      startBtn: 'Bắt đầu',
      homeTitle: 'Trang chủ',
      nextBtn: 'Tiếp →',
      viewResult: 'Xem kết quả',
      resultTitle: 'Kết quả',
      wrongReviewTitle: 'Ôn lại câu sai',
      retryWrongBtn: 'Làm lại câu sai',
      restartBtn: 'Trang chủ',
      scoreUnit: ' đ',
      questionCountFmt: '{type} {size}/{total} câu',
      msgPerfect: 'Điểm tuyệt đối!',
      msgGreat: 'Xuất sắc!',
      msgGood: 'Tốt lắm, cố thêm!',
      msgReview: 'Cần ôn tập thêm.',
      msgStudyMore: 'Hãy cố gắng hơn!',
      yourAnswer: 'Đáp án của bạn: ',
      correctAnswer: 'Đáp án đúng: ',
      typeLabelReading: 'Đọc',
      typeLabelWriting: 'Viết',
      typeLabelContext: 'Ngữ cảnh',
      typeLabelSynonym: 'Đồng nghĩa',
      typeLabelGrammar: 'Ngữ pháp',
      typeLabelReview: 'Ôn tập'
    }
  };

  var currentLang = 'ko';
  var onLangChange = [];

  function detectLang() {
    var saved = localStorage.getItem('jlpt_lang');
    if (saved && translations[saved]) return saved;

    var nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('zh')) {
      if (nav === 'zh-tw' || nav === 'zh-hk' || nav.includes('hant')) return 'zh-TW';
      return 'zh-CN';
    }
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('vi')) return 'vi';
    return 'en';
  }

  function t(key, params) {
    var str = (translations[currentLang] && translations[currentLang][key]) ||
              translations.ko[key] || key;
    if (params) {
      Object.keys(params).forEach(function (k) {
        str = str.replace('{' + k + '}', params[k]);
      });
    }
    return str;
  }

  function applyToDOM() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.title = t(el.dataset.i18nTitle);
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    document.title = 'JLPT ' + t('subtitle');

    var langAttr = currentLang;
    if (currentLang === 'zh-CN') langAttr = 'zh-Hans';
    else if (currentLang === 'zh-TW') langAttr = 'zh-Hant';
    document.documentElement.lang = langAttr;
  }

  function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('jlpt_lang', lang);
    applyToDOM();
    onLangChange.forEach(function (cb) { cb(lang); });
  }

  function getLang() {
    return currentLang;
  }

  // Initialize
  currentLang = detectLang();
  applyToDOM();

  // Set up lang button handlers
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.dataset.lang);
    });
  });

  window.i18n = { t: t, setLang: setLang, getLang: getLang, onLangChange: onLangChange };
})();
