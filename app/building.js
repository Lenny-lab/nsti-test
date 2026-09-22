(() => {
  const PHOTOS = "./buildings/photos/";
  const SOURCES = {
    heritage: {
      name: "南京市文化和旅游局：走进金陵女子大学旧址",
      url: "https://wlj.nanjing.gov.cn/whyw/202409/t20240919_4768029.html",
    },
    archive: {
      name: "南京市委党史工作办公室：私立金陵女子大学旧址建筑群",
      url: "https://dsb.nanjing.gov.cn/yzyj/201311/t20131106_2083923.html",
    },
    national: {
      name: "国务院：第六批全国重点文物保护单位名单",
      url: "https://www.neac.gov.cn/seac/xxgk/200606/1073187.shtml",
    },
    library: {
      name: "南京师范大学图书馆馆讯：2022年度事业发展十件大事",
      url: "https://lib.njnu.edu.cn/f/gx/202202/202202.pdf",
    },
  };

  const BUILDINGS = [
    {
      id: "l100",
      name: "100 号楼（中大楼）",
      yearRange: "20 世纪 20 年代",
      era: "金女大时期",
      category: "建筑",
      short: "位于历史建筑群中轴线上的代表性建筑。",
      lead: "从大草坪望去，100 号楼是随园历史建筑群最醒目的空间节点之一。",
      tags: ["中轴", "大屋顶", "历史建筑"],
      hero: "l100.webp",
      summary: [
        "南京市文化和旅游局资料显示，金陵女子大学于 1923 年迁入宁海路随园校址。旧址建筑群围绕大草坪对称布置，100 号楼处在主要轴线上。",
        "今天这里仍属于在使用中的校园空间。参观时应以学校现场管理要求为准，不把办公和教学区域当作普通景点。",
      ],
      sources: [SOURCES.heritage, SOURCES.archive],
    },
    {
      id: "l200",
      name: "200 号楼（科学楼）",
      yearRange: "20 世纪 20 年代",
      era: "金女大时期",
      category: "建筑",
      short: "历史建筑群南侧的重要教学建筑。",
      lead: "200 号楼与中轴建筑共同构成大草坪周边的早期校园格局。",
      tags: ["科学教育", "对称布局", "历史建筑"],
      hero: "l200.webp",
      summary: [
        "公开文保资料将这一组建筑放在金陵女子大学旧址的整体规划中理解：主体建筑围绕大草坪展开，并使用具有中国传统建筑特征的外观语言。",
        "早期校园重视科学教育，但具体房间用途和现行开放状态可能变化，本页不把未经持续核验的信息写成固定结论。",
      ],
      sources: [SOURCES.heritage, SOURCES.archive],
    },
    {
      id: "l300",
      name: "300 号楼（文学馆）",
      yearRange: "20 世纪 20 年代",
      era: "金女大时期",
      category: "建筑",
      short: "与大草坪及中轴共同构成早期校园空间。",
      lead: "300 号楼是旧址建筑群的一部分，适合从整体格局而不是单一传说来认识。",
      tags: ["人文教育", "校园格局", "历史建筑"],
      hero: "l300.webp",
      summary: [
        "南京市公开资料确认，金陵女子大学旧址由亨利·墨菲及吕彦直参与规划设计，建筑群按轴线和大草坪组织。",
        "关于楼顶改建、历年使用部门等细节，不同二手材料表述并不完全一致，因此本版只保留能够由公开机构资料支撑的整体信息。",
      ],
      sources: [SOURCES.heritage, SOURCES.archive],
    },
    {
      id: "music",
      name: "音乐楼（随园音乐厅）",
      yearRange: "20 世纪 30 年代",
      era: "金女大时期",
      category: "建筑",
      short: "随园校园音乐教育与公共活动的重要空间。",
      lead: "音乐楼延续了校园历史建筑的整体气质，也长期承载教学和演出活动。",
      tags: ["音乐教育", "礼堂", "在用校园"],
      hero: "music.webp",
      summary: [
        "音乐楼应放回金陵女子大学重视通识教育的历史背景中理解。现有公开材料对房间数量和容量存在不同年代的口径，本版不展示容易过时的精确数字。",
        "它不是静态展品，而是校园教学与活动空间；是否开放应以学校当日安排为准。",
      ],
      sources: [SOURCES.archive, SOURCES.heritage],
    },
    {
      id: "hua",
      name: "华夏图书馆",
      yearRange: "20 世纪 30 年代",
      era: "金女大时期",
      category: "阅读",
      short: "经修缮后继续服务于校园文化与阅读活动。",
      lead: "华夏图书馆是随园历史建筑中兼具文保价值与校园使用功能的一处空间。",
      tags: ["图书馆", "历史建筑", "修缮利用"],
      hero: "hua.webp",
      summary: [
        "南京师范大学图书馆馆讯记载，华夏图书馆在 2022 年完成修缮、安装、文化建设、文献回迁和开放服务条件重建，并在复馆后承办展览。",
        "旧版页面所写“2025 年起首次闭馆大修”与上述校方资料冲突，现已删除。当前开放情况仍应以学校通知为准。",
      ],
      sources: [SOURCES.library, SOURCES.heritage],
    },
    {
      id: "zhongda",
      name: "文学院中大楼",
      yearRange: "20 世纪 50 年代",
      era: "南师院时期",
      category: "建筑",
      short: "依校园地形展开的教学建筑。",
      lead: "中大楼体现了随园在南京师范学院时期继续作为教学空间发展的轨迹。",
      tags: ["教学空间", "坡地", "南师院时期"],
      hero: "zhongda.webp",
      summary: [
        "这栋建筑与金女大早期建筑并非同一建设阶段。页面保留其作为南师院时期教学建筑的基本定位，不继续传播缺乏一手出处的设计者归属说法。",
        "建筑仍处于校园日常使用环境中，导览只介绍外部空间关系，不承诺室内参观。",
      ],
      sources: [SOURCES.heritage],
    },
    {
      id: "yishe",
      name: "一舍与二舍",
      yearRange: "20 世纪 50 年代",
      era: "南师院时期",
      category: "建筑",
      short: "随园后续建设阶段留下的宿舍建筑。",
      lead: "一舍与二舍记录了校园在 20 世纪 50 年代继续扩展的生活空间。",
      tags: ["宿舍", "校园生活", "后续建设"],
      hero: "yishe.webp",
      summary: [
        "旧版关于具体结构材料、保护编号和名人经历的说法缺少稳定的一手链接，本版不再作为确定事实展示。",
        "保留它们，是为了呈现随园不仅有早期金女大建筑，也有后来教学与生活空间持续叠加的历史层次。",
      ],
      sources: [SOURCES.heritage],
    },
    {
      id: "southnorth",
      name: "南大楼与北大楼",
      yearRange: "20 世纪 50 年代",
      era: "南师院时期",
      category: "建筑",
      short: "位于校园轴线周边的后续教学建筑。",
      lead: "南大楼与北大楼延续了随园校园对轴线和整体风貌的关注。",
      tags: ["教学楼", "对称关系", "校园延续"],
      hero: "south.webp",
      summary: [
        "旧版把未经一手来源确认的设计者信息和文保归属混在一起。本版区分“金陵女子大学旧址”这一国家级文保项目与后续校园建筑，避免扩大文保范围。",
        "国务院 2006 年公布的是“金陵女子大学旧址”；具体单体是否属于其保护范围，应以正式文保资料为准。",
      ],
      sources: [SOURCES.national, SOURCES.heritage],
    },
    {
      id: "dorm40",
      name: "400—700 号楼",
      yearRange: "20 世纪 20 年代",
      era: "金女大时期",
      category: "建筑",
      short: "早期校园中的生活与住宿空间。",
      lead: "这组建筑让旧址的历史不只停留在教学楼，也包含学生日常生活。",
      tags: ["宿舍建筑", "校园生活", "历史建筑"],
      hero: "dorm40.webp",
      summary: [
        "公开文保材料确认了旧址建筑群的整体规划与历史价值。本版删除“999 朵玫瑰”、精确住宿人数和未经核实的现用部门等二手叙述。",
        "导览把它们作为早期校园生活空间介绍，不对当前办公、教学用途作长期不变的承诺。",
      ],
      sources: [SOURCES.archive, SOURCES.heritage, SOURCES.national],
    },
  ];

  const $ = (id) => document.getElementById(id);
  const getBuilding = (id) => BUILDINGS.find((building) => building.id === id) || BUILDINGS[0];

  function renderHero(building) {
    document.title = `${building.name} · 关于随园`;
    $("buildingEyebrow").innerHTML = `<span>${building.era} · ${building.yearRange}</span><span>${building.category}</span>`;
    $("buildingTitle").textContent = building.name;
    $("buildingLead").textContent = building.lead;
    $("buildingMeta").innerHTML = [
      `<div class="buildingMetaChip"><span class="buildingMetaChip__label">时期</span><span class="buildingMetaChip__value">${building.yearRange}</span></div>`,
      ...building.tags.map((tag) => `<span class="buildingTag">${tag}</span>`),
    ].join("");
    $("buildingHeroMedia").innerHTML = `<img src="${PHOTOS}${building.hero}" alt="${building.name}原创建筑插画" loading="eager" /><div class="buildingHeroMedia__corner"><span>${building.yearRange}</span></div>`;
  }

  function renderSummary(building) {
    const body = building.summary.map((paragraph) => `<p>${paragraph}</p>`).join("");
    $("buildingSummary").innerHTML = `<div class="section__eyebrow">摘要</div><h2 class="section__title">${building.short}</h2><div class="section__body">${body}</div>`;
  }

  function renderSources(building) {
    const links = building.sources
      .map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.name}</a></li>`)
      .join("");
    $("buildingArticle").innerHTML = `
      <div class="section__eyebrow">资料边界</div>
      <h2 class="section__title">本页如何核对信息</h2>
      <div class="section__body">
        <p>页面优先保留能够由学校、政府或文保机构公开资料支持的内容。建筑用途与开放状态可能变化，请以学校现场管理和最新通知为准。</p>
        <ul>${links}</ul>
      </div>`;
  }

  function renderNav(building) {
    const index = BUILDINGS.findIndex((item) => item.id === building.id);
    const previous = BUILDINGS[(index - 1 + BUILDINGS.length) % BUILDINGS.length];
    const next = BUILDINGS[(index + 1) % BUILDINGS.length];
    $("buildingNav").innerHTML = `
      <a class="buildingNav__btn" href="./building.html?id=${previous.id}"><span class="buildingNav__label">上一栋</span><span class="buildingNav__title">${previous.name}</span></a>
      <a class="buildingNav__btn buildingNav__btn--right" href="./building.html?id=${next.id}"><span class="buildingNav__label">下一栋</span><span class="buildingNav__title">${next.name}</span></a>`;
  }

  const building = getBuilding(new URLSearchParams(window.location.search).get("id") || "l100");
  renderHero(building);
  renderSummary(building);
  $("buildingGallery").closest("section").style.display = "none";
  renderSources(building);
  renderNav(building);
})();
