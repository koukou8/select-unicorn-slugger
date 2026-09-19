(() => {
  'use strict';

  const themes = {
    maker: { caption: 'CRAFTED FOR YOUR SWING' },
    unicorn: { caption: 'TOKYO UNICORN BASEBALL CLUB' }
  };

  const models = {
    'US-1': {
      tagline: '振りやすさも、飛距離も。',
      description: '飛距離も振り抜きやすさも欲しい人のための、扱いやすいトップバランスです。83.5cm・84.5cm・85.5cmを展開しています。',
      tags: ['トップバランス', '操作性', '飛距離', '83.5 / 84.5 / 85.5cm'],
      caution: 'ミート性能を最優先するならUS-3、より強い長打力を求めるならUS-4またはUS-5も比較してください。',
      comparison: '振りやすさと飛距離の両立を軸にした、扱いやすいトップバランスモデルです。'
    },
    'US-3': {
      tagline: 'ミートのしやすさで、打球を前へ運ぶ。',
      description: 'グリップ寄りの重心を持つトルピード型。タイカップ気味のグリップと高いミート性能が特徴です。',
      tags: ['トルピード型', 'ミート性能', 'グリップ寄り'],
      caution: 'US-3より飛距離を強く求め、多少の操作難度を許容できる場合はUS-5が候補です。',
      comparison: 'ミート性能とグリップ寄りの操作感を重視するトルピード型です。'
    },
    'US-4': {
      tagline: 'ヘッドを走らせて、長打を狙う。',
      description: '太めのバレルとスーパートップバランスで、5モデル中いちばん飛距離を狙える長打特化モデルです。',
      tags: ['スーパートップ', '太めバレル', '飛距離No.1'],
      caution: '強いトップバランスに慣れていない場合は、まずUS-1またはUS-5との比較をおすすめします。',
      comparison: '強いトップバランスと太めのバレルで、最も飛距離を追求する長打特化モデルです。'
    },
    'US-5': {
      tagline: 'もう少し飛ばしたい人へ。',
      description: 'セミトップバランスのトルピード型です。US-3よりヘッドが効き、細めのグリップで飛距離を狙えます。',
      tags: ['セミトップ', 'トルピード型', '飛距離'],
      caution: '操作性やミート性能を最優先する場合は、US-3も比較して選びましょう。',
      comparison: 'US-3の扱いやすさをベースに、よりヘッドを効かせて飛距離を狙うモデルです。'
    }
  };

  const questions = [
    { category: 'PRIORITY', title: 'バット選びで、いちばん大事にしたいのは？', weight: 3, answers: [
      { label: '振り抜きやすさ', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 2} },
      { label: '飛距離と操作性の両立', scores: {'US-1': 5, 'US-3': 4, 'US-4': 3, 'US-5': 4} },
      { label: 'とにかく飛距離', scores: {'US-1': 3, 'US-3': 2, 'US-4': 5, 'US-5': 4} },
      { label: 'ミートしやすさ・打率', scores: {'US-1': 4, 'US-3': 5, 'US-4': 1, 'US-5': 2} }
    ] },
    { category: 'BALANCE', title: '好みに近い重心はどれですか？', weight: 3, answers: [
      { label: '強いトップバランス', scores: {'US-1': 3, 'US-3': 1, 'US-4': 5, 'US-5': 4} },
      { label: '少しヘッドが効く程度', scores: {'US-1': 5, 'US-3': 3, 'US-4': 3, 'US-5': 5} },
      { label: 'バランス型・よく分からない', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 3} },
      { label: 'グリップ寄り・コンパクト', scores: {'US-1': 3, 'US-3': 5, 'US-4': 1, 'US-5': 2} }
    ] },
    { category: 'SWING', title: '普段のスイングに最も近いのは？', weight: 2, answers: [
      { label: 'ヘッドを走らせて、強く振り切る', scores: {'US-1': 3, 'US-3': 1, 'US-4': 5, 'US-5': 4} },
      { label: 'コンパクトに振り抜く', scores: {'US-1': 5, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: '状況に応じて、両方使いたい', scores: {'US-1': 5, 'US-3': 4, 'US-4': 3, 'US-5': 4} }
    ] },
    { category: 'FEEL', title: 'ヘッドの重さは、どう感じたいですか？', weight: 2, answers: [
      { label: 'しっかり感じて、打球を押し込みたい', scores: {'US-1': 3, 'US-3': 2, 'US-4': 5, 'US-5': 4} },
      { label: '疲れにくさ・振りやすさを優先したい', scores: {'US-1': 5, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: 'まだよく分からない', scores: {'US-1': 5, 'US-3': 4, 'US-4': 2, 'US-5': 3} }
    ] },
    { category: 'GRIP', title: 'グリップの好みはありますか？', weight: 1, answers: [
      { label: '細め＋小さめのグリップエンド', scores: {'US-1': 2, 'US-3': 2, 'US-4': 5, 'US-5': 3} },
      { label: '細めが好み。ただしエンドの安心感も欲しい', scores: {'US-1': 3, 'US-3': 3, 'US-4': 1, 'US-5': 5} },
      { label: 'タイカップ系の握りが好き', scores: {'US-1': 2, 'US-3': 5, 'US-4': 2, 'US-5': 3} },
      { label: '特にこだわりはない', scores: {'US-1': 3, 'US-3': 3, 'US-4': 3, 'US-5': 3} }
    ] },
    { category: 'CURRENT BAT', title: '今使っているバットに近いのは？', weight: 2, answers: [
      { label: 'ビヨンド／レガシー系のトップバランス', scores: {'US-1': 3, 'US-3': 1, 'US-4': 5, 'US-5': 3} },
      { label: 'トップバランスだが、もう少し扱いやすくしたい', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 2} },
      { label: 'バランス型・ミドル系', scores: {'US-1': 4, 'US-3': 4, 'US-4': 1, 'US-5': 3} },
      { label: '初めて買う・比較対象がない', scores: {'US-1': 3, 'US-3': 3, 'US-4': 1, 'US-5': 3} }
    ] },
    { category: 'CHALLENGE', title: '飛距離を求めるなら、操作の難しさはどこまで許容できますか？', weight: 2, answers: [
      { label: '多少の操作難度は許容できる', scores: {'US-1': 3, 'US-3': 2, 'US-4': 3, 'US-5': 5} },
      { label: '強いトップバランスでも問題ない', scores: {'US-1': 2, 'US-3': 1, 'US-4': 5, 'US-5': 4} },
      { label: 'できるだけ扱いやすい方がよい', scores: {'US-1': 5, 'US-3': 5, 'US-4': 1, 'US-5': 1} }
    ] }
  ];

  const state = { current: 0, selections: Array(questions.length).fill(null) };
  const byId = (id) => document.getElementById(id);
  const els = {
    intro: byId('intro-panel'), diagnosis: byId('diagnosis-panel'), result: byId('result-panel'),
    start: byId('start-button'), next: byId('next-button'), back: byId('back-button'), restart: byId('restart-button'),
    progressLabel: byId('progress-label'), progressFill: byId('progress-fill'), category: byId('question-category'),
    title: byId('question-title'), answers: byId('answer-list'), hint: byId('selection-hint'), themeCaption: byId('theme-caption')
  };

  function setupTheme() {
    const requested = new URLSearchParams(window.location.search).get('ui');
    const theme = Object.prototype.hasOwnProperty.call(themes, requested) ? requested : 'maker';
    document.body.dataset.theme = theme;
    els.themeCaption.textContent = themes[theme].caption;
    document.querySelector('.wordmark').setAttribute('href', `?ui=${theme}`);
  }

  function showPanel(panel) {
    [els.intro, els.diagnosis, els.result].forEach((element) => element.classList.add('is-hidden'));
    panel.classList.remove('is-hidden');
  }

  function renderQuestion() {
    const question = questions[state.current];
    const selected = state.selections[state.current];
    els.progressLabel.innerHTML = `QUESTION <span>${state.current + 1}</span> / ${questions.length}`;
    els.progressFill.style.width = `${((state.current + 1) / questions.length) * 100}%`;
    els.progressFill.parentElement.setAttribute('aria-valuenow', String(state.current + 1));
    els.category.textContent = question.category;
    els.title.textContent = question.title;
    els.answers.replaceChildren();
    question.answers.forEach((answer, index) => {
      const id = `answer-${state.current}-${index}`;
      const option = document.createElement('label');
      option.className = `answer-option${selected === index ? ' is-selected' : ''}`;
      option.htmlFor = id;
      option.innerHTML = `<input id="${id}" type="radio" name="question-${state.current}" value="${index}"${selected === index ? ' checked' : ''}><span>${answer.label}</span>`;
      option.querySelector('input').addEventListener('change', () => {
        state.selections[state.current] = index;
        renderQuestion();
        els.next.focus();
      });
      els.answers.append(option);
    });
    els.back.hidden = state.current === 0;
    els.next.disabled = selected === null;
    els.next.innerHTML = state.current === questions.length - 1 ? '結果を見る <span aria-hidden="true">→</span>' : '次へ <span aria-hidden="true">→</span>';
    els.hint.textContent = selected === null ? 'ひとつ選んでください' : '選択しました';
  }

  function calculateResults() {
    const totals = Object.fromEntries(Object.keys(models).map((model) => [model, 0]));
    const contributions = Object.fromEntries(Object.keys(models).map((model) => [model, []]));
    state.selections.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const answer = question.answers[answerIndex];
      Object.keys(models).forEach((model) => {
        const points = answer.scores[model] * question.weight;
        totals[model] += points;
        contributions[model].push({ label: answer.label, points, questionIndex });
      });
    });
    const q1Scores = questions[0].answers[state.selections[0]].scores;
    const modelPriority = ['US-1', 'US-3', 'US-4', 'US-5'];
    const ranked = Object.keys(models).sort((a, b) =>
      totals[b] - totals[a] || q1Scores[b] - q1Scores[a] || modelPriority.indexOf(a) - modelPriority.indexOf(b)
    );
    const strongTop = state.selections[1] === 0 || state.selections[6] === 1;
    const longDrive = state.selections[0] === 2 || state.selections[2] === 0 || state.selections[5] === 0;
    const eligibleForUS4 = strongTop && longDrive;
    let winner = ranked[0];
    let guardrailApplied = false;
    if (winner === 'US-4' && !eligibleForUS4) {
      winner = ranked.find((model) => model !== 'US-4');
      guardrailApplied = true;
    }
    const runner = guardrailApplied ? 'US-4' : ranked.find((model) => model !== winner);
    return { totals, contributions, winner, runner, guardrailApplied };
  }

  function renderResults() {
    const result = calculateResults();
    const model = models[result.winner];
    byId('result-heading').textContent = result.winner;
    byId('result-tagline').textContent = model.tagline;
    byId('fit-score').textContent = Math.round((result.totals[result.winner] / 75) * 100);
    const gap = result.totals[result.winner] - result.totals[result.runner];
    const status = byId('recommendation-status');
    status.textContent = result.guardrailApplied
      ? '長打特化モデルとの違いも、比べてから選びましょう。'
      : gap >= 6
        ? '回答の傾向を見ると、このモデルがいちばん合っています。'
        : gap >= 3
          ? '次点のモデルとも、特徴を比べてから選びましょう。'
          : '適性が近いモデルがあります。次点との違いも見てみましょう。';
    byId('model-description').textContent = model.description;
    byId('model-tags').replaceChildren(...model.tags.map((tag) => { const el = document.createElement('span'); el.textContent = tag; return el; }));
    byId('model-caution').textContent = model.caution;
    const reasonTemplates = [
      (answer) => `「${answer}」を、いちばん大切にしたいと答えたこと`,
      (answer) => `重心の好みが「${answer}」に近かったこと`,
      (answer) => `スイングの傾向が「${answer}」だったこと`,
      (answer) => `ヘッドの重さは「${answer}」と答えたこと`,
      (answer) => `グリップは「${answer}」が好みだったこと`,
      (answer) => `今使っているバットが「${answer}」に近いこと`,
      (answer) => `飛距離との向き合い方が「${answer}」だったこと`
    ];
    const reasonItems = result.contributions[result.winner]
      .sort((a, b) => b.points - a.points)
      .slice(0, 3)
      .map((item) => reasonTemplates[item.questionIndex](item.label));
    byId('reason-list').replaceChildren(...reasonItems.map((reason) => { const li = document.createElement('li'); li.textContent = reason; return li; }));
    byId('runner-heading').textContent = result.runner;
    byId('runner-copy').textContent = models[result.runner].comparison;
    byId('runner-label').textContent = result.guardrailApplied ? '長打特化で比較するなら' : 'もう一本、比較するなら';
    const note = byId('guardrail-note');
    note.hidden = !result.guardrailApplied;
    note.textContent = result.guardrailApplied ? 'US-4は強いトップバランスへの慣れと長打志向がそろったプレーヤー向けです。今回の回答では、まず扱いやすさとの相性を優先して提案しています。' : '';
    showPanel(els.result);
    els.result.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  els.start.addEventListener('click', () => { showPanel(els.diagnosis); renderQuestion(); els.title.focus({ preventScroll: true }); });
  els.next.addEventListener('click', () => { if (state.selections[state.current] === null) return; if (state.current === questions.length - 1) renderResults(); else { state.current += 1; renderQuestion(); els.title.focus({ preventScroll: true }); } });
  els.back.addEventListener('click', () => { if (state.current > 0) { state.current -= 1; renderQuestion(); els.title.focus({ preventScroll: true }); } });
  els.restart.addEventListener('click', () => { state.current = 0; state.selections.fill(null); showPanel(els.intro); window.scrollTo({ top: 0, behavior: 'smooth' }); els.start.focus({ preventScroll: true }); });
  setupTheme();
})();
