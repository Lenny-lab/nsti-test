const dataset = window.PPTI_DATA || {
  meta: { stats: {} },
  framework: { dimensions: [], questions: [] },
  result_candidates: [],
  characters: [],
};

const STORAGE_KEY = "peppa-ppti-state-v3";

const DIMENSION_META = {
  spark: {
    name: "泥坑活力",
    left_label: "慢热观察派",
    right_label: "一踩就跳派",
    summary: "看你更像先看看情况，还是一见到好玩的事就立刻冲上去。",
  },
  heart: {
    name: "朋友相处感",
    left_label: "自己节奏派",
    right_label: "贴心陪伴派",
    summary: "看你在和朋友、家人相处时，更偏自己的节奏还是更会照顾别人。",
  },
  craft: {
    name: "日常安排感",
    left_label: "想到就做派",
    right_label: "稳稳安排派",
    summary: "看你更像边玩边想，还是会先把事情安排得明明白白。",
  },
  moxie: {
    name: "带头劲头",
    left_label: "先跟着看派",
    right_label: "自然带队派",
    summary: "看你在一群人里更喜欢先跟着大家，还是会自然地把节奏带起来。",
  },
};

const CHARACTER_NAME_MAP = {
  "Peppa Pig": "佩奇",
  "George Pig": "乔治",
  "Daddy Pig": "猪爸爸",
  "Mummy Pig": "猪妈妈",
  "Suzy Sheep": "苏西羊",
  "Rebecca Rabbit": "瑞贝卡兔",
  "Pedro Pony": "佩德罗小马",
  "Danny Dog": "丹尼狗",
  "Candy Cat": "坎迪猫",
  "Emily Elephant": "艾米丽象",
  "Edmond Elephant": "埃德蒙象",
  "Gerald Giraffe": "杰拉德长颈鹿",
  "Madame Gazelle": "羚羊老师",
  "Chloé Pig": "克洛伊猪",
  "Chloe Pig": "克洛伊猪",
  "Grandpa Pig": "猪爷爷",
  "Granny Pig": "猪奶奶",
  "Grampy Rabbit": "兔爷爷",
  "Mummy Rabbit": "兔妈妈",
  "Daddy Rabbit": "兔爸爸",
  "Mandy Mouse": "曼迪鼠",
  "The Queen": "女王",
  "Freddy Fox": "弗雷迪狐狸",
  "Zoe Zebra": "斑马佐伊",
  "Richard Rabbit": "理查德兔",
  "Polly Parrot": "鹦鹉波莉",
};

const state = {
  answers: {},
  questionIndex: 0,
  result: null,
};

const els = {
  screenIntro: document.getElementById("screenIntro"),
  screenTest: document.getElementById("screenTest"),
  screenResult: document.getElementById("screenResult"),
  introAxisGrid: document.getElementById("introAxisGrid"),
  btnStart: document.getElementById("btnStart"),
  questionSection: document.getElementById("questionSection"),
  questionAxisTag: document.getElementById("questionAxisTag"),
  progressBar: document.getElementById("progressBar"),
  progressText: document.getElementById("progressText"),
  questionIndex: document.getElementById("questionIndex"),
  questionStem: document.getElementById("questionStem"),
  scale: document.getElementById("scale"),
  btnPrev: document.getElementById("btnPrev"),
  btnNext: document.getElementById("btnNext"),
  resultType: document.getElementById("resultType"),
  resultTitle: document.getElementById("resultTitle"),
  resultOneLiner: document.getElementById("resultOneLiner"),
  resultBadges: document.getElementById("resultBadges"),
  resultSummary: document.getElementById("resultSummary"),
  axes: document.getElementById("axes"),
  resultPortrait: document.getElementById("resultPortrait"),
  resultCharacter: document.getElementById("resultCharacter"),
  resultPitfalls: document.getElementById("resultPitfalls"),
  resultPartners: document.getElementById("resultPartners"),
  resultTopMatches: document.getElementById("resultTopMatches"),
  resultLinks: document.getElementById("resultLinks"),
  btnCopy: document.getElementById("btnCopy"),
  btnRestart: document.getElementById("btnRestart"),
};

function isBrokenText(value) {
  return !value || /[�锟]/.test(value);
}

function pickText(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim() && !isBrokenText(value)) {
      return value.trim();
    }
  }
  return typeof values[0] === "string" ? values[0].trim() : "";
}

