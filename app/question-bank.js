const TYPE_LIBRARY = {
  "ISTJ": {
    title: "敬文的灯火",
    landmark: "敬文图书馆自修室",
    traits: "秩序、坚毅、高度专注"
  },
  "ISFJ": {
    title: "随园的红墙",
    landmark: "随园 100 号楼",
    traits: "温婉、可靠、情感守护"
  },
  "INFJ": {
    title: "德风园的思索",
    landmark: "德风园孔子像",
    traits: "深邃、理想、精神领袖"
  },
  "INTJ": {
    title: "逐日塔的俯瞰",
    landmark: "逐日塔塔尖",
    traits: "独立、战略、逻辑之巅"
  },
  "ISTP": {
    title: "校车的轨迹",
    landmark: "小白与大黄校车",
    traits: "务实、冷静、精准行动"
  },
  "ISFP": {
    title: "月亮湾的晚风",
    landmark: "月亮湾湖畔",
    traits: "浪漫、随性、感官审美"
  },
  "INFP": {
    title: "校园的小猫咪",
    landmark: "校园小角落",
    traits: "治愈、梦想、纯净内心"
  },
  "INTP": {
    title: "实验室的脉冲",
    landmark: "学海楼物理实验室",
    traits: "钻研、纯粹、逻辑建构"
  },
  "ESTP": {
    title: "学则路的烟火气",
    landmark: "学则路夜市",
    traits: "热血、真实、社交中心"
  },
  "ESFP": {
    title: "起步价的 2 号线",
    landmark: "仙林中心站",
    traits: "活力、当下、快乐喷泉"
  },
  "ENFP": {
    title: "起霞坡的落日",
    landmark: "起霞坡坡顶",
    traits: "灵感、自由、无限可能"
  },
  "ENTP": {
    title: "敬文广场的辩论",
    landmark: "敬文广场中心",
    traits: "机智、挑战、思维破局"
  },
  "ESTJ": {
    title: "南门的石狮",
    landmark: "南大门入口",
    traits: "原则、管理、稳重基石"
  },
  "ESFJ": {
    title: "西区的沏茗城",
    landmark: "西区沏茗城",
    traits: "热情、体贴、社交链接"
  },
  "ENFJ": {
    title: "图书馆的小图钉",
    landmark: "敬文图书馆服务台",
    traits: "奉献、感召、温暖引路"
  },
  "ENTJ": {
    title: "正德的丰碑",
    landmark: "正德厚生碑",
    traits: "统筹、远见、卓越领导"
  },
};

