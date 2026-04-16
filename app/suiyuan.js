(() => {
  const DATA = {
    campus: {
      name: "南京师范大学随园校区",
      address: "南京市鼓楼区宁海路 122 号",
      district: "鼓楼区",
      city: "南京市",
      adcode: "320106",
      center: [118.76768, 32.053187],
    },
    points: [
      {
        id: "l100",
        title: "100 号楼",
        category: "建筑",
        short: "很多人第一次认识随园，都是先记住它",
        position: [118.769319, 32.053742],
        text: "站在楼前，会先看到一种很稳定的秩序感。它不张扬，但很容易让人把随园和它联系在一起。",
        note: "如果第一次来，不妨先从这里开始，再往草坪和德风园慢慢走",
        tags: ["中轴", "入口", "老楼"],
      },
      {
        id: "grass",
        title: "大草坪",
        category: "空间",
        short: "开阔，也让人自然放慢下来",
        position: [118.769795, 32.053858],
        text: "这里不是单纯的一片空地。活动、晒太阳、发呆、路过，很多日常都会在这里发生。",
        note: "很多人对随园的第一层印象，往往都和这片草地有关",
        tags: ["草地", "开阔", "停留"],
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
        id: "hua",
        title: "华夏图书馆",
        category: "阅读",
        short: "提醒人这里不只是“可参观”，也仍然在被日常使用",
        position: [118.770142, 32.054307],
        text: "图书馆把随园拉回到当下。它不是只供回望的老校园，也还是一座在继续运转的校园。",
        note: "如果傍晚经过这里，随园会显得更安静一些",
        tags: ["图书馆", "学习", "日常"],
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
        year: "今天",
        title: "它仍然是一座被日常使用的校园",
        body: "图书馆、教室、草地和路口都还在继续被经过，所以随园既是历史空间，也是很多人今天的校园生活现场。",
      },
    ],
  };

  const state = {
    pointId: DATA.points[0].id,
  };

  let map = null;
  let mapApi = null;
  let infoWindow = null;
  const markers = new Map();

  const $ = (id) => document.getElementById(id);
  const getPoint = (id) => DATA.points.find((item) => item.id === id) || DATA.points[0];

  function renderPoints() {
    const point = getPoint(state.pointId);

    $("suiyuanPlaceList").innerHTML = DATA.points
      .map(
        (item) => `
          <button class="suiyuanPlaceLink ${item.id === state.pointId ? "is-active" : ""}" data-point-id="${item.id}">
            <strong>${item.title}</strong>
            <span>${item.category}</span>
          </button>
        `,
      )
      .join("");

    $("pointDetail").innerHTML = `
      <div class="section__eyebrow">${point.category}</div>
      <h3 class="section__title">${point.title}</h3>
      <div class="section__body">
        <p>${point.short}</p>
        <p>${point.text}</p>
        <p>${point.note}</p>
      </div>
      <div class="typeChipWrap">
        ${point.tags.map((tag) => `<span class="typeChip">${tag}</span>`).join("")}
        <span class="typeChip">坐标 · ${point.position[0].toFixed(6)}, ${point.position[1].toFixed(6)}</span>
      </div>
    `;
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

  function focusPoint(id) {
    state.pointId = id;
    renderPoints();
    refreshMarkers();

    if (!map || !mapApi || !markers.has(id)) return;

    const point = getPoint(id);
    map.setZoomAndCenter(18, point.position);

    if (!infoWindow) {
      infoWindow = new mapApi.InfoWindow({
        offset: new mapApi.Pixel(0, -18),
      });
    }

    infoWindow.setContent(`
      <div class="suiyuanInfoWindow">
        <strong>${point.title}</strong>
        <p>${point.short}</p>
      </div>
    `);
    infoWindow.open(map, point.position);
  }

  function setWeatherValues({ weather, temperature, wind, time, note }) {
    $("weatherText").textContent = weather;
    $("weatherTemp").textContent = temperature;
    $("weatherWind").textContent = wind;
    $("weatherTime").textContent = time;
    $("weatherNote").textContent = note;
  }

  function setWeatherFallback(note) {
    setWeatherValues({
      weather: "天气未获取",
      temperature: "请稍后",
      wind: "暂不可用",
      time: "等待刷新",
      note,
    });
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
          wind: `${live.windDirection || live.winddirection || "风向"} ${live.windPower || live.windpower || "--"} 级`,
          time: live.reportTime || live.reporttime || "刚刚更新",
          note: `天气按 ${live.city || DATA.campus.district} 区域展示`,
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
      wind: `${live.winddirection || "风向"} ${live.windpower || "--"} 级`,
      time: live.reporttime || "刚刚更新",
      note: `天气按 ${live.city || DATA.campus.district} 区域展示`,
    };
  }

  async function loadWeather(AMap) {
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
        setWeatherFallback("天气暂时没有取到，可能是当前 key、域名白名单或网络权限还没有完全生效");
      }
    }
  }

  async function initMap() {
    const tips = $("mapTips");

    if (!window.AMapLoader) {
      tips.textContent = "高德地图加载器没有成功引入，右侧地标文字仍然可以正常浏览";
      setWeatherFallback("天气接口没有成功加载，但不影响继续浏览随园页面");
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
      tips.textContent = "地图已加载。你可以点地图上的圆点，也可以从右侧列表切换地标";
      await loadWeather(AMap);
    } catch (error) {
      tips.textContent = "地图暂时没有成功加载，常见原因是 key、securityJsCode、域名白名单或当前网络权限限制";
      setWeatherFallback("天气暂时没有取到，可能是当前 key 还没有完成对应服务权限的配置");
    }
  }

  function bindEvents() {
    $("suiyuanPlaceList").addEventListener("click", (event) => {
      const target = event.target.closest("[data-point-id]");
      if (!target) return;
      focusPoint(target.dataset.pointId);
    });
  }

  renderPoints();
  renderTimeline();
  bindEvents();
  initMap();
})();
