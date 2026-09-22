(() => {
  const DATA = {
    campus: {
      name: "南京师范大学随园校区",
      address: "南京市鼓楼区宁海路 122 号",
      district: "鼓楼区",
      city: "南京市",
      adcode: "320106",
      center: [118.76905, 32.05345],
    },
    points: [
      {
        id: "l100",
        title: "100 号楼（中大楼）",
        category: "建筑",
        short: "位于历史建筑群中轴线上的代表性建筑",
        position: [118.769319, 32.053742],
        text: "金陵女子大学于 1923 年迁入随园校址。100 号楼处在旧址建筑群的主要轴线上，与大草坪共同构成最容易辨认的校园空间。",
        note: "这里仍是校园使用空间，参观请以学校现场管理要求为准",
        tags: ["20世纪20年代", "中轴", "历史建筑"],
      },
      {
        id: "l200",
        title: "200 号楼（科学楼）",
        category: "建筑",
        short: "历史建筑群南侧的重要教学建筑",
        position: [118.769319, 32.05306],
        text: "200 号楼属于金陵女子大学旧址建筑群，是早期校园科学教育空间的一部分。它与中轴建筑共同构成大草坪周边的对称格局。",
        note: "具体用途与开放状态可能变化，请以学校最新安排为准",
        tags: ["20世纪20年代", "科学教育", "历史建筑"],
      },
      {
        id: "l300",
        title: "300 号楼（文学馆）",
        category: "建筑",
        short: "与大草坪及中轴共同构成早期校园空间",
        position: [118.769319, 32.05439],
        text: "300 号楼属于金陵女子大学旧址建筑群，与大草坪和中轴共同构成早期校园空间。本页只保留公开机构资料能够稳定支持的整体信息。",
        note: "建筑仍在校园环境中使用，适合从外部观察整体格局",
        tags: ["20世纪20年代", "人文教育", "历史建筑"],
      },
      {
        id: "music",
        title: "音乐楼",
        category: "建筑",
        short: "承载音乐教育与公共活动的校园建筑",
        position: [118.770178, 32.05318],
        text: "音乐楼承载了校园音乐教育与公共活动。不同年代的房间数量、礼堂容量和使用安排会变化，本页不把容易过时的数字作为固定信息。",
        note: "它仍是教学与活动空间，是否开放以学校安排为准",
        tags: ["20世纪30年代", "音乐教育", "礼堂"],
      },
      {
        id: "hua",
        title: "华夏图书馆",
        category: "阅读",
        short: "提醒人这里不只是“可参观”，也仍然在被日常使用",
        position: [118.770142, 32.054307],
        text: "华夏图书馆是随园历史建筑中的阅读空间。南京师范大学图书馆资料记载，该馆于 2022 年完成修缮、文献回迁和开放服务条件重建。",
        note: "当前开放情况请以南京师范大学图书馆通知为准",
        tags: ["20世纪30年代", "图书馆", "修缮利用"],
      },
      {
        id: "grass",
        title: "大草坪",
        category: "空间",
        short: "开阔，也让人自然放慢下来",
        position: [118.769795, 32.053858],
        text: "大草坪是旧址建筑群空间组织的重要部分，周边建筑共同形成容易辨认的校园格局。今天这里仍属于在使用中的校园公共空间。",
        note: "很多人对随园的第一层印象，往往都和这片草地有关",
        tags: ["中心", "开阔", "活动"],
      },
      {
        id: "dorm40",
        title: "400-700 号楼（学生宿舍群）",
        category: "建筑",
        short: "金女大时期校园生活与住宿空间的一部分",
        position: [118.77005, 32.0528],
        text: "400—700 号楼让旧址历史不只停留在教学建筑，也包含学生生活空间。现用部门可能调整，本页不作长期不变的承诺。",
        note: "从外部可观察它们与早期校园建筑群的整体关系",
        tags: ["20世纪20年代", "宿舍建筑", "校园生活"],
      },
      {
        id: "zhongda",
        title: "文学院中大楼",
        category: "建筑",
        short: "依校园地形展开的南师院时期教学建筑",
        position: [118.76843, 32.0536],
        text: "中大楼体现了校园在南京师范学院时期继续发展的轨迹。它依地形展开，是随园后续教学空间的重要组成部分。",
        note: "导览只介绍外部空间关系，不承诺室内参观",
        tags: ["20世纪50年代", "教学空间", "文学院"],
      },
      {
        id: "yishe",
        title: "一舍与二舍",
        category: "建筑",
        short: "随园后续建设阶段留下的宿舍建筑",
        position: [118.76805, 32.05254],
        text: "一舍与二舍记录了校园生活空间在 20 世纪 50 年代的继续扩展。旧版中缺少稳定一手来源的结构材料和编号信息已删除。",
        note: "具体结构材料、保护编号和当前用途应以正式资料为准",
        tags: ["20世纪50年代", "宿舍", "校园生活"],
      },
      {
        id: "southnorth",
        title: "南大楼与北大楼",
        category: "建筑",
        short: "校园轴线周边的后续教学建筑",
        position: [118.76764, 32.0534],
        text: "南大楼与北大楼属于校园后续建设。国务院 2006 年公布的全国重点文物保护单位名称是“金陵女子大学旧址”，具体单体范围应以正式文保资料为准。",
        note: "从外部可观察它们与校园轴线及周边建筑的空间关系",
        tags: ["20世纪50年代", "教学楼", "校园延续"],
      },
      {
        id: "defeng",
        title: "德风园",
        category: "园林",
        short: "更能让人感到“随园气”的地方",
        position: [118.768722, 32.053639],
        text: "和教学楼、主路相比，这里更安静，也更能让人慢慢注意到随园本身的性格。",
        note: "如果想找一个最能代表随园气质的角落，很多人都会想到这里",
        tags: ["园林", "安静", "书卷气"],
      },
      {
        id: "studyroom",
        title: "德风书房",
        category: "阅读",
        short: "不大，但很适合坐下来停一会儿",
        position: [118.768801, 32.052681],
        text: "它没有很强的展示感，反而因为低调，显得更适合阅读和独处。",
        note: "在随园，这类尺度不大的空间反而最容易留下印象",
        tags: ["阅读", "书房", "停顿"],
      },
      {
        id: "wen",
        title: "文学院",
        category: "人文",
        short: "名字本身就带着很明确的气质",
        position: [118.768108, 32.053038],
        text: "走到这里，很容易联想到语言、写作、讨论，以及随园一直很浓的人文氛围。",
        note: "很多人提到随园的文气，心里都会经过这一处",
        tags: ["人文", "语言", "讨论"],
      },
      {
        id: "minnie",
        title: "明妮魏特琳雕像",
        category: "记忆",
        short: "这里让随园的历史不只是风景",
        position: [118.770248, 32.052247],
        text: "这个点被保留下来，不是因为它适合拍照，而是因为它提醒人，校园里也有需要认真记住的历史。",
        note: "走到这里，很多轻松的浏览感会自然退后一些",
        tags: ["人物", "历史", "责任"],
      },
      {
        id: "southvilla",
        title: "南山专家楼",
        category: "旧景",
        short: "走到这里，脚步会不自觉地更慢",
        position: [118.769477, 32.052416],
        text: "坡道、旧楼和树影叠在一起，气氛和主路一带不太一样，更适合安静地看一会儿。",
        note: "它不是最热闹的地方，却很容易让人回头再看一眼",
        tags: ["坡地", "旧楼", "树影"],
      },
    ],
    buildings: [
      {
        id: "l100",
        name: "100 号楼（中大楼）",
        year: "20世纪20年代",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/l100.webp",
        feature: "位于历史建筑群中轴线上的代表性建筑。",
      },
      {
        id: "l200",
        name: "200 号楼（科学楼）",
        year: "20世纪20年代",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/l200.webp",
        feature: "历史建筑群南侧的重要教学建筑。",
      },
      {
        id: "l300",
        name: "300 号楼（文学馆）",
        year: "20世纪20年代",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/l300.webp",
        feature: "与大草坪及中轴共同构成早期校园空间。",
      },
      {
        id: "music",
        name: "音乐楼",
        year: "20世纪30年代",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/music.webp",
        feature: "承载音乐教育与公共活动的校园建筑。",
      },
      {
        id: "hua",
        name: "华夏图书馆",
        year: "20世纪30年代",
        era: "金女大时期",
        category: "阅读",
        cover: "./buildings/photos/hua.webp",
        feature: "2022 年完成修缮和开放服务条件重建的历史阅读空间。",
      },
      {
        id: "zhongda",
        name: "文学院中大楼",
        year: "20世纪50年代",
        era: "南师院时期",
        category: "建筑",
        cover: "./buildings/photos/zhongda.webp",
        feature: "依校园地形展开的南师院时期教学建筑。",
      },
      {
        id: "yishe",
        name: "一舍与二舍",
        year: "20世纪50年代",
        era: "南师院时期",
        category: "建筑",
        cover: "./buildings/photos/yishe.webp",
        feature: "随园后续建设阶段留下的宿舍建筑。",
      },
      {
        id: "southnorth",
        name: "南大楼与北大楼",
        year: "20世纪50年代",
        era: "南师院时期",
        category: "建筑",
        cover: "./buildings/photos/south.webp",
        feature: "位于校园轴线周边的后续教学建筑。",
      },
      {
        id: "dorm40",
        name: "400-700 号楼（学生宿舍群）",
        year: "20世纪20年代",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/dorm40.webp",
        feature: "呈现早期校园生活与住宿功能的一组建筑。",
      },
    ],
    timeline: [
      {
        year: "1923 - 1937",
        title: "近代校园格局逐渐形成",
        body: "金陵女子大学迁入随园校址后，今天人们熟悉的多处校舍和空间秩序在这一阶段逐渐形成。",
      },
      {
        year: "1937 - 1945",
        title: "这里也承载过更沉重的历史",
        body: "抗战时期，随园与明妮·魏特琳等人的名字联系在一起，这层记忆也一直留在校园里。",
      },
      {
        year: "1952",
        title: "南京师范学院在随园成立",
        body: "院系调整后，南京师范学院以金女大旧址为校址；校园在 20 世纪 50 年代继续增加教学与生活建筑。",
      },
      {
        year: "今天",
        title: "它仍然是一座被日常使用的校园",
        body: "图书馆、教室、草地和路口都还在继续被经过，所以随园既是历史空间，也是很多人今天的校园生活现场。",
      },
    ],
  };

  const state = {
    pointId: DATA.points[0].id,
    category: "全部",
  };

  const CATEGORY_META = {
    "建筑": { icon: "🏛", color: "#1e6c56" },
    "空间": { icon: "☘", color: "#268d79" },
    "园林": { icon: "🌿", color: "#5a8a3a" },
    "阅读": { icon: "📖", color: "#7a5b3a" },
    "人文": { icon: "✒", color: "#2d5a7a" },
    "记忆": { icon: "✦", color: "#8a4a4a" },
    "旧景": { icon: "◐", color: "#6a6a6a" },
  };

  let map = null;
  let mapApi = null;
  let infoWindow = null;
  const markers = new Map();

  const $ = (id) => document.getElementById(id);
  const getPoint = (id) => DATA.points.find((item) => item.id === id) || DATA.points[0];

  function getFilteredPoints() {
    if (state.category === "全部") return DATA.points;
    return DATA.points.filter((p) => p.category === state.category);
  }

  function getCategories() {
    const set = new Set(DATA.points.map((p) => p.category));
    return ["全部", ...Array.from(set)];
  }

  function getCategoryIcon(name) {
    return (CATEGORY_META[name] && CATEGORY_META[name].icon) || "•";
  }

  function renderCategories() {
    const bar = $("suiyuanCategoryBar");
    if (!bar) return;
    const cats = getCategories();
    bar.innerHTML = cats
      .map(
        (cat) => `
          <button class="suiyuanCategoryChip ${cat === state.category ? "is-active" : ""}" data-category="${cat}">
            <span class="suiyuanCategoryChip__icon">${cat === "全部" ? "✦" : getCategoryIcon(cat)}</span>
            <span>${cat}</span>
            <span class="suiyuanCategoryChip__count">${cat === "全部" ? DATA.points.length : DATA.points.filter(p => p.category === cat).length}</span>
          </button>
        `,
      )
      .join("");

    bar.addEventListener("click", (event) => {
      const target = event.target.closest("[data-category]");
      if (!target) return;
      const next = target.dataset.category;
      if (next === state.category) return;
      state.category = next;
      const first = getFilteredPoints()[0];
      if (first) {
        state.pointId = first.id;
      }
      renderCategories();
      renderRightPanel();
      refreshMarkers();
      focusPoint(state.pointId, { silent: true });
    });
  }

  function renderRightPanel() {
    const point = getPoint(state.pointId);
    const filtered = getFilteredPoints();

    $("suiyuanPlaceCount").innerHTML = `共 <strong>${filtered.length}</strong> 个地点`;

    $("suiyuanPlaceList").innerHTML = filtered
      .map(
        (item, index) => `
          <button class="suiyuanPlaceLink ${item.id === state.pointId ? "is-active" : ""}" data-point-id="${item.id}">
            <span class="suiyuanPlaceLink__index">${String(index + 1).padStart(2, "0")}</span>
            <span class="suiyuanPlaceLink__body">
              <span class="suiyuanPlaceLink__title">${item.title}</span>
              <span class="suiyuanPlaceLink__meta">
                <span class="suiyuanPlaceLink__cat">${getCategoryIcon(item.category)} ${item.category}</span>
              </span>
            </span>
            <span class="suiyuanPlaceLink__arrow" aria-hidden="true">→</span>
          </button>
        `,
      )
      .join("");

    $("pointDetail").innerHTML = `
      <div class="suiyuanDetailCard__eyebrow">
        <span class="suiyuanDetailCard__dot"></span>
        ${getCategoryIcon(point.category)} ${point.category}
      </div>
      <h3 class="suiyuanDetailCard__title">${point.title}</h3>
      <p class="suiyuanDetailCard__short">${point.short}</p>
      <p class="suiyuanDetailCard__text">${point.text}</p>
      <p class="suiyuanDetailCard__note">${point.note}</p>
      <div class="suiyuanDetailCard__chips">
        ${point.tags.map((tag) => `<span class="suiyuanDetailCard__chip">${tag}</span>`).join("")}
      </div>
    `;
  }

  function renderBuildings() {
    const grid = $("suiyuanBuildingGrid");
    if (!grid) return;

    grid.innerHTML = DATA.buildings
      .map(
        (item) => `
          <a class="suiyuanBuildingCard" href="./building.html?id=${item.id}">
            <div class="suiyuanBuildingCard__cover">
              <img src="${item.cover}" alt="AI 辅助生成的${item.name}原创建筑插画，非实景照片" loading="lazy" />
              <span class="suiyuanBuildingCard__aiLabel">AI 辅助生成插画</span>
            </div>
            <div class="suiyuanBuildingCard__body">
              <div class="suiyuanBuildingCard__meta">
                <span>${item.era || "随园"}</span>
                <span>·</span>
                <span>${item.category}</span>
              </div>
              <h3 class="suiyuanBuildingCard__title">${item.name}</h3>
              <p class="suiyuanBuildingCard__feature">${item.feature}</p>
              <div class="suiyuanBuildingCard__cta">
                <span>查看详情</span>
                <span class="suiyuanBuildingCard__arrow" aria-hidden="true">→</span>
              </div>
            </div>
          </a>
        `,
      )
      .join("");
  }

  function renderTimeline() {
    $("suiyuanTimeline").innerHTML = DATA.timeline
      .map(
        (item) => `
          <article class="suiyuanTimelineItem">
            <div class="section__eyebrow">${item.year}</div>
            <h3 class="section__title">${item.title}</h3>
            <div class="section__body">${item.body}</div>
          </article>
        `,
      )
      .join("");
  }

  function refreshMarkers() {
    markers.forEach((marker, id) => {
      marker.setOptions({ radius: id === state.pointId ? 9 : 7 });
    });
  }

  function focusPoint(id, options = {}) {
    state.pointId = id;
    renderRightPanel();
    refreshMarkers();

    if (!map || !mapApi || !markers.has(id)) return;

    const point = getPoint(id);
    if (!options.silent) {
      map.setZoomAndCenter(18, point.position);
    }

    if (!infoWindow) {
      infoWindow = new mapApi.InfoWindow({
        offset: new mapApi.Pixel(0, -18),
      });
    }

    infoWindow.setContent(`
      <div class="suiyuanInfoWindow">
        <span class="suiyuanInfoWindow__cat">${getCategoryIcon(point.category)} ${point.category}</span>
        <strong>${point.title}</strong>
        <p>${point.short}</p>
      </div>
    `);
    infoWindow.open(map, point.position);
  }

  function setWeatherValues({ weather, temperature }) {
    const icon = $("weatherIcon");
    const map = {
      "晴": "☀",
      "多云": "⛅",
      "阴": "☁",
      "雨": "☂",
      "小雨": "☂",
      "中雨": "☂",
      "大雨": "☂",
      "雪": "❄",
      "雾": "🌫",
    };
    let matched = "⛅";
    for (const key of Object.keys(map)) {
      if (weather && weather.indexOf(key) >= 0) {
        matched = map[key];
        break;
      }
    }
    if (icon) icon.textContent = matched;
    $("weatherText").textContent = weather;
    $("weatherTemp").textContent = temperature;
  }

  function setWeatherFallback() {
    setWeatherValues({
      weather: "暂不可用",
      temperature: "--",
    });
  }

  async function tryServerWeather() {
    const response = await fetch(`/api/suiyuan-weather?city=${encodeURIComponent(DATA.campus.adcode)}`, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    const live = data && data.live;

    if (!response.ok || !data || data.status !== "1" || !live) {
      throw new Error((data && data.info) || "站内天气接口没有返回数据");
    }

    return {
      weather: live.weather || "天气正常",
      temperature: live.temperature ? `${live.temperature}°C` : "--",
    };
  }

  async function loadWeather() {
    try {
      const values = await tryServerWeather();
      setWeatherValues(values);
    } catch (error) {
      setWeatherFallback();
    }
  }

  async function initMap() {
    if (!window.AMapLoader) {
      $("mapTips").textContent = "地图服务暂时无法加载，你仍可使用右侧地点列表浏览导览。";
      await loadWeather();
      return;
    }

    try {
      const AMap = await window.AMapLoader.load({
        key: window.SUIYUAN_AMAP_MAP_KEY,
        version: "2.0",
        plugins: ["AMap.Scale"],
      });

      mapApi = AMap;
      map = new AMap.Map("amap-container", {
        zoom: 17,
        center: DATA.campus.center,
        viewMode: "3D",
        mapStyle: "amap://styles/whitesmoke",
        resizeEnable: true,
        pitchEnable: false,
        rotateEnable: false,
      });

      map.addControl(new AMap.Scale());

      DATA.points.forEach((point) => {
        const marker = new AMap.CircleMarker({
          center: point.position,
          radius: point.id === state.pointId ? 9 : 7,
          strokeColor: "#1e6c56",
          strokeWeight: 2,
          fillColor: "#f3faf5",
          fillOpacity: 0.98,
          bubble: true,
        });

        marker.on("click", () => focusPoint(point.id));
        marker.setMap(map);
        markers.set(point.id, marker);
      });

      focusPoint(state.pointId);
      await loadWeather();
    } catch (error) {
      $("mapTips").textContent = "地图服务暂时无法加载，你仍可使用右侧地点列表浏览导览。";
      await loadWeather();
    }
  }

  function bindEvents() {
    $("suiyuanPlaceList").addEventListener("click", (event) => {
      const target = event.target.closest("[data-point-id]");
      if (!target) return;
      focusPoint(target.dataset.pointId);
    });

  }

  renderRightPanel();
  renderCategories();
  renderBuildings();
  renderTimeline();
  bindEvents();
  initMap();
})();