function getDimensionMeta(dimension) {
  const fallback = DIMENSION_META[dimension.id] || {};
  return {
    ...dimension,
    name: pickText(dimension.name, fallback.name, dimension.id),
    left_label: pickText(dimension.left_label, fallback.left_label, "左侧偏好"),
    right_label: pickText(dimension.right_label, fallback.right_label, "右侧偏好"),
    summary: pickText(dimension.summary, fallback.summary, ""),
  };
}

function displayCharacterName(item) {
  return pickText(item.name_zh, CHARACTER_NAME_MAP[item.name], item.name, "未命名角色");
}

function displayCharacterSummary(item) {
  return pickText(
    item.summary_zh,
    `这是关于${displayCharacterName(item)}的一条角色资料，当前页面保留了更适合快速浏览的简介内容。`,
  );
}

function displayCharacterSpecies(item) {
  return pickText(item.species_zh, item.species, "角色");
}

function displayCharacterTraits(item) {
  const zhTraits = Array.isArray(item.traits_zh) ? item.traits_zh.filter((trait) => !isBrokenText(trait)) : [];
  const zhCombined = Array.isArray(item.combined_traits_zh) ? item.combined_traits_zh.filter((trait) => !isBrokenText(trait)) : [];
  const rawTraits = Array.isArray(item.traits) ? item.traits : [];
  const rawCombined = Array.isArray(item.combined_traits) ? item.combined_traits : [];
  return zhTraits.length ? zhTraits : zhCombined.length ? zhCombined : rawTraits.length ? rawTraits : rawCombined;
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      answers: state.answers,
      questionIndex: state.questionIndex,
      result: state.result,
    }),
  );
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    state.answers = parsed.answers || {};
    state.questionIndex = parsed.questionIndex || 0;
    state.result = parsed.result || null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function showScreen(name) {
  els.screenIntro.classList.toggle("hidden", name !== "intro");
  els.screenTest.classList.toggle("hidden", name !== "test");
  els.screenResult.classList.toggle("hidden", name !== "result");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderIntroAxes() {
  els.introAxisGrid.innerHTML = dataset.framework.dimensions
    .map((rawDimension) => {
      const dimension = getDimensionMeta(rawDimension);
      return `
        <article class="introAxis">
          <div class="introAxis__code">${dimension.name}</div>
          <div class="introAxis__title">${dimension.left_label} / ${dimension.right_label}</div>
          <div class="introAxis__body">${dimension.summary}</div>
        </article>
      `;
    })
    .join("");
}

function getQuestion() {
  return dataset.framework.questions[state.questionIndex];
}

function renderQuestion() {
  const question = getQuestion();
  const total = dataset.framework.questions.length;
  const current = state.questionIndex + 1;
  const rawDimension = dataset.framework.dimensions.find((item) => item.id === question.dimension);
  const dimension = getDimensionMeta(rawDimension || { id: question.dimension });
  const currentAnswer = state.answers[question.id];

  els.questionSection.textContent = `第 ${current} 题`;
  els.questionAxisTag.textContent = `${dimension.name} · ${dimension.left_label} / ${dimension.right_label}`;
  els.progressBar.style.width = `${(current / total) * 100}%`;
  els.progressText.textContent = `${current} / ${total}`;
  els.questionIndex.textContent = "正在作答";
  els.questionStem.textContent = question.prompt;
  els.btnPrev.disabled = state.questionIndex === 0;
  els.btnNext.textContent = current === total ? "查看结果" : "下一题";

  els.scale.innerHTML = question.options
    .map(
      (option, index) => `
        <button class="choice ${option.score === currentAnswer ? "choice--selected" : ""}" type="button" data-score="${option.score}">
          <div class="choice__head">
            <span class="choice__label">${String.fromCharCode(65 + index)}</span>
          </div>
          <div class="choice__value">${option.label}</div>
        </button>
      `,
    )
    .join("");

  els.scale.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers[question.id] = Number(button.dataset.score);
      saveState();
      renderQuestion();
    });
  });
}

function normalizeScores() {
  const scores = {};
  dataset.framework.dimensions.forEach((dimension) => {
    scores[dimension.id] = 0;
  });

  dataset.framework.questions.forEach((question) => {
    scores[question.dimension] += Number(state.answers[question.id] || 0);
  });

  Object.keys(scores).forEach((key) => {
    scores[key] = Math.max(-100, Math.min(100, scores[key] * 16));
  });
  return scores;
}

