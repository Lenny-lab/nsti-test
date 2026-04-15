(() => {
  const AXES = [
    {
      id: "E_I",
      group: "能量补给",
      left: {
        k: "E",
        name: "场域取能",
        summary: "你更容易被人与现场点燃，在互动和反馈里获得行动力",
        portrait: "你往往在热闹、联结和即时回应里更快进入状态",
        scene: "适合破冰、串联信息、现场协同和把人迅速带进同一节奏",
        pitfall: "容易在高频互动里答应太多，回头才发现自己被耗空",
        partner: "和“静域回充”型同伴搭配时，对方能补足沉淀、复盘与安静收口",
        stress: "外部反馈突然减少时，你可能会短暂失去推进的手感",
        study: "把关键节点放进讨论、共学或即时同步里，你会更容易被点燃",
        tip: "热闹不是问题，但也记得给自己留一段安静收口的时间",
      },
      right: {
        k: "I",
        name: "静域回充",
        summary: "你更容易在独处、小范围和自己的节奏里恢复能量",
        portrait: "你通常需要先在自己的节奏里想清楚，再稳定地把内容拿出来",
        scene: "适合独立准备、安静打磨、深读深写和一对一的深入沟通",
        pitfall: "容易把表达放到太后面，让别人低估你的参与度",
        partner: "和“场域取能”型同伴搭配时，对方能补足对外同步与现场热度",
        stress: "持续高密度社交会让你很快掉电，需要明显的恢复时间",
        study: "先自己整理，再同步重点，会更符合你的效率曲线",
        tip: "关键节点提早说一句你的判断，会比最后一次性输出更轻松",
      },
    },
    {
      id: "S_N",
      group: "观察视角",
      left: {
        k: "S",
        name: "实感锚定",
        summary: "你更相信具象事实、眼前细节和可验证的经验",
        portrait: "你会先抓住可确认的线索，再据此决定怎么理解和推进",
        scene: "适合细节整理、资料比对、流程复核和需要稳定手感的任务",
        pitfall: "容易过早收束视野，把更远的可能性留到后面",
        partner: "和“意象联想”型同伴搭配时，对方能补足远景感和创意外延",
        stress: "信息过于模糊、只有概念没有抓手时，你会感觉抓不住重点",
        study: "先抓实例、材料和结构，再往上总结，会让你更踏实",
        tip: "确认现实条件之后，不妨多问一次“还有没有别的可能”",
      },
      right: {
        k: "N",
        name: "意象联想",
        summary: "你更容易从氛围、象征和延伸可能里理解一件事",
        portrait: "你常先看见一件事背后的意味、方向和潜在连接",
        scene: "适合选题、策划、创意表达、跨学科联想和概念搭建",
        pitfall: "容易一直寻找更有意思的版本，导致收口比启动更难",
        partner: "和“实感锚定”型同伴搭配时，对方能补足细节、材料和现实边界",
        stress: "重复、机械、只谈细部不谈意义的任务会明显消耗你",
        study: "先搭整体图景，再把内容一点点落到细部，你会更顺手",
        tip: "有了想法先留一个雏形，别让灵感一直停在脑内",
      },
    },
    {
      id: "T_F",
      group: "逻辑基准",
      left: {
        k: "T",
        name: "逻辑定标",
        summary: "你更依赖标准、结构和因果来做判断",
        portrait: "你习惯先看是否合理、是否公平、是否经得起推敲",
        scene: "适合规则梳理、问题诊断、任务拆解和复杂决策把关",
        pitfall: "表达过直时，别人可能先感到被挑战，而不是被帮助",
        partner: "和“共感定标”型同伴协作时，对方能补足接受度与氛围感",
        stress: "讨论长期停在情绪层面、迟迟不能落到规则时，你会烦躁",
        study: "给任务设清楚的标准、证据点和完成定义，你会更安心",
        tip: "保留判断的锋利度，同时把表达方式再柔和一点",
      },
      right: {
        k: "F",
        name: "共感定标",
        summary: "你更关注人的处境、关系温度和整体感受",
        portrait: "你会先感受一件事对人意味着什么，再决定怎么处理",
        scene: "适合协调分歧、照顾氛围、同伴支持和建立合作信任",
        pitfall: "容易为了不让人难堪，把困难反馈一拖再拖",
        partner: "和“逻辑定标”型同伴协作时，对方能补足边界、规则与决断",
        stress: "过于冷硬、只谈效率的环境会让你明显掉能量",
        study: "把“这件事会影响谁”一起纳入判断，会让你更稳定",
        tip: "照顾关系时也把边界说清楚，反而更能保护大家",
      },
    },
    {
      id: "J_P",
      group: "生活步调",
      left: {
        k: "J",
        name: "定序推进",
        summary: "你更依赖计划、顺序和节点感来稳稳往前走",
        portrait: "你通常希望事情有安排、有收口，也有清楚的下一步",
        scene: "适合长期项目、任务统筹、时间管理和多人配合推进",
        pitfall: "排得太满时，一旦插入变量就容易挫败",
        partner: "和“流动应变”型同伴搭配时，对方能补足应变和现场松弛度",
        stress: "临时变动过多时，你会明显感觉自己的节奏被打断",
        study: "把版本点、检查点和截止节点写出来，你会更踏实",
        tip: "计划里预留一点空白，稳定并不等于排满",
      },
      right: {
        k: "P",
        name: "流动应变",
        summary: "你更习惯在变化里边走边调，给状态和灵感留空间",
        portrait: "你相信好的推进节奏往往是在做的过程中慢慢长出来的",
        scene: "适合试错、创作、临场发挥和变化较快的生活场景",
        pitfall: "前期过松时，后期容易突然被截止节点追上",
        partner: "和“定序推进”型同伴搭配时，对方能补足收口与稳定性",
        stress: "过度僵硬、一步不差的安排会让你本能地想逃开",
        study: "先把状态带起来，再接到正事，会更符合你的效率曲线",
        tip: "给关键节点做可视化提醒，能保留自由，也不容易失控",
      },
    },
  ];

  const Q_BANK = typeof QUESTIONS !== "undefined" ? QUESTIONS : [];
  const T_LIB = typeof TYPE_LIBRARY !== "undefined" ? TYPE_LIBRARY : {};
  const AXIS_INDEX = Object.fromEntries(AXES.map((axis, index) => [axis.id, index]));

  const $ = (id) => document.getElementById(id);
  const screenIntro = $("screenIntro");
  const screenTest = $("screenTest");
  const screenResult = $("screenResult");

  const btnStart = $("btnStart");
  const btnPrev = $("btnPrev");
  const btnNext = $("btnNext");
  const btnRestart = $("btnRestart");
  const btnCopy = $("btnCopy");

  const questionSection = $("questionSection");
  const questionAxisTag = $("questionAxisTag");
  const progressBar = $("progressBar");
  const progressText = $("progressText");
  const questionIndex = $("questionIndex");
  const questionStem = $("questionStem");
  const scaleEl = $("scale");

  const resultType = $("resultType");
  const resultTitle = $("resultTitle");
  const resultOneLiner = $("resultOneLiner");
  const resultBadges = $("resultBadges");
  const resultSummary = $("resultSummary");
  const axesEl = $("axes");
  const resultPortrait = $("resultPortrait");
  const resultScenes = $("resultScenes");
  const resultPitfalls = $("resultPitfalls");
  const resultPartners = $("resultPartners");
  const resultStudy = $("resultStudy");
  const resultPressure = $("resultPressure");

  const state = {
    idx: 0,
    answers: new Map(),
  };

  const axisById = (id) => AXES.find((axis) => axis.id === id);

  const strengthBand = (pct) => {
    if (pct < 20) return { label: "均衡切换", text: "这一组在你身上更像按情境切换，而不是固定站在某一侧" };
    if (pct < 40) return { label: "轻度倾向", text: "你已经有偏好方向，但依旧保留不少切换空间" };
    if (pct < 65) return { label: "明显倾向", text: "这一组已经形成比较稳定的做事惯性" };
    return { label: "招牌偏好", text: "这是你身上非常鲜明的一组底色，别人也更容易感受到" };
  };

  const listHTML = (items) => {
    const clean = items.filter(Boolean);
    return `<ul class="stackList">${clean.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  };

  const axisDisplayName = (axis, info) =>
    info.strength < 20 ? `${axis.left.name} / ${axis.right.name}` : info.toward.name;

  const axisDisplaySummary = (axis, info) =>
    info.strength < 20 ? `你在“${axis.group}”上保留了比较大的情境弹性` : info.toward.summary;

  const show = (name) => {
    screenIntro.classList.toggle("hidden", name !== "intro");
    screenTest.classList.toggle("hidden", name !== "test");
    screenResult.classList.toggle("hidden", name !== "result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderScale = () => {
    scaleEl.innerHTML = "";
    const question = Q_BANK[state.idx];
    const selected = state.answers.get(question.id);

    question.options.forEach((choice) => {
      const node = document.createElement("div");
      const isSelected = selected && selected.label === choice.label;
      node.className = "choice" + (isSelected ? " choice--selected" : "");
      node.tabIndex = 0;
      node.setAttribute("role", "button");
      node.setAttribute("aria-pressed", isSelected ? "true" : "false");
      node.innerHTML = `<div class="choice__head"><span class="choice__label">${choice.label}</span></div><div class="choice__value">${choice.text}</div>`;

      const pick = () => {
        state.answers.set(question.id, choice);
        renderScale();
      };

      node.addEventListener("click", pick);
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          pick();
        }
      });

      scaleEl.appendChild(node);
    });
  };

  const renderQuestion = () => {
    const question = Q_BANK[state.idx];
    const axis = axisById(question.axis);
    const current = state.idx + 1;
    const total = Q_BANK.length;

    progressBar.style.width = `${Math.round((current / total) * 100)}%`;
    progressText.textContent = `${current} / ${total}`;
    questionSection.textContent = `第 ${AXIS_INDEX[axis.id] + 1} 组 / ${AXES.length}`;
    questionAxisTag.textContent = axis.group;
    questionIndex.textContent = `第 ${current} 题 / ${total}`;
    questionStem.textContent = question.text;
    btnPrev.disabled = state.idx === 0;
    btnNext.textContent = state.idx === total - 1 ? "查看结果" : "下一题";
    renderScale();
  };

  const compute = () => {
    const score = Object.fromEntries(AXES.map((axis) => [axis.id, 0]));
    const maxAbs = Object.fromEntries(
      AXES.map((axis) => [axis.id, Q_BANK.filter((question) => question.axis === axis.id).length]),
    );

    Q_BANK.forEach((question) => {
      const axis = axisById(question.axis);
      const answer = state.answers.get(question.id);
      if (!answer) return;
      const sign = answer.pole === axis.left.k ? 1 : -1;
      score[question.axis] += (answer.weight ?? 1) * sign;
    });

    const strengths = AXES.map((axis) => {
      const raw = score[axis.id];
      const maxScore = maxAbs[axis.id] || 1;
      const strength = Math.round((Math.abs(raw) / maxScore) * 100);
      return {
        axis: axis.id,
        raw,
        max: maxScore,
        strength,
        toward: raw >= 0 ? axis.left : axis.right,
        away: raw >= 0 ? axis.right : axis.left,
        band: strengthBand(strength),
      };
    });

    const letters = strengths.map((item) => item.toward.k).join("");
    const weakest = strengths.reduce((min, item) => (item.strength < min.strength ? item : min), strengths[0]);
    return { letters, strengths, weakest };
  };

  const axisCardHTML = (axis, info) => {
    const width = Math.max(info.strength === 0 ? 2 : info.strength / 2, 2);
    const left = info.raw >= 0 ? 50 : 50 - width;

    return `
      <article class="axisCard">
        <div class="axisCard__head">
          <div>
            <div class="axisCard__code">${axis.group}</div>
            <div class="axisCard__title">${axis.left.name} / ${axis.right.name}</div>
          </div>
          <div class="axisCard__state">${axisDisplayName(axis, info)} · ${info.band.label}</div>
        </div>
        <div class="axisCard__meta">
          <div>${axis.left.name}</div>
          <div>当前更像 ${axisDisplayName(axis, info)}（${info.strength}%）</div>
          <div>${axis.right.name}</div>
        </div>
        <div class="meter">
          <div class="meter__mid"></div>
          <div class="meter__fill" style="left:${left}%;width:${width}%;"></div>
        </div>
        <div class="axisCard__blurb" style="margin-top:12px;">${axisDisplaySummary(axis, info)}</div>
        <div class="axisCard__tip">${info.toward.tip}</div>
      </article>
    `;
  };

  const summaryCardHTML = (axis, info) => `
    <article class="summaryCard">
      <div class="summaryCard__title">${axis.group}</div>
      <div class="summaryCard__value">${axisDisplayName(axis, info)}</div>
      <div class="summaryCard__text">${axisDisplaySummary(axis, info)} 当前强度 ${info.strength}%（${info.band.label}）</div>
    </article>
  `;

  const buildPortrait = (typeEntry, directions) =>
    [
      `<p><strong>你的南师对应像：</strong>${typeEntry.title || "未定义"}</p>`,
      `<p><strong>校园锚点：</strong>${typeEntry.landmark || "未定义"}</p>`,
      `<p><strong>气质关键词：</strong>${typeEntry.traits || "未定义"}</p>`,
      `<p>${directions[0].portrait}；${directions[1].portrait}；${directions[2].portrait}；${directions[3].portrait}</p>`,
    ].join("");

  const buildStudy = (directions) => [directions[1].study, directions[3].study, directions[0].study];

  const buildPressure = (res, directions) => {
    const weakAxis = axisById(res.weakest.axis);
    const weakTip =
      res.weakest.strength < 20
      ? `你当前最容易随情境切换的是“${weakAxis.group}”，这不是短板，只是说明你在这一组保留了更大的弹性`
        : `你当前最需要留意的是“${weakAxis.group}”：${res.weakest.band.text}`;

    return [weakTip, directions[0].stress, directions[3].stress];
  };

  const renderResult = () => {
    const res = compute();
    const directions = res.strengths.map((item) => item.toward);
    const typeEntry = T_LIB[res.letters] || {
      title: "南师生活混合型",
        traits: "多组偏好都保留了弹性，更适合按情境切换策略",
      landmark: "仙林的风",
    };

    resultType.textContent = typeEntry.title;
    resultTitle.textContent = `校园锚点 · ${typeEntry.landmark}`;
    resultOneLiner.textContent = `这份画像更接近 ${typeEntry.traits} 的做事气质`;

    resultBadges.innerHTML = [
      `<span class="badge">校园锚点 · ${typeEntry.landmark}</span>`,
      `<span class="badge">关键词 · ${typeEntry.traits}</span>`,
      ...AXES.map((axis) => {
        const info = res.strengths.find((item) => item.axis === axis.id);
        return `<span class="badge">${axis.group} · ${axisDisplayName(axis, info)}</span>`;
      }),
    ].join("");

    resultSummary.innerHTML = AXES.map((axis) => {
      const info = res.strengths.find((item) => item.axis === axis.id);
      return summaryCardHTML(axis, info);
    }).join("");

    axesEl.innerHTML = AXES.map((axis) => {
      const info = res.strengths.find((item) => item.axis === axis.id);
      return axisCardHTML(axis, info);
    }).join("");

    resultPortrait.innerHTML = buildPortrait(typeEntry, directions);
    resultScenes.innerHTML = listHTML(directions.map((direction) => direction.scene));
    resultPitfalls.innerHTML = listHTML(directions.map((direction) => direction.pitfall));
    resultPartners.innerHTML = listHTML(directions.map((direction) => direction.partner));
    resultStudy.innerHTML = listHTML(buildStudy(directions));
    resultPressure.innerHTML = listHTML(buildPressure(res, directions));

    show("result");
  };

  const ensureAnswered = () => !!state.answers.get(Q_BANK[state.idx].id);

  const toClipboardText = () => {
    const res = compute();
    const typeEntry = T_LIB[res.letters] || { title: "南师生活混合型", traits: "", landmark: "" };
    const axisLines = AXES.map((axis) => {
      const info = res.strengths.find((item) => item.axis === axis.id);
      return `${axis.group}：${axisDisplayName(axis, info)}（${info.strength}%）`;
    }).join("\n");

    return `NSTI 结果：${typeEntry.title}
校园锚点：${typeEntry.landmark}
气质关键词：${typeEntry.traits}

${axisLines}

提醒：NSTI 是独立设计的校园偏好画像，仅供自我洞察与协作讨论，不代表学校官方立场，也不用于诊断与筛选`;
  };

  const copyResult = async () => {
    const text = toClipboardText();
    try {
      await navigator.clipboard.writeText(text);
      btnCopy.textContent = "已复制";
      setTimeout(() => {
        btnCopy.textContent = "复制结果";
      }, 1200);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      btnCopy.textContent = "已复制";
      setTimeout(() => {
        btnCopy.textContent = "复制结果";
      }, 1200);
    }
  };

  const start = () => {
    if (!Q_BANK.length) {
        alert("题库还没有加载完成");
      return;
    }
    state.idx = 0;
    state.answers = new Map();
    btnCopy.textContent = "复制结果";
    show("test");
    renderQuestion();
  };

  const restart = () => {
    state.idx = 0;
    state.answers = new Map();
    btnCopy.textContent = "复制结果";
    show("intro");
  };

  btnStart.addEventListener("click", start);
  btnPrev.addEventListener("click", () => {
    if (state.idx === 0) return;
    state.idx -= 1;
    renderQuestion();
  });
  btnNext.addEventListener("click", () => {
    if (!ensureAnswered()) {
      alert("先选一个最像你的选项，再继续");
      return;
    }

    if (state.idx === Q_BANK.length - 1) {
      renderResult();
      return;
    }

    state.idx += 1;
    renderQuestion();
  });
  btnRestart.addEventListener("click", restart);
  btnCopy.addEventListener("click", copyResult);

  show("intro");
})();
