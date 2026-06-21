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
        short: "随园的中轴，宫殿式大屋顶，校徽上的那一栋",
        position: [118.769319, 32.053742],
        text: "金女大时期的“社会与体育专业教学楼”，1923 年建成。一楼是会客厅和办公室，二楼原本是带蜂窝式木格窗的室内体育馆。现在仍是学校重要的接待和会议场所，也是校徽上的主形象。",
        note: "如果第一次来，先认这栋楼，再沿着中轴线慢慢走",
        tags: ["1923", "中轴", "宫殿式"],
      },
      {
        id: "l200",
        title: "200 号楼（科学楼）",
        category: "建筑",
        short: "金女大时期培养女科学家的那栋",
        position: [118.769319, 32.05306],
        text: "1923 年建成，钢筋混凝土宫殿式建筑，曾是生物、化学、物理的实验和教学场所。一楼有阶梯式科学报告厅，二楼是化学、物理教室。走出了刘恩兰、王明贞、吴懋仪等一批中外知名的女科学家。",
        note: "现在一层是国际文化教育学院办公区，对外开放程度有限",
        tags: ["1923", "理科", "阶梯厅"],
      },
      {
        id: "l300",
        title: "300 号楼（文学馆）",
        category: "建筑",
        short: "金女大时期的文科楼，屋脊上有一道历史痕迹",
        position: [118.769319, 32.05439],
        text: "1923 年建成，16 间房，藏过临时图书馆、办公室和文科教室。1943 年日军侵占随园期间在楼顶搭建了瞭望台，这一处凸起保留至今，成了那一段历史的实物见证。",
        note: "现为校办、财务处等行政部门办公地，外部可远观",
        tags: ["1923", "文科", "历史痕迹"],
      },
      {
        id: "music",
        title: "音乐楼",
        category: "建筑",
        short: "顶楼礼堂的窗外能直接看到草坪",
        position: [118.770178, 32.05318],
        text: "1934 年建成，金女大时期的音乐系楼。楼下有 22 间琴房和南北两个小音乐厅，二楼是能容纳 600 多人的礼堂。黄友葵、陈洪、喻宜萱等音乐家都曾在这里教学。",
        note: "礼堂至今仍在举办重要演出，是音乐学院的主阵地",
        tags: ["1934", "礼堂", "琴房"],
      },
      {
        id: "hua",
        title: "华夏图书馆",
        category: "阅读",
        short: "提醒人这里不只是“可参观”，也仍然在被日常使用",
        position: [118.770142, 32.054307],
        text: "1932 年开工，由美国建筑师墨菲设计、墨菲和陈明记营造厂按 1:1 实物模型反复推敲后建成。一楼曾是吴贻芳校长的办公室。1988 年接受香港华夏教育基金会资助后改名为华夏图书馆，藏书约 9.7 万册。",
        note: "85 岁的国保建筑，2025 年起首次闭馆大修，是近两年随园最大的事",
        tags: ["1932", "国保", "在修"],
      },
      {
        id: "grass",
        title: "大草坪",
        category: "空间",
        short: "开阔，也让人自然放慢下来",
        position: [118.769795, 32.053858],
        text: "金女大时期的中心草坪，东西轴线对称，100、200、300 号楼分别坐镇中、南、北。现在仍是开学典礼、社团活动、晒太阳和发呆的现场。",
        note: "很多人对随园的第一层印象，往往都和这片草地有关",
        tags: ["中心", "开阔", "活动"],
      },
      {
        id: "dorm40",
        title: "400-700 号楼（学生宿舍群）",
        category: "建筑",
        short: "金女大时期 4 栋老宿舍，曾是 999 朵玫瑰的住处",
        position: [118.77005, 32.0528],
        text: "1923 至 1924 年陆续建成，每栋约 1151 平米，每幢住 50 人、每间房 2 人。400 号现为数学与计算机科学学院，500 号是外国语学院，其余为办公区。",
        note: "从外观看与 100、200、300 号楼同属宫殿式建筑群",
        tags: ["1923-1924", "宿舍", "学院"],
      },
      {
        id: "zhongda",
        title: "文学院中大楼",
        category: "建筑",
        short: "依山势建的“丁”字型阶梯教室",
        position: [118.76843, 32.0536],
        text: "1954 年建成的“丁”字型建筑，依山而建，教室顺坡势排成阶梯式。设计里能看到梁思成的巧思。2023 年完成两年修缮后重新投入使用，是文学院现址。",
        note: "100 号楼背后那条刻着铭文的小路，就通往这里",
        tags: ["1954", "丁字型", "文学院"],
      },
      {
        id: "yishe",
        title: "一舍与二舍",
        category: "建筑",
        short: "1955 年建成的青砖老宿舍，已入南京市历史建筑名录",
        position: [118.76805, 32.05254],
        text: "随园最古老的宿舍建筑之一，1955 年与南大楼、北大楼同期建成。四层筒子楼结构，青砖黑顶，传承金女大“宫殿式”屋顶，也保留了建国初期“民族形式”风格。",
        note: "2020 年入选南京市第二批历史建筑保护名录",
        tags: ["1955", "宿舍", "历史建筑"],
      },
      {
        id: "southnorth",
        title: "南大楼与北大楼",
        category: "建筑",
        short: "1954 年建成的两栋对称老楼",
        position: [118.76764, 32.0534],
        text: "1954 年与文学院中大楼同期建成，是南京师范学院时期的重要教学楼。沿中轴线对称分布，大屋顶风格，2006 年随金女大旧址整体列入全国重点文物保护单位。",
        note: "和 100、200、300 号楼同属“国保”建筑群",
        tags: ["1954", "对称", "国保"],
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
        year: "1923",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/l100.png",
        feature: "金女大时期的「社会与体育专业教学楼」，随园中轴线最显眼的一栋。",
        source: "南师大随园校区官网",
      },
      {
        id: "l200",
        name: "200 号楼（科学楼）",
        year: "1923",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/l200.png",
        feature: "金女大时期理科教学主楼，从这里走出了多位中外知名女科学家。",
        source: "南师大随园校区官网",
      },
      {
        id: "l300",
        name: "300 号楼（文学馆）",
        year: "1923",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/l300.png",
        feature: "金女大时期文科楼，楼顶保留着 1943 年日军搭建的瞭望台痕迹。",
        source: "南师大随园校区官网",
      },
      {
        id: "music",
        name: "音乐楼",
        year: "1934",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/music.png",
        feature: "楼下 22 间琴房，楼上是 600 人的礼堂，是音乐学院的现址。",
        source: "南师大随园校区官网",
      },
      {
        id: "hua",
        name: "华夏图书馆",
        year: "1932",
        era: "金女大时期",
        category: "阅读",
        cover: "./buildings/photos/hua.png",
        feature: "由墨菲设计、墨菲和陈明记营造厂按 1:1 模型反复推敲后建成，2025 年起首次大修。",
        source: "南师大随园校区官网",
      },
      {
        id: "zhongda",
        name: "文学院中大楼",
        year: "1954",
        era: "南师院时期",
        category: "建筑",
        cover: "./buildings/photos/zhongda.jpg",
        feature: "依山势建的「丁」字型阶梯教室，能看到梁思成式的设计巧思。",
        source: "南师大随园校区官网",
      },
      {
        id: "yishe",
        name: "一舍与二舍",
        year: "1955",
        era: "南师院时期",
        category: "建筑",
        cover: "./buildings/photos/yishe.jpg",
        feature: "随园最古老的宿舍之一，青砖黑顶，已列入南京市历史建筑保护名录。",
        source: "南师大随园校区官网",
      },
      {
        id: "southnorth",
        name: "南大楼与北大楼",
        year: "1954",
        era: "南师院时期",
        category: "建筑",
        cover: "./buildings/photos/south.png",
        feature: "和文学院中大楼同期建成，沿中轴对称分布，同属「国保」建筑群。",
        source: "南师大随园校区官网",
      },
      {
        id: "dorm40",
        name: "400-700 号楼（学生宿舍群）",
        year: "1923-1924",
        era: "金女大时期",
        category: "建筑",
        cover: "./buildings/photos/dorm40.png",
        feature: "金女大时期的 4 栋老宿舍，曾是 999 朵玫瑰的住处。",
        source: "南师大随园校区官网",
      },
    ],
    timeline: [
      {
        year: "1748",
        title: "“随园”这个名字被留下",
        body: "袁枚在这里建园并留下“随园”之名，这也成为后来很多人认识这片空间的起点。",
      },
      {
        year: "1913 - 1937",
        title: "近代校园格局逐渐形成",
        body: "金陵女子大学办学时期，今天人们熟悉的很多校舍和空间秩序都在这一阶段慢慢建立。",
      },
      {
        year: "1937 - 1945",
        title: "这里也承载过更沉重的历史",
        body: "抗战时期，随园与明妮·魏特琳等人的名字联系在一起，这层记忆也一直留在校园里。",
      },
      {
        year: "1952",
        title: "南京师范学院在随园成立",
        body: "院系调整后，南京师范学院以金女大旧址为校址，1954 年的文学院中大楼、南大楼、北大楼和 1955 年的一舍二舍都是这一时期留下的。",
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
              <img src="${item.cover}" alt="${item.name}" loading="lazy" />
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
      weather: "--",
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

  async function tryPluginWeather(AMap) {
    if (!AMap || typeof AMap.Weather !== "function") {
      throw new Error("天气插件未加载");
    }

    const weather = new AMap.Weather();
    const targets = [DATA.campus.adcode, DATA.campus.district, DATA.campus.city];

    for (const target of targets) {
      try {
        const live = await new Promise((resolve, reject) => {
          weather.getLive(target, (err, data) => {
            if (err || !data) {
              reject(err || new Error("天气数据为空"));
              return;
            }
            resolve(data);
          });
        });

        return {
          weather: live.weather || "天气正常",
          temperature: live.temperature ? `${live.temperature}°C` : "--",
        };
      } catch (error) {
        continue;
      }
    }

    throw new Error("天气插件没有返回有效数据");
  }

  async function tryWebServiceWeather() {
    const key = window.SUIYUAN_AMAP_KEY;
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${encodeURIComponent(key)}&city=${DATA.campus.adcode}&extensions=base`;
    const response = await fetch(url);
    const data = await response.json();
    const live = data && data.lives && data.lives[0];

    if (!response.ok || data.status !== "1" || !live) {
      throw new Error(data.info || "天气接口没有返回数据");
    }

    return {
      weather: live.weather || "天气正常",
      temperature: live.temperature ? `${live.temperature}°C` : "--",
    };
  }

  async function loadWeather(AMap) {
    try {
      const values = await tryServerWeather();
      setWeatherValues(values);
      return;
    } catch (serverError) {
      try {
        const values = await tryPluginWeather(AMap);
        setWeatherValues(values);
        return;
      } catch (pluginError) {
        try {
          const values = await tryWebServiceWeather();
          setWeatherValues(values);
          return;
        } catch (serviceError) {
          setWeatherFallback();
        }
      }
    }
  }

  async function initMap() {
    if (!window.AMapLoader) {
      await loadWeather(null);
      return;
    }

    try {
      const AMap = await window.AMapLoader.load({
        key: window.SUIYUAN_AMAP_KEY,
        version: "2.0",
        plugins: ["AMap.Scale", "AMap.Weather"],
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
      await loadWeather(AMap);
    } catch (error) {
      await loadWeather(null);
    }
  }

  function bindEvents() {
    $("suiyuanPlaceList").addEventListener("click", (event) => {
      const target = event.target.closest("[data-point-id]");
      if (!target) return;
      focusPoint(target.dataset.pointId);
    });

    const trigger = $("nextPageTrigger");
    const panel = $("nextPagePanel");
    const input = $("nextPagePassword");
    const submit = $("nextPageSubmit");
    const hint = $("nextPageHint");

    if (trigger && panel && input && submit && hint) {
      const defaultHint = "提示：你的生日";

      const togglePanel = () => {
        const willOpen = panel.hasAttribute("hidden");
        if (willOpen) {
          panel.removeAttribute("hidden");
          hint.textContent = defaultHint;
          window.setTimeout(() => input.focus(), 30);
        } else {
          panel.setAttribute("hidden", "");
          input.value = "";
          hint.textContent = defaultHint;
        }
      };

      const tryEnterNextPage = () => {
        const password = input.value.trim();
        if (password === "0725") {
          hint.textContent = "验证通过，正在进入下一页";
          window.location.href = "./next-page.html";
          return;
        }

        hint.textContent = "密码不对，再试一次";
        input.focus();
        input.select();
      };

      trigger.addEventListener("click", togglePanel);
      submit.addEventListener("click", tryEnterNextPage);
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          tryEnterNextPage();
        }
      });
    }
  }

  renderRightPanel();
  renderCategories();
  renderBuildings();
  renderTimeline();
  bindEvents();
  initMap();
})();