function buildAxisLabel(score, dimension) {
  if (score >= 25) return dimension.right_label;
  if (score <= -25) return dimension.left_label;
  return "中间平衡";
}

function axisCopy(id, score) {
  const level = score >= 25 ? "high" : score <= -25 ? "low" : "mid";
  const map = {
    spark: {
      high: "你更容易成为气氛的点火者，热闹、明亮、存在感强。",
      mid: "你的活力比较灵活，会看场合决定要不要把能量放出来。",
      low: "你偏慢热，更习惯先观察，再进入自己的节奏。",
    },
    heart: {
      high: "你很会照顾气氛和关系，也更容易接住别人的情绪。",
      mid: "你既有温度，也有分寸，相处起来比较舒服。",
      low: "你更重视边界感和独立空间，不喜欢被情绪裹挟。",
    },
    craft: {
      high: "你做事偏稳，会主动安排节奏和推进顺序。",
      mid: "你能在计划和即兴之间切换，弹性比较好。",
      low: "你更依赖现场感觉，做事更自由，也更跳脱。",
    },
    moxie: {
      high: "你比较容易站出来带节奏，主导感明显。",
      mid: "需要时你能挺身而出，但不会每次都抢风头。",
      low: "你更像观察者，喜欢先看清，再决定要不要主动出手。",
    },
  };
  return map[id]?.[level] || "";
}

function vectorDistance(scores, candidate) {
  return dataset.framework.dimensions.reduce((sum, dimension) => {
    return sum + Math.abs(scores[dimension.id] - candidate.vector[dimension.id]);
  }, 0);
}

function pickArchetype(scores) {
  const spark = scores.spark >= 25 ? "高能" : scores.spark <= -25 ? "慢热" : "平衡";
  const heart = scores.heart >= 25 ? "贴心型" : scores.heart <= -25 ? "边界型" : "适配型";
  return `${spark} · ${heart}`;
}

function computeResult() {
  const scores = normalizeScores();
  const ranking = [...dataset.result_candidates]
    .map((candidate) => {
      const diff = vectorDistance(scores, candidate);
      return {
        ...candidate,
        similarity: Math.max(0, Math.round(100 - diff / 8)),
      };
    })
    .sort((a, b) => b.similarity - a.similarity);

  const axes = dataset.framework.dimensions.map((rawDimension) => {
    const dimension = getDimensionMeta(rawDimension);
    return {
      ...dimension,
      score: scores[dimension.id],
      state: buildAxisLabel(scores[dimension.id], dimension),
      blurb: axisCopy(dimension.id, scores[dimension.id]),
    };
  });

  const top = ranking[0];
  return {
    type: displayCharacterName(top),
    title: `你最像 ${displayCharacterName(top)}`,
    oneLiner: `综合所有题目后，你当前的整体节奏最接近 ${displayCharacterName(top)}。这次结果会落到一个更具体的角色身上，而不是只给你一个抽象标签。`,
    axes,
    ranking: ranking.slice(0, 3),
    top,
    archetype: pickArchetype(scores),
  };
}

