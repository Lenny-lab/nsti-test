(() => {
  const PHOTOS = "./buildings/photos/";

  const BUILDINGS = [
    {
      id: "l100",
      name: "100 号楼（中大楼）",
      year: "1923",
      yearRange: "1923",
      era: "金女大时期",
      category: "建筑",
      short: "随园的中轴，宫殿式大屋顶，校徽上的那一栋。",
      lead: "金女大时期的「社会与体育专业教学楼」，从 1923 年立起来，就是随园所有叙事的起点。",
      tags: ["宫殿式", "中轴", "校徽", "全国重点文保"],
      hero: "l100.png",
      summary: [
        "整楼造型为中国传统宫殿式建筑风格，钢筋混凝土结构，建筑面积 1431.78 平米，由金陵女子大学的姐妹学校 Smith College 捐资 5 万美元建成。",
        "一楼是会客厅和办公室，学校重要接待活动多在此举办，早期兼礼拜堂、社交室功能；二楼是室内体育馆，蜂窝式木格窗是为运动安全专门设计的。"
      ],
      article: {
        paragraphs: [
          "南师大随园迎宾楼，简称 100 号楼，是随园的标志性建筑，为南京师范大学校徽重要组成部分。",
          "金女大教师合影中常见 100 号的身影——它是迎宾楼，也是日常社交的中心。每天上午 10 点，一楼大厅会提供早茶，课间休息的老师们在此享用并相互交流。1946-1948 年在金女大任教的陈正平（被称作中国的肖邦）就开玩笑说：中央大学、金陵大学都邀请我去任教，我选择来金女大，就是看中了女大的早茶。",
          "迎宾室也是金女大时期举行婚礼的场所。物理系主任熊子敬与地理系老师蔡德粹的婚礼，黄炎培长女张全平与张心一的婚礼，会计处主任陈尔昌女儿的婚礼，都是在 100 号一楼举行，由吴贻芳校长主婚或证婚。",
          "100 号楼背面有一座水池，池上有曲桥与凉亭，池边点缀假山，是金女大时期就形成的园林式小景。"
        ],
        source: "南师大随园校区官网 / Sohu 走近熟悉而又陌生的100号楼 / 江南时报",
        sourceUrl: "https://m.sohu.com/a/396154391_661998/"
      }
    },
    {
      id: "l200",
      name: "200 号楼（科学楼）",
      year: "1923",
      yearRange: "1923",
      era: "金女大时期",
      category: "建筑",
      short: "金女大时期培养女科学家的那栋。",
      lead: "1923 年建成的钢筋混凝土宫殿式建筑，是金女大生物、化学、物理的实验和教学场所。",
      tags: ["宫殿式", "理科", "女科学家", "全国重点文保"],
      hero: "l200.png",
      summary: [
        "钢筋混凝土宫殿式建筑，1923 年建成。一楼有阶梯式科学报告厅，二楼是化学、物理教室。",
        "从这栋楼走出了刘恩兰、王明贞、吴懋仪等一批中外知名的女科学家。它也是金女大全人教育中科学一翼的现场。"
      ],
      article: {
        paragraphs: [
          "200 号楼是金女大时期的理科教学主楼，1923 年建成，建筑面积 1546.61 平方米。一楼有可容百人的阶梯式科学报告厅，二楼是化学、物理教室和实验室。",
          "金女大虽以文科见长，但 200 号楼的存在让「科学也属于女性」成了具体可感的事。从这里走出了刘恩兰（中国第一位女海洋学家）、王明贞（物理学家）、吴懋仪（化学家）、何怡贞（物理学家）、胡秀英（植物学家）等一批杰出的女科学家。",
          "金女大还与北京协和医学院合作，由金女大提供三年医学预科教学，从这里培养出的预科生很多考入协和医学院。",
          "现在 200 号楼的一层是国际文化教育学院办公区，设有国家汉语培训基地，对外开放程度有限，但建筑外观和宫殿式屋顶依然完整保留。"
        ],
        source: "南师大随园校区官网",
        sourceUrl: "http://sy.njnu.edu.cn/info/1013/3005.htm"
      }
    },
    {
      id: "l300",
      name: "300 号楼（文学馆）",
      year: "1923",
      yearRange: "1923",
      era: "金女大时期",
      category: "建筑",
      short: "屋脊上有一道历史痕迹的那栋。",
      lead: "金女大时期的文科楼，1943 年日军侵占随园期间在楼顶搭建了瞭望台，这一处凸起保留至今。",
      tags: ["宫殿式", "文科", "历史痕迹", "全国重点文保"],
      hero: "l300.png",
      summary: [
        "1923 年建成，建筑面积 1491.75 平方米，分上下两层共 16 间房。",
        "1943 年日军侵占随园期间在楼顶搭建了瞭望台，凸起保留至今，是那段历史的实物见证。"
      ],
      article: {
        paragraphs: [
          "300 号楼位于大草坪北侧，最早是金女大的文科楼，1923 年建成，共 16 间房。中文、英文、教育、社会学、家政、历史、哲学、经济、政治等专业学生曾在此学习。早期还曾临时充当过图书馆。",
          "1942 年 6 月 19 日随园被日本侵略军占作南京防卫司令部。1943 年前后，日军为防空观察需要，在 300 号楼顶加建了瞭望台——日军在二楼建了平台和屋顶瞭望台。抗战胜利后被保留下来。",
          "这处凸起成为随园现存的实物历史记忆之一。从校园东侧远眺，可以清楚地看到楼顶那道与原宫殿式屋顶不太协调的痕迹——这是金女大旧址作为全国重点文物保护单位的一部分，也提醒着每一位路过它的人。",
          "楼前建校时栽种的雪松郁郁苍苍，见证了一段历史沧桑。现为南师大校办、财务处、保卫处等行政部门的办公地。"
        ],
        source: "南师大随园校区官网",
        sourceUrl: "http://sy.njnu.edu.cn/info/1013/2975.htm"
      }
    },
    {
      id: "music",
      name: "音乐楼（随园音乐厅）",
      year: "1934",
      yearRange: "1934",
      era: "金女大时期",
      category: "建筑",
      short: "顶楼礼堂窗外能直接看到草坪。",
      lead: "1934 年建成的音乐系楼，楼下 22 间琴房，楼上是可容 600 人的礼堂。",
      tags: ["宫殿式", "礼堂", "琴房", "音乐学院"],
      hero: "music.png",
      summary: [
        "1934 年建成，钢筋混凝土宫殿式建筑。楼下有 22 间琴房、办公室和教学室，南北各两个小音乐厅；二楼礼堂座位超过 600 人。",
        "黄友葵、陈洪、喻宜萱等音乐家都曾在这里教学。礼堂至今仍是音乐学院的主阵地。"
      ],
      article: {
        paragraphs: [
          "音乐楼在大草坪的东南侧，1934 年建成投入使用。整楼造型为中国传统宫殿式建筑风格，钢筋混凝土结构，屋顶由柱子支撑，显示中国屋顶的结构梁和椽子。钢窗简单装饰，产生了格子图案的效果。支柱和屋顶被装饰得五颜六色。",
          "一层和夹层用于音乐创作，含 22 个练琴室，办公室和教学室。南北有两个小音乐厅，学生常在此举办非正式演出。二楼为礼堂兼音乐厅，可以容纳超过 600 人。学校的大型活动常在礼堂举行。",
          "1934 年夏礼堂落成时，吴贻芳校长邀请蒋介石及夫人来金女大参加毕业典礼。如今一楼南面的小音乐厅改为舞蹈房，二楼礼堂现可容纳 200 多人，常在此举办重要会议和演出。",
          "金女大将音乐熏陶作为「全人教育」的重要方面，实行音乐通识教育：钢琴、声乐、音乐通论三门不计学分的课程为大一必修。"
        ],
        source: "南师大随园校区官网",
        sourceUrl: "http://sy.njnu.edu.cn/info/1013/2995.htm"
      }
    },
    {
      id: "hua",
      name: "华夏图书馆",
      year: "1932",
      yearRange: "1932",
      era: "金女大时期",
      category: "阅读",
      short: "提醒人这里不只是「可参观」，也仍然在被日常使用。",
      lead: "由美国建筑师墨菲设计、墨菲和陈明记营造厂按 1:1 实物模型反复推敲后建成。",
      tags: ["墨菲设计", "国保", "在修"],
      hero: "hua.png",
      summary: [
        "1932 年开工，由美国建筑师亨利·墨菲设计。为加深对中国传统建筑的理解，墨菲和陈明记营造厂先在图书馆南侧十几米处现场制作了足尺石膏实物转角模型，反复推敲屋面与构件之间的关系。",
        "一楼曾是吴贻芳校长的办公室。1988 年接受香港华夏教育基金会资助后改名为华夏图书馆，藏书约 9.7 万册。2025 年起首次闭馆大修。"
      ],
      article: {
        paragraphs: [
          "金陵女子大学的校园建筑规划与设计由美国建筑师亨利·墨菲担任。墨菲在中国规划和设计了长沙雅礼大学、清华学堂、上海沪江大学、金陵女子大学、燕京大学在内的多所校园及其建筑。他还于 1928 年作为主要顾问，主持了民国第一个城市规划《首都计划》的制订。",
          "1918 年墨菲被正式确认为金女大校园的建筑师，1921 年委托南京最负盛名的建筑公司之一——陈明记营造厂开始了校园建筑的施工。第一期工程的 7 座建筑于 1926 年底和 1927 年初全部完成。",
          "为在第二期工程中加深对中国传统建筑的理解，1932 年开工建造图书馆时，墨菲在陈明记营造厂的帮助下，先在图书馆南侧十几米处现场制作了足尺石膏实物转角模型（石灰大样），将蓝图设计的细节做成大比例的实物模型。这是第一期工程所没有的体验，也给墨菲带来了极大的快乐。",
          "1952 年全国高校院系调整时成为南京师范学院图书馆，1988 年接受香港华夏教育基金会的资助，后改名为华夏图书馆。2025 年起进入首次闭馆大修，是近两年随园最大的事。"
        ],
        source: "南师大随园校区官网"
      }
    },
    {
      id: "zhongda",
      name: "文学院中大楼",
      year: "1954",
      yearRange: "1954",
      era: "南师院时期",
      category: "建筑",
      short: "依山势建的「丁」字型阶梯教室。",
      lead: "1954 年建成的「丁」字型建筑，依山而建，教室顺坡势排成阶梯式。",
      tags: ["1954", "丁字型", "文学院"],
      hero: "zhongda.jpg",
      summary: [
        "南京师范学院 1954 年建成的代表性教学楼之一，依山势设计为「丁」字型，教室顺坡排成阶梯式。",
        "设计里能看到梁思成式的巧思——把功能性（阶梯教室）和地形（坡地）合在一起。2023 年完成两年修缮后重新投入使用，是文学院现址。"
      ],
      article: {
        paragraphs: [
          "文学院中大楼建于 1954 年，是南京师范学院时期的重要教学楼。",
          "它依随园东侧的山势而建，呈「丁」字型，教室顺坡排成阶梯式——这是中国 1950 年代「民族形式」建筑的一种典型探索，也被认为与梁思成对传统建筑的现代转化思路有相通之处。",
          "从 100 号楼背后那条刻着铭文的小路可以直接走到中大楼脚下。2023 年完成两年修缮后重新投入使用，是南师大文学院的现址。"
        ],
        source: "南师大随园校区官网"
      }
    },
    {
      id: "yishe",
      name: "一舍与二舍",
      year: "1955",
      yearRange: "1955",
      era: "南师院时期",
      category: "建筑",
      short: "1955 年建成的青砖老宿舍，已入南京市历史建筑名录。",
      lead: "随园最古老的宿舍建筑之一，1955 年与南大楼、北大楼同期建成。",
      tags: ["1955", "青砖", "历史建筑", "宿舍"],
      hero: "yishe.jpg",
      summary: [
        "1955 年建成的四层筒子楼结构，青砖黑顶，传承金女大宫殿式屋顶，也保留了建国初期民族形式风格。",
        "2020 年入选南京市第二批历史建筑保护名录。",
        "有意思的是，整栋楼没有用钢筋，而是用竹筋——是中国最传统的土木结构，这也是它被列入历史建筑的原因之一。"
      ],
      article: {
        paragraphs: [
          "一舍与二舍建于 1955 年，是随园最古老的宿舍建筑之一。它与南大楼、北大楼、文学院中大楼同期建成，组成了南京师范学院时期校园建设的核心。",
          "建筑为四层筒子楼结构，青砖黑顶，屋顶传承了金女大时期宫殿式风格，同时融入了 1950 年代民族形式探索。",
          "有意思的是，整栋楼没有用钢筋，而是用竹筋——是中国最传统的土木结构。两幢宿舍楼均为四方形四层建筑，黑顶青砖显得古朴秀丽，里面是传统的筒子楼结构，一层有 14 个房间，有公共盥洗室、厕所和浴室。",
          "2020 年入选南京市第二批历史建筑保护名录（编号 NJ0075 / NJ0076）。它们既是宿舍，也是民族形式建筑在随园留下的实物证据。",
          "同一时间建设的三舍和四舍，如今只剩下一舍和二舍了——这两个宿舍在建设之初就是女生宿舍，从这里走出了大批名人、大家。红色的木头门、楼梯的木扶手、斑驳的吊扇都在诉说这栋老楼曾经的历史。"
        ],
        source: "南京市第二批历史建筑保护名录、江苏教育频道"
      }
    },
    {
      id: "southnorth",
      name: "南大楼与北大楼",
      year: "1954",
      yearRange: "1954",
      era: "南师院时期",
      category: "建筑",
      short: "1954 年建成的两栋对称老楼。",
      lead: "南京师范学院时期与文学院中大楼同期建成，沿中轴线对称分布。",
      tags: ["1954", "对称", "国保"],
      hero: "south.png",
      summary: [
        "1954 年与文学院中大楼同期建成，是南京师范学院时期的重要教学楼。",
        "主设计杨廷宝、梁思成参与。沿中轴线对称分布，大屋顶风格。",
        "2006 年随金女大旧址整体列入全国重点文物保护单位。"
      ],
      article: {
        paragraphs: [
          "南大楼与北大楼建于 1954 年，与文学院中大楼同期建成，是南京师范学院时期校园向南扩展的代表性建筑。",
          "两栋楼沿中轴线对称分布，延续了金女大时期宫殿式大屋顶风格：青石基座、红柱黄墙、歇山顶大屋顶的三段式中国古典建筑形制。",
          "应首任院长陈鹤琴之邀，杨廷宝先生主设计、梁思成先生参与设计。设计里能看出对金女大时期宫殿式屋顶的延续，檐下混凝土斗拱与梁柱严丝合缝，立面窗户去繁就简。",
          "南大楼原为数理馆（现属文学院），北大楼原为文史地馆（教学楼）。2006 年，它们与 100、200、300 号楼等金女大旧址一起，被整体列入全国重点文物保护单位。"
        ],
        source: "南师大随园校区官网 / Sohu 随园建筑"
      }
    },
    {
      id: "dorm40",
      name: "400-700 号楼（学生宿舍群）",
      year: "1923",
      yearRange: "1923-1924",
      era: "金女大时期",
      category: "建筑",
      short: "金女大时期 4 栋老宿舍，曾是 999 朵玫瑰的住处。",
      lead: "金女大时期陆续建成的 4 栋老宿舍，是当时女学生的住处。",
      tags: ["1923-1924", "宿舍", "学院"],
      hero: "dorm40.png",
      summary: [
        "1923 至 1924 年陆续建成，每栋约 1151 平米，每幢住 50 人、每间房 2 人。",
        "4 栋宿舍分别有雅称：400 号「听秋室」、500 号「延月室」、600 号「迎薰室」、700 号「读雪室」。",
        "四栋均东西向，据说设计者认为这种取向，能使学生房间总能晒到太阳。400 号现为数学与计算机科学学院，500 号是外国语学院，其余为办公区。"
      ],
      article: {
        paragraphs: [
          "400-700 号楼是金女大时期陆续建成的学生宿舍群，1923 年（400、500、600 号）至 1924 年（700 号）陆续建成。",
          "四栋宿舍分别有雅称：400 号「听秋室」、500 号「延月室」、600 号「迎薰室」、700 号「读雪室」，合在一起，是金女大对女学生最诗意的安置。",
          "它们和 100、200、300 号楼同属金女大早期宫殿式建筑群，但功能完全不同——是当时女学生的住处。四栋均东西向，据金女大校友回忆，设计者认为这种取向，能使学生房间总能晒到太阳。",
          "今天，400 号楼是数学与计算机科学学院所在地，500 号楼是外国语学院所在地，600、700 号则作为各类办公区使用。从外面看，飞檐和雕花屋顶仍与中大楼一脉相承，2024 年随园校区 120 周年校庆前完成整体粉刷。",
          "金女大时期，理科学生住 400 号、600 号，文科学生住 500 号和 700 号，每栋宿舍能容纳 100 名学生，还有生活辅导员教师住房。每栋宿舍有一约 50 平方米的休息室，内有期刊、坐椅，供学生饭前休息交流，也可开茶话会。"
        ],
        source: "南师大随园校区官网 / 吴贻芳纪念馆 / Sohu 随园芳华"
      }
    }
  ];

  const $ = (id) => document.getElementById(id);

  function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || "l100";
  }

  function getBuilding(id) {
    return BUILDINGS.find((b) => b.id === id) || BUILDINGS[0];
  }

  function renderHero(building) {
    document.title = building.name + " · 关于随园";
    $("buildingEyebrow").innerHTML = "<span>" + building.era + " · " + building.yearRange + "</span><span>" + building.category + "</span>";
    $("buildingTitle").textContent = building.name;
    $("buildingLead").textContent = building.lead;

    var metaHtml = "";
    metaHtml += '<div class="buildingMetaChip"><span class="buildingMetaChip__label">建成</span><span class="buildingMetaChip__value">' + building.yearRange + '</span></div>';
    metaHtml += '<div class="buildingMetaChip"><span class="buildingMetaChip__label">时期</span><span class="buildingMetaChip__value">' + building.era + '</span></div>';
    for (var i = 0; i < building.tags.length; i++) {
      metaHtml += '<span class="buildingTag">' + building.tags[i] + '</span>';
    }
    $("buildingMeta").innerHTML = metaHtml;

    $("buildingHeroMedia").innerHTML = '<img src="' + PHOTOS + building.hero + '" alt="' + building.name + '" loading="eager" /><div class="buildingHeroMedia__corner"><span>' + building.yearRange + '</span></div>';
  }

  function renderSummary(building) {
    var body = "";
    for (var i = 0; i < building.summary.length; i++) {
      body += "<p>" + building.summary[i] + "</p>";
    }
    $("buildingSummary").innerHTML = '<div class="section__eyebrow">Summary</div><h2 class="section__title">' + building.short + '</h2><div class="section__body">' + body + '</div>';
  }

  function renderGallery(building) {
    var gallery = $("buildingGallery");
    if (!building.photos || building.photos.length === 0) {
      gallery.closest("section").style.display = "none";
      return;
    }

    var html = "";
    for (var i = 0; i < building.photos.length; i++) {
      var photo = building.photos[i];
      var feature = i === 0 ? " is-feature" : "";
      html += '<figure class="buildingGallery__item' + feature + '"><img src="' + PHOTOS + photo.src + '" alt="' + (photo.caption || building.name) + '" loading="lazy" />';
      if (photo.caption) {
        html += '<figcaption>' + photo.caption + '</figcaption>';
      }
      html += '</figure>';
    }
    gallery.innerHTML = html;

    var imgs = gallery.querySelectorAll("img");
    for (var j = 0; j < imgs.length; j++) {
      (function (img) {
        img.addEventListener("click", function () { openLightbox(img.src, img.alt); });
      })(imgs[j]);
    }
  }

  function openLightbox(src, alt) {
    var box = document.createElement("div");
    box.className = "buildingLightbox";
    box.innerHTML = '<img src="' + src + '" alt="' + alt + '" /><button class="buildingLightbox__close" type="button">×</button>';
    document.body.appendChild(box);
    document.body.style.overflow = "hidden";

    var close = function () {
      document.body.removeChild(box);
      document.body.style.overflow = "";
    };
    box.addEventListener("click", close);
    box.querySelector(".buildingLightbox__close").addEventListener("click", close);
  }

  function renderArticle(building) {
    var a = building.article;
    if (!a) {
      $("buildingArticle").style.display = "none";
      return;
    }
    var paras = "";
    for (var i = 0; i < a.paragraphs.length; i++) {
      paras += "<p>" + a.paragraphs[i] + "</p>";
    }
    var sourceLink = a.sourceUrl ? '<a href="' + a.sourceUrl + '" target="_blank" rel="noopener">查看原文 →</a>' : "";
    $("buildingArticle").innerHTML = '<div class="section__eyebrow">Story</div><h2 class="section__title">关于这栋楼，更多一点</h2><div class="section__body">' + paras + '</div><div class="buildingSource"><span>资料来源</span><strong>' + a.source + '</strong>' + sourceLink + '</div>';
  }

  function renderNav(building) {
    var idx = -1;
    for (var i = 0; i < BUILDINGS.length; i++) {
      if (BUILDINGS[i].id === building.id) { idx = i; break; }
    }
    var prev = BUILDINGS[(idx - 1 + BUILDINGS.length) % BUILDINGS.length];
    var next = BUILDINGS[(idx + 1) % BUILDINGS.length];

    $("buildingNav").innerHTML = '<a class="buildingNav__btn" href="./building.html?id=' + prev.id + '"><span class="buildingNav__label">上一栋</span><span class="buildingNav__title">' + prev.name + '</span></a><a class="buildingNav__btn buildingNav__btn--right" href="./building.html?id=' + next.id + '"><span class="buildingNav__label">下一栋</span><span class="buildingNav__title">' + next.name + '</span></a>';
  }

  var id = getId();
  var building = getBuilding(id);
  renderHero(building);
  renderSummary(building);
  renderGallery(building);
  renderArticle(building);
  renderNav(building);
})();
