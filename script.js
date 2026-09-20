(() => {
  'use strict';

  const themes = {
    maker: { caption: '軟式木製バット適性診断' },
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

  const customParts = {
    grip: {
      'US-1': '手元に強いクセをつけず、自然な感覚を求める人向け。',
      'US-3': 'タイカップ気味。下の手を支える感覚がほしい人向け。',
      'US-4': '細めのグリップと小さめのエンドで、手元を軽快に。',
      'US-5': 'US-3よりやや細め。握りやすさと軽快さを両立。'
    },
    barrel: {
      'US-1': '扱いやすいトップバランス。飛距離と操作性の両立。',
      'US-3': 'グリップ寄りのトルピード型。ミートしやすさを重視。',
      'US-4': '太めのバレルとスーパートップ。最大級の飛距離を狙う。',
      'US-5': 'セミトップのトルピード型。US-3より飛距離を求める人向け。'
    }
  };

  const existingQuestions = [
    { category: '重視すること', title: 'バット選びで、いちばん大事にしたいのは？', weight: 3, answers: [
      { label: '振り抜きやすさ', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 2} },
      { label: '飛距離と操作性の両立', scores: {'US-1': 5, 'US-3': 4, 'US-4': 3, 'US-5': 4} },
      { label: 'とにかく飛距離', scores: {'US-1': 3, 'US-3': 2, 'US-4': 5, 'US-5': 4} },
      { label: 'ミートしやすさ・打率', scores: {'US-1': 4, 'US-3': 5, 'US-4': 1, 'US-5': 2} }
    ] },
    { category: '重心の好み', title: '好みに近い重心はどれですか？', weight: 3, answers: [
      { label: '強いトップバランス', scores: {'US-1': 3, 'US-3': 1, 'US-4': 5, 'US-5': 4} },
      { label: '少しヘッドが効く程度', scores: {'US-1': 5, 'US-3': 3, 'US-4': 3, 'US-5': 5} },
      { label: 'バランス型・よく分からない', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 3} },
      { label: 'グリップ寄り・コンパクト', scores: {'US-1': 3, 'US-3': 5, 'US-4': 1, 'US-5': 2} }
    ] },
    { category: 'スイング', title: '普段のスイングに最も近いのは？', weight: 2, answers: [
      { label: 'ヘッドを走らせて、強く振り切る', scores: {'US-1': 3, 'US-3': 1, 'US-4': 5, 'US-5': 4} },
      { label: 'コンパクトに振り抜く', scores: {'US-1': 5, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: '状況に応じて、両方使いたい', scores: {'US-1': 5, 'US-3': 4, 'US-4': 3, 'US-5': 4} }
    ] },
    { category: 'ヘッドの感覚', title: 'ヘッドの重さは、どう感じたいですか？', weight: 2, answers: [
      { label: 'しっかり感じて、打球を押し込みたい', scores: {'US-1': 3, 'US-3': 2, 'US-4': 5, 'US-5': 4} },
      { label: '疲れにくさ・振りやすさを優先したい', scores: {'US-1': 5, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: 'まだよく分からない', scores: {'US-1': 5, 'US-3': 4, 'US-4': 2, 'US-5': 3} }
    ] },
    { category: 'グリップ', title: 'グリップの好みはありますか？', weight: 1, answers: [
      { label: '細め＋小さめのグリップエンド', scores: {'US-1': 2, 'US-3': 2, 'US-4': 5, 'US-5': 3} },
      { label: '細めが好み。ただしエンドの安心感も欲しい', scores: {'US-1': 3, 'US-3': 3, 'US-4': 1, 'US-5': 5} },
      { label: 'タイカップ系の握りが好き', scores: {'US-1': 2, 'US-3': 5, 'US-4': 2, 'US-5': 3} },
      { label: '特にこだわりはない', scores: {'US-1': 3, 'US-3': 3, 'US-4': 3, 'US-5': 3} }
    ] },
    { category: '今のバット', title: '今使っているバットに近いのは？', weight: 2, answers: [
      { label: 'ビヨンド／レガシー系のトップバランス', scores: {'US-1': 3, 'US-3': 1, 'US-4': 5, 'US-5': 3} },
      { label: 'トップバランスだが、もう少し扱いやすくしたい', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 2} },
      { label: 'バランス型・ミドル系', scores: {'US-1': 4, 'US-3': 4, 'US-4': 1, 'US-5': 3} },
      { label: '初めて買う・比較対象がない', scores: {'US-1': 3, 'US-3': 3, 'US-4': 1, 'US-5': 3} }
    ] },
    { category: '扱いやすさ', title: '飛距離を求めるなら、操作の難しさはどこまで許容できますか？', weight: 2, answers: [
      { label: '多少の操作難度は許容できる', scores: {'US-1': 3, 'US-3': 2, 'US-4': 3, 'US-5': 5} },
      { label: '強いトップバランスでも問題ない', scores: {'US-1': 2, 'US-3': 1, 'US-4': 5, 'US-5': 4} },
      { label: 'できるだけ扱いやすい方がよい', scores: {'US-1': 5, 'US-3': 5, 'US-4': 1, 'US-5': 1} }
    ] }
  ];

  const customQuestions = [
    { part: 'grip', category: 'GRIP 1 / 3', title: '手元で、いちばん欲しい感覚は？', weight: 3, answers: [
      { label: '下の手がしっかり収まる', scores: {'US-1': 2, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: 'クセがなく、自然に握れる', scores: {'US-1': 5, 'US-3': 3, 'US-4': 1, 'US-5': 3} },
      { label: '細く、素早く振り抜ける', scores: {'US-1': 2, 'US-3': 1, 'US-4': 5, 'US-5': 4} }
    ] },
    { part: 'grip', category: 'GRIP 2 / 3', title: 'グリップエンドは、どう感じたいですか？', weight: 3, answers: [
      { label: '下の手を支える感覚がほしい', scores: {'US-1': 2, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: '主張しすぎず、自然な方がよい', scores: {'US-1': 5, 'US-3': 3, 'US-4': 1, 'US-5': 3} },
      { label: '小さく、コンパクトな方がよい', scores: {'US-1': 1, 'US-3': 1, 'US-4': 5, 'US-5': 4} }
    ] },
    { part: 'grip', category: 'GRIP 3 / 3', title: '今のグリップから、どう変えたいですか？', weight: 2, answers: [
      { label: '今の感覚を大きく変えたくない', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 2} },
      { label: '少しだけ細く、握りやすくしたい', scores: {'US-1': 2, 'US-3': 2, 'US-4': 3, 'US-5': 5} },
      { label: 'できるだけ細く、手元を軽くしたい', scores: {'US-1': 1, 'US-3': 1, 'US-4': 5, 'US-5': 3} }
    ] },
    { part: 'barrel', category: 'BARREL 1 / 4', title: 'バレルで、いちばん優先したいことは？', weight: 3, answers: [
      { label: 'ミートを増やしたい', scores: {'US-1': 4, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: '飛距離と操作性を両立したい', scores: {'US-1': 5, 'US-3': 3, 'US-4': 2, 'US-5': 4} },
      { label: '長打を増やしたい', scores: {'US-1': 2, 'US-3': 1, 'US-4': 5, 'US-5': 4} }
    ] },
    { part: 'barrel', category: 'BARREL 2 / 4', title: 'ヘッドの重さは、どこまで感じたいですか？', weight: 3, answers: [
      { label: 'あまり感じず、振り抜きたい', scores: {'US-1': 3, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: '少しだけヘッドを効かせたい', scores: {'US-1': 5, 'US-3': 3, 'US-4': 2, 'US-5': 4} },
      { label: 'はっきりヘッドを効かせたい', scores: {'US-1': 2, 'US-3': 1, 'US-4': 4, 'US-5': 5} },
      { label: 'できるだけ強くヘッドを効かせたい', scores: {'US-1': 1, 'US-3': 1, 'US-4': 5, 'US-5': 3} }
    ] },
    { part: 'barrel', category: 'BARREL 3 / 4', title: '飛距離のためなら、操作の難しさはどこまで許容できますか？', weight: 2, answers: [
      { label: 'できるだけ扱いやすい方がよい', scores: {'US-1': 4, 'US-3': 5, 'US-4': 1, 'US-5': 2} },
      { label: '少し難しくても、飛距離を取りたい', scores: {'US-1': 3, 'US-3': 2, 'US-4': 2, 'US-5': 5} },
      { label: '長打のためなら、難しくてもよい', scores: {'US-1': 1, 'US-3': 1, 'US-4': 5, 'US-5': 4} }
    ] },
    { part: 'barrel', category: 'BARREL 4 / 4', title: '今使っているバットに近いのは？', weight: 2, answers: [
      { label: 'ビヨンド／レガシー系のトップバランス', scores: {'US-1': 3, 'US-3': 1, 'US-4': 5, 'US-5': 3} },
      { label: '木製でも、振りやすさを重視している', scores: {'US-1': 5, 'US-3': 4, 'US-4': 1, 'US-5': 2} },
      { label: 'トルピード型や、ミートしやすい形が好き', scores: {'US-1': 3, 'US-3': 5, 'US-4': 1, 'US-5': 4} },
      { label: '初めて買う・比較対象がない', scores: {'US-1': 4, 'US-3': 4, 'US-4': 1, 'US-5': 3} }
    ] }
  ];

  const state = { mode: null, current: 0, selections: [] };
  const byId = (id) => document.getElementById(id);
  const els = {
    intro: byId('intro-panel'), diagnosis: byId('diagnosis-panel'), result: byId('result-panel'),
    startExisting: byId('start-existing-button'), startCustom: byId('start-custom-button'),
    next: byId('next-button'), back: byId('back-button'), restart: byId('restart-button'),
    progressLabel: byId('progress-label'), progressFill: byId('progress-fill'), category: byId('question-category'),
    title: byId('question-title'), answers: byId('answer-list'), hint: byId('selection-hint'), themeCaption: byId('theme-caption'),
    resultLabel: byId('result-label'), resultLead: byId('result-lead'), resultHeading: byId('result-heading'),
    resultTagline: byId('result-tagline'), existingDetails: byId('existing-result-details'), customDetails: byId('custom-result-details')
  };

  function activeQuestions() { return state.mode === 'custom' ? customQuestions : existingQuestions; }

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

  function beginDiagnosis(mode) {
    state.mode = mode;
    state.current = 0;
    state.selections = Array(activeQuestions().length).fill(null);
    showPanel(els.diagnosis);
    renderQuestion();
    els.title.focus({ preventScroll: true });
  }

  function renderQuestion() {
    const questions = activeQuestions();
    const question = questions[state.current];
    const selected = state.selections[state.current];
    els.progressLabel.innerHTML = `質問 <span>${state.current + 1}</span> / ${questions.length}`;
    els.progressFill.style.width = `${((state.current + 1) / questions.length) * 100}%`;
    els.progressFill.parentElement.setAttribute('aria-valuemax', String(questions.length));
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
    els.next.textContent = state.current === questions.length - 1 ? '結果を見る' : '次へ';
    els.hint.textContent = selected === null ? 'ひとつ選んでください' : '選択しました';
  }

  function calculateExistingResults() {
    const totals = Object.fromEntries(Object.keys(models).map((model) => [model, 0]));
    const contributions = Object.fromEntries(Object.keys(models).map((model) => [model, []]));
    state.selections.forEach((answerIndex, questionIndex) => {
      const question = existingQuestions[questionIndex];
      const answer = question.answers[answerIndex];
      Object.keys(models).forEach((model) => {
        const points = answer.scores[model] * question.weight;
        totals[model] += points;
        contributions[model].push({ label: answer.label, points, questionIndex });
      });
    });
    const priority = ['US-1', 'US-3', 'US-4', 'US-5'];
    const firstQuestionScores = existingQuestions[0].answers[state.selections[0]].scores;
    const ranked = Object.keys(models).sort((a, b) => totals[b] - totals[a] || firstQuestionScores[b] - firstQuestionScores[a] || priority.indexOf(a) - priority.indexOf(b));
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

  function renderExistingResults() {
    const result = calculateExistingResults();
    const model = models[result.winner];
    els.resultLabel.textContent = '既存モデル診断';
    els.resultLead.textContent = '今のスイングに近いのは、このモデルです。';
    els.resultHeading.textContent = result.winner;
    els.resultTagline.textContent = model.tagline;
    byId('fit-score').textContent = Math.round((result.totals[result.winner] / 75) * 100);
    const gap = result.totals[result.winner] - result.totals[result.runner];
    byId('recommendation-status').textContent = result.guardrailApplied ? '長打特化モデルとの違いも、比べてから選びましょう。' : gap >= 6 ? '回答の傾向を見ると、このモデルがいちばん合っています。' : gap >= 3 ? '次点のモデルとも、特徴を比べてから選びましょう。' : '適性が近いモデルがあります。次点との違いも見てみましょう。';
    byId('model-description').textContent = model.description;
    byId('model-tags').replaceChildren(...model.tags.map((tag) => { const el = document.createElement('span'); el.textContent = tag; return el; }));
    byId('model-caution').textContent = model.caution;
    const templates = [
      (answer) => `「${answer}」を、いちばん大切にしたいと答えたこと`,
      (answer) => `重心の好みが「${answer}」に近かったこと`,
      (answer) => `スイングの傾向が「${answer}」だったこと`,
      (answer) => `ヘッドの重さは「${answer}」と答えたこと`,
      (answer) => `グリップは「${answer}」が好みだったこと`,
      (answer) => `今使っているバットが「${answer}」に近いこと`,
      (answer) => `飛距離との向き合い方が「${answer}」だったこと`
    ];
    const reasons = result.contributions[result.winner].sort((a, b) => b.points - a.points).slice(0, 3).map((item) => templates[item.questionIndex](item.label));
    byId('reason-list').replaceChildren(...reasons.map((reason) => { const li = document.createElement('li'); li.textContent = reason; return li; }));
    byId('runner-heading').textContent = result.runner;
    byId('runner-copy').textContent = models[result.runner].comparison;
    byId('runner-label').textContent = result.guardrailApplied ? '長打特化で比べるなら' : '迷ったときの比較候補';
    const note = byId('guardrail-note');
    note.hidden = !result.guardrailApplied;
    note.textContent = result.guardrailApplied ? 'US-4は強いトップバランスへの慣れと長打志向がそろったプレーヤー向けです。今回の回答では、まず扱いやすさとの相性を優先して提案しています。' : '';
  }

  function rankPart(part) {
    const totals = Object.fromEntries(Object.keys(models).map((model) => [model, 0]));
    const contributions = Object.fromEntries(Object.keys(models).map((model) => [model, []]));
    customQuestions.forEach((question, index) => {
      if (question.part !== part) return;
      const answer = question.answers[state.selections[index]];
      Object.keys(models).forEach((model) => {
        const points = answer.scores[model] * question.weight;
        totals[model] += points;
        contributions[model].push({ label: answer.label, points });
      });
    });
    const priority = part === 'grip' ? ['US-3', 'US-5', 'US-4', 'US-1'] : ['US-1', 'US-3', 'US-5', 'US-4'];
    const ranked = Object.keys(models).sort((a, b) => totals[b] - totals[a] || priority.indexOf(a) - priority.indexOf(b));
    return { totals, contributions, winner: ranked[0], runner: ranked[1], gap: totals[ranked[0]] - totals[ranked[1]] };
  }

  function renderCustomResults() {
    const grip = rankPart('grip');
    const barrel = rankPart('barrel');
    const score = Math.round((((grip.totals[grip.winner] / 40) + (barrel.totals[barrel.winner] / 50)) / 2) * 100);
    const runnerPart = grip.gap <= barrel.gap ? 'grip' : 'barrel';
    const runnerGrip = runnerPart === 'grip' ? grip.runner : grip.winner;
    const runnerBarrel = runnerPart === 'barrel' ? barrel.runner : barrel.winner;
    const topGripReason = grip.contributions[grip.winner].sort((a, b) => b.points - a.points)[0].label;
    const topBarrelReason = barrel.contributions[barrel.winner].sort((a, b) => b.points - a.points)[0].label;
    const combinationIsStock = grip.winner === barrel.winner;

    els.resultLabel.textContent = 'CUSTOM ORDER診断';
    els.resultLead.textContent = combinationIsStock ? '完成モデルとしても相性のよい組み合わせです。' : '手元とバレルを、あなたの好みに合わせて組み合わせました。';
    els.resultHeading.textContent = `${grip.winner} × ${barrel.winner}`;
    els.resultTagline.textContent = combinationIsStock ? `${grip.winner}の完成度を、そのまま選べる組み合わせです。` : `${grip.winner}の手元に、${barrel.winner}の打球感を組み合わせます。`;
    byId('custom-grip-model').textContent = grip.winner;
    byId('custom-grip-copy').textContent = customParts.grip[grip.winner];
    byId('custom-barrel-model').textContent = barrel.winner;
    byId('custom-barrel-copy').textContent = customParts.barrel[barrel.winner];
    byId('custom-fit-score').textContent = Math.min(100, Math.max(72, score));
    const reasons = [
      `グリップは「${topGripReason}」という手元の好みに合うこと`,
      `バレルは「${topBarrelReason}」という打席での優先順位に合うこと`,
      combinationIsStock ? 'グリップとバレルの志向が揃っており、完成モデルとしても選びやすいこと' : '手元の握り心地と、ヘッド側に求める打球感を分けて選べること'
    ];
    byId('custom-reason-list').replaceChildren(...reasons.map((reason) => { const li = document.createElement('li'); li.textContent = reason; return li; }));
    byId('custom-runner-heading').textContent = `${runnerGrip} × ${runnerBarrel}`;
    byId('custom-runner-copy').textContent = runnerPart === 'grip' ? `バレルはそのままに、グリップだけを${runnerGrip}へ替える案です。手元の感覚で迷ったときに比べてください。` : `グリップはそのままに、バレルだけを${runnerBarrel}へ替える案です。打球感で迷ったときに比べてください。`;
  }

  function renderResults() {
    const isCustom = state.mode === 'custom';
    els.existingDetails.classList.toggle('is-hidden', isCustom);
    els.customDetails.classList.toggle('is-hidden', !isCustom);
    if (isCustom) renderCustomResults(); else renderExistingResults();
    showPanel(els.result);
    els.result.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  els.startExisting.addEventListener('click', () => beginDiagnosis('existing'));
  els.startCustom.addEventListener('click', () => beginDiagnosis('custom'));
  els.next.addEventListener('click', () => {
    const questions = activeQuestions();
    if (state.selections[state.current] === null) return;
    if (state.current === questions.length - 1) renderResults();
    else { state.current += 1; renderQuestion(); els.title.focus({ preventScroll: true }); }
  });
  els.back.addEventListener('click', () => { if (state.current > 0) { state.current -= 1; renderQuestion(); els.title.focus({ preventScroll: true }); } });
  els.restart.addEventListener('click', () => { state.mode = null; state.current = 0; state.selections = []; showPanel(els.intro); window.scrollTo({ top: 0, behavior: 'smooth' }); els.startExisting.focus({ preventScroll: true }); });
  setupTheme();
})();