function renderResult() {
  const result = state.result;
  if (!result) return;

  els.resultType.textContent = result.type;
  els.resultTitle.textContent = result.title;
  els.resultOneLiner.textContent = result.oneLiner;

  els.resultBadges.innerHTML = [
    `最像角色 · ${displayCharacterName(result.top)}`,
    `匹配度 · ${result.top.similarity}%`,
    `角色标签 · ${displayCharacterTraits(result.top).slice(0, 3).join(" / ") || "混合型"}`,
  ]
    .map((item) => `<span class="badge">${item}</span>`)
    .join("");

  els.resultSummary.innerHTML = result.axes
    .map(
      (axis) => `
        <article class="summaryCard">
          <div class="summaryCard__title">${axis.name}</div>
          <div class="summaryCard__value">${axis.state}</div>
          <div class="summaryCard__text">${axis.blurb}</div>
        </article>
      `,
    )
    .join("");

  els.axes.innerHTML = result.axes
    .map((axis) => {
      const width = `${(axis.score + 100) / 2}%`;
      return `
        <article class="axisCard">
          <div class="axisCard__head">
            <div>
              <div class="axisCard__code">${axis.name}</div>
              <div class="axisCard__title">${axis.state}</div>
            </div>
            <div class="axisCard__state">${axis.left_label} / ${axis.right_label}</div>
          </div>
          <div class="meter">
            <div class="meter__mid"></div>
            <div class="meter__fill" style="left:0;width:${width};"></div>
          </div>
          <div class="axisCard__tip">${axis.blurb}</div>
        </article>
      `;
    })
    .join("");

  els.resultPortrait.innerHTML = `
    <p>你的结果首先对应的是一个角色：<strong>${displayCharacterName(result.top)}</strong>。这意味着你的答题节奏、相处方式和行动倾向，在整体上最接近这个人物。</p>
    <p>如果再往下看，你的气质组合更偏“${result.archetype}”。所以这不是只看一题定结果，而是先做角色匹配，再用维度解释你为什么像这个角色。</p>
  `;

  els.resultCharacter.innerHTML = `
    <p><strong>${displayCharacterName(result.top)}</strong>${displayCharacterSpecies(result.top) ? ` · ${displayCharacterSpecies(result.top)}` : ""}</p>
    <p>${displayCharacterSummary(result.top)}</p>
    <div class="chipWrap">${displayCharacterTraits(result.top).map((trait) => `<span class="chip">${trait}</span>`).join("")}</div>
    <div class="docLinks"><a href="${result.top.url}" target="_blank" rel="noreferrer">查看原始角色资料</a></div>
  `;

  els.resultPitfalls.innerHTML = `
    <ul class="stackList stackList--muted">
      <li>如果活力维度太高，可能会在兴奋时推进过快</li>
      <li>如果照顾型倾向更强，容易把别人的状态也背到自己身上</li>
      <li>如果即兴感更明显，节奏可能会被现场情绪带着走</li>
    </ul>
  `;

  els.resultPartners.innerHTML = `
    <ul class="stackList stackList--muted">
      <li>适合与节奏互补的人搭配，一个负责点火，一个负责收束</li>
      <li>协作前先说清你需要自由度还是确定性，效率会高很多</li>
      <li>比起被粗暴归类，你更适合被理解成一种“风格角色”</li>
    </ul>
  `;

  els.resultTopMatches.innerHTML = result.ranking
    .map((item, index) => `<p>${index + 1}. ${displayCharacterName(item)} · ${item.similarity}%</p>`)
    .join("");

  els.resultLinks.innerHTML = `
    <div class="docLinks">
      <a href="./type-gallery.html">浏览角色图鉴</a>
      <a href="./question-bank.html">查看题库</a>
      <a href="./evaluation-system.html">查看评价体系</a>
      <a href="../../index.html">返回 NSTI 首页</a>
    </div>
  `;
}

function startQuiz() {
  state.answers = {};
  state.questionIndex = 0;
  state.result = null;
  saveState();
  renderQuestion();
  showScreen("test");
}

function nextQuestion() {
  const question = getQuestion();
  if (state.answers[question.id] === undefined) {
    return;
  }

  if (state.questionIndex >= dataset.framework.questions.length - 1) {
    state.result = computeResult();
    saveState();
    renderResult();
    showScreen("result");
    return;
  }

  state.questionIndex += 1;
  saveState();
  renderQuestion();
}

function previousQuestion() {
  if (state.questionIndex === 0) return;
  state.questionIndex -= 1;
  saveState();
  renderQuestion();
}

function restart() {
  startQuiz();
}

function copyResult() {
  if (!state.result) return;
  const text = [
    `测试结果：${state.result.type}`,
    `最像角色：${displayCharacterName(state.result.top)}`,
    `匹配度：${state.result.top.similarity}%`,
    ...state.result.axes.map((axis) => `${axis.name}：${axis.state}`),
  ].join("\n");

  navigator.clipboard.writeText(text).then(() => {
    els.btnCopy.textContent = "已复制";
    setTimeout(() => {
      els.btnCopy.textContent = "复制结果";
    }, 1500);
  });
}

function bindEvents() {
  els.btnStart.addEventListener("click", startQuiz);
  els.btnPrev.addEventListener("click", previousQuestion);
  els.btnNext.addEventListener("click", nextQuestion);
  els.btnRestart.addEventListener("click", restart);
  els.btnCopy.addEventListener("click", copyResult);
}

function init() {
  loadState();
  renderIntroAxes();
  bindEvents();

  if (state.result) {
    renderResult();
    showScreen("result");
    return;
  }

  showScreen("intro");
}

init();