const QUESTIONS = [
  {
    id: "Q01",
    axis: "E_I",
    text: "周末傍晚，如果你在月亮湾看到有人在举办草坪音乐会，你会：",
    options: [
      { label: "A", text: "兴致勃勃地加入外围人群，甚至想跟着旋律轻轻打拍子", pole: "E", weight: 1 },
      { label: "B", text: "远远看一眼，觉得画面很美，但还是按照原计划去往更安静的地方", pole: "I", weight: 1 },
      { label: "C", text: "拿出手机记录这瞬间，发给好友感慨一下校园的青春氛围", pole: "E", weight: 1 },
      { label: "D", text: "这种热闹属于别人，我只想快点回宿舍", pole: "I", weight: 1 },
    ]
  },
  {
    id: "Q02",
    axis: "E_I",
    text: "在“百团大战”社团招新现场，你的常态通常是：",
    options: [
      { label: "A", text: "哪里热闹去哪里，每个感兴趣的摊位都想聊两句", pole: "E", weight: 1 },
      { label: "B", text: "提前看好路线，直奔心仪的目标，领完传单就走", pole: "I", weight: 1 },
      { label: "C", text: "被那种热火朝天的氛围感染，即使不加社团也觉得心情愉悦", pole: "E", weight: 1 },
      { label: "D", text: "尽量绕开人群密集区，觉得那种高分贝环境有点消耗精力", pole: "I", weight: 1 },
    ]
  },
  {
    id: "Q03",
    axis: "E_I",
    text: "关于去学则路夜市吃宵夜，你更喜欢：",
    options: [
      { label: "A", text: "宿舍全体出动，大家在摊位前热热闹闹地讨论吃什么", pole: "E", weight: 1 },
      { label: "B", text: "只约上一两个最好的朋友，边走边聊一些深层次的话题", pole: "I", weight: 1 },
      { label: "C", text: "自己一个人去，享受那种在人海中寻找美食的“孤独感”", pole: "I", weight: 1 },
      { label: "D", text: "如果可以，宁愿让室友帮带回来，在寝室里安稳地享受", pole: "I", weight: 1 },
    ]
  },
  {
    id: "Q04",
    axis: "E_I",
    text: "当你行走在随园校区幽静的回廊间，你最享受：",
    options: [
      { label: "A", text: "偶尔遇到熟悉的同学打个招呼，交流一下近况", pole: "E", weight: 1 },
      { label: "B", text: "这种与世隔绝的清静，能让自己大脑彻底放空", pole: "I", weight: 1 },
      { label: "C", text: "思考这里的建筑布局和历史细节，并沉浸其中", pole: "I", weight: 1 },
      { label: "D", text: "快速走过，思考待会儿要去办的具体事务", pole: "I", weight: 1 },
    ]
  },
  {
    id: "Q05",
    axis: "E_I",
    text: "在敬文广场等人时，如果有陌生同学向你寻求指路帮助：",
    options: [
      { label: "A", text: "不仅详细指路，甚至愿意走一段路带 TA 过去", pole: "E", weight: 1 },
      { label: "B", text: "礼貌清晰地指明方向，确定对方听懂后便重新回到自己的状态", pole: "I", weight: 1 },
      { label: "C", text: "有点局促，指个大概方向后赶紧结束这段临时的社交", pole: "I", weight: 1 },
      { label: "D", text: "拿出手机帮对方查地图，用最精准的方式解决 TA 的问题", pole: "I", weight: 1 },
    ]
  },
  {
    id: "Q06",
    axis: "E_I",
    text: "关于校园生活的“吐槽”或心得，你更倾向于：",
    options: [
      { label: "A", text: "在朋友圈或者小红书公开分享，和校友们互动", pole: "E", weight: 1 },
      { label: "B", text: "只在自己的小群或私密日记里表达最真实的感受", pole: "I", weight: 1 },
      { label: "C", text: "默默点赞别人的动态，觉得自己被“嘴替”了就好", pole: "I", weight: 1 },
      { label: "D", text: "完全不参与，觉得生活是自己的，没必要向外界展示", pole: "I", weight: 1 },
    ]
  },
  {
    id: "Q07",
    axis: "S_N",
    text: "站在逐日塔下仰望，你最先产生的是：",
    options: [
      { label: "A", text: "这个塔的物理结构挺有意思，想知道它的具体建造高度", pole: "S", weight: 1 },
      { label: "B", text: "一种宏大的意境，觉得它像是一个注视着南师变迁的智者", pole: "N", weight: 1 },
      { label: "C", text: "它的光影非常适合拍一组艺术照", pole: "S", weight: 1 },
      { label: "D", text: "这种地标对校园导航系统的重要性", pole: "N", weight: 1 },
    ]
  },
  {
    id: "Q08",
    axis: "S_N",
    text: "当你描述随园 100 号楼时，你更容易关注：",
    options: [
      { label: "A", text: "它具体的红墙纹理、窗框的比例和修缮的细节", pole: "S", weight: 1 },
      { label: "B", text: "它散发出的那种优雅、厚重的人文精神气质", pole: "N", weight: 1 },
      { label: "C", text: "在百年前这里曾经发生过的多少故事", pole: "N", weight: 1 },
      { label: "D", text: "它目前作为功能性空间的使用效率", pole: "S", weight: 1 },
    ]
  },
  {
    id: "Q09",
    axis: "S_N",
    text: "当你恰好经过起霞坡的时候，你的第一反应是：",
    options: [
      { label: "A", text: "“又是这个坡！”：在无形中产生出对校园地形最直观、最深刻的实感", pole: "S", weight: 1 },
      { label: "B", text: "沉浸电影感：感叹这里是全南师最适合与好友共赏落日、野餐晒太阳的圣地，自动匹配 BGM", pole: "N", weight: 1 },
      { label: "C", text: "寻觅“校宠”：眼神自动锁定大傻鹅的出没地，试图开启一场充满童趣的校园偶遇", pole: "N", weight: 1 },
      { label: "D", text: "释放本能：被柔软斜坡激发出瞬间的“出格”念头，想干脆躺下体验 321 滚动下坡的纯粹快乐", pole: "S", weight: 1 },
    ]
  },
  {
    id: "Q10",
    axis: "S_N",
    text: "在德风园背书或休息时，你会注意到：",
    options: [
      { label: "A", text: "每一个石凳的分布位置，以及最适合避风的角落", pole: "S", weight: 1 },
      { label: "B", text: "那种肃穆的学术氛围，以及历代先贤留下的精神压力", pole: "N", weight: 1 },
      { label: "C", text: "阳光透过树叶洒在孔子像上的光影变化", pole: "S", weight: 1 },
      { label: "D", text: "这里非常适合开展小组头脑风暴，是个绝佳的思维碰撞场", pole: "N", weight: 1 },
    ]
  },
  {
    id: "Q11",
    axis: "S_N",
    text: "如果校园里突然换了一批新的文创标识，你会：",
    options: [
      { label: "A", text: "仔细看上面的每一个图标和文字是否严谨、有无错别字", pole: "S", weight: 1 },
      { label: "B", text: "感知它的整体风格是否符合南师大的文化内涵", pole: "N", weight: 1 },
      { label: "C", text: "觉得它让校园变得更有新鲜感和趣味性了", pole: "N", weight: 1 },
      { label: "D", text: "思考这种设计变更是否提升了校园生活的便利程度", pole: "S", weight: 1 },
    ]
  },
  {
    id: "Q12",
    axis: "S_N",
    text: "关于南师大的小猫咪，你的看法是：",
    options: [
      { label: "A", text: "它们是校园生活的重要组成部分，是校园的点缀", pole: "S", weight: 1 },
      { label: "B", text: "它们代表了一种校园里的温情，是学生情感的寄托", pole: "N", weight: 1 },
      { label: "C", text: "应该有一种更科学的数据化管理方式来维持它们数量的平衡", pole: "N", weight: 1 },
      { label: "D", text: "只是校园生活里的随机风景，看一眼觉得可爱就行", pole: "S", weight: 1 },
    ]
  },
  {
    id: "Q13",
    axis: "T_F",
    text: "在小组协作完成一个跨学科课题时，如果进度受阻，你会：",
    options: [
      { label: "A", text: "拿出一份逻辑严密的 DDL 清单，按职责逐条排查问题所在", pole: "T", weight: 1 },
      { label: "B", text: "先找个地方大家一起喝杯沏茗城奶茶，在轻松的氛围中解开心结", pole: "F", weight: 1 },
      { label: "C", text: "提议大家重新构思，寻找一个更有趣、更跳跃的新切入点", pole: "F", weight: 1 },
      { label: "D", text: "默默接手最难的部分，用自己的专业能力把进度硬生生拉回来", pole: "T", weight: 1 },
    ]
  },
  {
    id: "Q14",
    axis: "T_F",
    text: "当你发现自己预约的图书馆座位被别人占了，你会：",
    options: [
      { label: "A", text: "礼貌但坚定地出示预约记录，按规则收回座位", pole: "T", weight: 1 },
      { label: "B", text: "觉得没关系，只要旁边还有空位，不想因为这点小事产生冲突", pole: "F", weight: 1 },
      { label: "C", text: "观察对方是否在忙，如果对方也很辛苦，就默默重新找位子", pole: "F", weight: 1 },
      { label: "D", text: "思考为什么预约系统会出现这种冲突", pole: "T", weight: 1 },
    ]
  },
  {
    id: "Q15",
    axis: "T_F",
    text: "如果你的好友在参加校园比赛中失败了，你倾向于：",
    options: [
      { label: "A", text: "帮 TA 仔细分析失败的技术原因，并寻找下次改进的方法", pole: "T", weight: 1 },
      { label: "B", text: "什么也不多说，陪 TA 去月亮湾吹吹风，静静听 TA 倾诉", pole: "F", weight: 1 },
      { label: "C", text: "告诉 TA 这种经历比结果更重要，这只是人生的一段插曲", pole: "F", weight: 1 },
      { label: "D", text: "带 TA 去东城汇吃最爱吃最好吃的炸串，用实际行动转移 TA 的注意力", pole: "T", weight: 1 },
    ]
  },
  {
    id: "Q16",
    axis: "T_F",
    text: "在处理繁琐的学分核对任务时，你最在意的是：",
    options: [
      { label: "A", text: "每一个数字和课程名称都必须精准无误，不能有任何纰漏", pole: "T", weight: 1 },
      { label: "B", text: "这个过程是否体现了对每位同学努力程度的公平对待", pole: "F", weight: 1 },
      { label: "C", text: "是否能找到一种更高效的算法或工具来自动化解决它", pole: "T", weight: 1 },
      { label: "D", text: "尽快搞定它，好让自己从这种枯燥的事务中解脱出来", pole: "T", weight: 1 },
    ]
  },
  {
    id: "Q17",
    axis: "T_F",
    text: "赶早八却遭遇 7MA 刹车随缘、电量虚标甚至 GPS 定位偏移还不上车，面对这种“战损级”骑行体验，你会：",
    options: [
      { label: "A", text: "记录故障并联系客服申诉调度费，理性分析其晚间调度与系统逻辑的漏洞", pole: "T", weight: 1 },
      { label: "B", text: "在寝室群同步“避雷”信息，感叹雨天抢车上课的生活不易，通过共鸣缓解焦虑", pole: "F", weight: 1 },
      { label: "C", text: "不管是下雨天还是大晴天，无论多远的距离我都会用双脚去丈量，以此表达对 7MA 的彻底死心，再见 7MA", pole: "T", weight: 1 },
      { label: "D", text: "哪怕再急也会把坏车的车头撇向一侧以示提醒，默默寻找下一辆更靠谱的代步工具", pole: "F", weight: 1 },
    ]
  },
  {
    id: "Q18",
    axis: "T_F",
    text: "当你在实验室或自习室遇到一个难以攻克的难题时：",
    options: [
      { label: "A", text: "查阅海量资料，运用严密的逻辑推理，不解决不罢休", pole: "T", weight: 1 },
      { label: "B", text: "找同学交流，看看别人的思路是否能给自己一点情感支持和启发", pole: "F", weight: 1 },
      { label: "C", text: "先去操场跑两圈，在运动中寻找那种突然闪现的灵感", pole: "F", weight: 1 },
      { label: "D", text: "将问题拆解成几个小步，一个一个稳扎稳打地克服", pole: "T", weight: 1 },
    ]
  },
  {
    id: "Q19",
    axis: "J_P",
    text: "乘坐小白或大黄校车的时候，你的等车状态是：",
    options: [
      { label: "A", text: "必须查好时刻表，提前两分钟站在站台，拒绝任何不确定", pole: "J", weight: 1 },
      { label: "B", text: "随缘，走到站台看到有车就上，没车就当漫步校园", pole: "P", weight: 1 },
      { label: "C", text: "如果没赶上，会短暂地懊恼一下计划被打乱，但很快调整", pole: "P", weight: 1 },
      { label: "D", text: "宁愿自己骑车，把通勤的节奏牢牢掌握在自己手中", pole: "J", weight: 1 },
    ]
  },
  {
    id: "Q20",
    axis: "J_P",
    text: "你的期末复习周桌面通常长什么样？",
    options: [
      { label: "A", text: "所有的参考书、笔记本和笔都按高度和使用频率整齐排列", pole: "J", weight: 1 },
      { label: "B", text: "充满了生活气息，书本、水杯、零食分布得乱中有序", pole: "P", weight: 1 },
      { label: "C", text: "极其简单，除了正在看的这一本书，其他全部收进柜子", pole: "J", weight: 1 },
      { label: "D", text: "随着复习的深入，桌面会逐渐变成一种“动态的混乱”", pole: "P", weight: 1 },
    ]
  },
  {
    id: "Q21",
    axis: "J_P",
    text: "准备一场由你发起的宿舍/社团小团建，你会：",
    options: [
      { label: "A", text: "制定详细的攻略，包括时间、路线、人均预算和备选方案", pole: "J", weight: 1 },
      { label: "B", text: "定好目的地，具体的玩法和吃的店大家到时候看心情决定", pole: "P", weight: 1 },
      { label: "C", text: "只要大家能聚在一起开心就好，细节可以随时调整", pole: "P", weight: 1 },
      { label: "D", text: "确定好核心任务，其余的交给更有兴趣的伙伴去安排", pole: "J", weight: 1 },
    ]
  },
  {
    id: "Q22",
    axis: "J_P",
    text: "住在西区却被告知快递投递到了东区驿站，面对这段“遥远”的取件路，你会：",
    options: [
      { label: "A", text: "缜密规划动线：将其与东区的课程或约饭行程合并执行，拒绝任何低效且无意义的往返", pole: "J", weight: 1 },
      { label: "B", text: "佛系多件合并：只要不是急用的物件，就让它在驿站先“吃灰”，直到哪天碰巧路过再顺手带回", pole: "P", weight: 1 },
      { label: "C", text: "强迫症式即刻清空：无法忍受待办事项堆积，即便横跨半个仙林也要在当天取走，换取心理上的绝对爽利", pole: "J", weight: 1 },
      { label: "D", text: "浪漫主义远征：把它当成一场听歌吹风的校园旅行，顺便在东区面包店买份甜品，把枯燥任务变成生活犒赏", pole: "P", weight: 1 },
    ]
  },
  {
    id: "Q23",
    axis: "J_P",
    text: "关于乐跑打卡，你的想法是：",
    options: [
      { label: "A", text: "制定周密的计划，每周固定跑三次，风雨无阻地完成任务", pole: "J", weight: 1 },
      { label: "B", text: "只要天气好心情好就去跑跑，顺便在操场看日落", pole: "P", weight: 1 },
      { label: "C", text: "前期疯狂拖延，最后两周在操场上演“生死时速”补卡", pole: "P", weight: 1 },
      { label: "D", text: "找一切可以利用的机会，比如去教学楼的路上顺便打个卡", pole: "P", weight: 1 },
    ]
  },
  {
    id: "Q24",
    axis: "J_P",
    text: "如果要在随园拍一张完美的银杏合照，你会：",
    options: [
      { label: "A", text: "查好最佳光照时间，预设好所有构图和后期风格", pole: "J", weight: 1 },
      { label: "B", text: "穿上喜欢的衣服，看到哪片叶子美就站在哪里拍", pole: "P", weight: 1 },
      { label: "C", text: "拍下很多张，回去再慢慢挑选自己最心动的那一张", pole: "P", weight: 1 },
      { label: "D", text: "觉得照片只是记录，当下的那种金色氛围才是最重要的", pole: "P", weight: 1 },
    ]
  },
];
