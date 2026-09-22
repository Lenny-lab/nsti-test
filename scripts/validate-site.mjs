import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const pass = (message) => console.log(`✓ ${message}`);
const fail = (message) => failures.push(message);

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const context = vm.createContext({});
vm.runInContext(read("app/question-bank.js"), context, { filename: "app/question-bank.js" });
const questions = vm.runInContext("QUESTIONS", context);
const types = vm.runInContext("TYPE_LIBRARY", context);

if (questions.length === 28) pass("题库共 28 题");
else fail(`题库应为 28 题，实际为 ${questions.length} 题`);

const expectedAxes = {
  E_I: ["E", "I"],
  S_N: ["S", "N"],
  T_F: ["T", "F"],
  J_P: ["J", "P"],
};

for (const [axis, poles] of Object.entries(expectedAxes)) {
  const axisQuestions = questions.filter((question) => question.axis === axis);
  if (axisQuestions.length === 7) pass(`${axis} 轴为 7 题`);
  else fail(`${axis} 轴应为 7 题，实际为 ${axisQuestions.length} 题`);

  for (const question of axisQuestions) {
    if (question.options.length !== 4) fail(`${question.id} 应有 4 个选项`);
    for (const pole of poles) {
      const count = question.options.filter((option) => option.pole === pole).length;
      if (count !== 2) fail(`${question.id} 的 ${pole} 选项应为 2 个，实际为 ${count} 个`);
    }
    if (question.options.some((option) => option.weight !== 1)) fail(`${question.id} 存在非等权选项`);
  }
}

const expectedTypes = [];
for (const energy of ["E", "I"])
  for (const view of ["S", "N"])
    for (const decision of ["T", "F"])
      for (const rhythm of ["J", "P"]) expectedTypes.push(`${energy}${view}${decision}${rhythm}`);

const definedTypes = Object.keys(types).sort();
if (definedTypes.join(",") === expectedTypes.sort().join(",")) pass("16 种类型均有定义");
else fail(`类型定义不完整：${definedTypes.join(", ")}`);

for (const type of expectedTypes) {
  for (const [axis, poles] of Object.entries(expectedAxes)) {
    const desiredPole = type.includes(poles[0]) ? poles[0] : poles[1];
    const scores = { [poles[0]]: 0, [poles[1]]: 0 };
    for (const question of questions.filter((item) => item.axis === axis)) {
      const option = question.options.find((item) => item.pole === desiredPole);
      scores[option.pole] += option.weight;
    }
    if (scores[poles[0]] === scores[poles[1]]) fail(`${type} 在 ${axis} 轴出现平局`);
    const winner = scores[poles[0]] > scores[poles[1]] ? poles[0] : poles[1];
    if (winner !== desiredPole) fail(`${type} 在 ${axis} 轴不可达`);
  }
}
if (!failures.some((item) => item.includes("不可达") || item.includes("平局"))) pass("16 种类型均可达且各轴无平局");

const htmlFiles = ["index.html", ...fs.readdirSync(path.join(root, "app")).filter((name) => name.endsWith(".html")).map((name) => `app/${name}`)];
for (const htmlFile of htmlFiles) {
  const html = read(htmlFile);
  const directory = path.dirname(path.join(root, htmlFile));
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|#|\/\/)/.test(reference) || reference.startsWith("/_vercel/")) continue;
    const cleanReference = reference.split(/[?#]/)[0];
    const target = path.resolve(directory, cleanReference);
    if (!fs.existsSync(target)) fail(`${htmlFile} 引用缺失资源：${reference}`);
  }
}
if (!failures.some((item) => item.includes("引用缺失资源"))) pass("HTML 本地链接与资源路径有效");

for (const imageName of ["l100", "l200", "l300", "music", "hua", "zhongda", "yishe", "south", "dorm40"]) {
  const imagePath = path.join(root, "app", "buildings", "photos", `${imageName}.webp`);
  if (!fs.existsSync(imagePath) || fs.statSync(imagePath).size < 10_000) fail(`原创插画缺失或异常：${imageName}.webp`);
}
if (!failures.some((item) => item.includes("原创插画"))) pass("9 幅原创建筑插画均存在");

const suiyuanHtml = read("app/suiyuan.html");
const suiyuanJs = read("app/suiyuan.js");
const buildingJs = read("app/building.js");
if (
  suiyuanHtml.includes("图像来源说明") &&
  suiyuanHtml.includes("OpenAI 内置图像生成工具") &&
  suiyuanJs.includes("AI 辅助生成插画") &&
  buildingJs.includes("AI 辅助生成插画 · 非实景照片") &&
  buildingJs.includes("图像来源：")
) pass("导览和建筑详情均明确标注 AI 插画来源及非照片属性");
else fail("AI 插画来源标注不完整");

const clientFiles = ["index.html", ...fs.readdirSync(path.join(root, "app")).filter((name) => /\.(?:html|js)$/.test(name)).map((name) => `app/${name}`)];
const forbidden = [
  [/0725/, "生日密码"],
  [/next-page/i, "个人寄语入口"],
  [/24\s*题/, "旧题量"],
  [/SUIYUAN_AMAP_KEY/, "旧地图密钥变量"],
  [/restapi\.amap\.com/i, "客户端天气 Web API"],
];
for (const clientFile of clientFiles) {
  const content = read(clientFile);
  for (const [pattern, label] of forbidden) {
    if (pattern.test(content)) fail(`${clientFile} 仍包含${label}`);
  }
}
if (!failures.some((item) => clientFiles.some((file) => item.startsWith(file)))) pass("旧入口、旧题量与客户端天气密钥痕迹已移除");

const weatherApi = read("api/suiyuan-weather.js");
if (/process\.env\.AMAP_WEATHER_KEY/.test(weatherApi) && !/["'][0-9a-f]{20,}["']/i.test(weatherApi)) pass("天气接口仅从 AMAP_WEATHER_KEY 读取凭据");
else fail("天气接口环境变量或硬编码密钥检查失败");

if (failures.length) {
  console.error("\n验证失败：");
  for (const message of failures) console.error(`✗ ${message}`);
  process.exitCode = 1;
} else {
  console.log("\n全部自动检查通过。");
}
