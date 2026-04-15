(() => {
  const container = document.getElementById("typeGallery");
  if (!container || typeof TYPE_LIBRARY === "undefined") return;

  const poleLabels = {
    E: "场域取能",
    I: "静域回充",
    S: "实感锚定",
    N: "意象联想",
    T: "逻辑定标",
    F: "共感定标",
    J: "定序推进",
    P: "流动应变",
  };

  const introText = (entry) => `这类画像更接近 ${entry.traits} 的做事气质，在校园里会留下比较鲜明的生活节奏和协作风格`;

  const chipsFor = (code) =>
    code
      .split("")
      .map((letter) => `<span class="typeChip">${poleLabels[letter]}</span>`)
      .join("");

  container.innerHTML = Object.entries(TYPE_LIBRARY)
    .map(
      ([code, entry]) => `
        <article class="card typeCard">
          <div class="typeCard__top">
            <div>
              <div class="section__eyebrow">校园结果卡</div>
              <h2 class="typeCard__title">${entry.title}</h2>
            </div>
            <div class="typeCard__code">${code}</div>
          </div>
          <div class="typeCard__meta">校园锚点：${entry.landmark}</div>
          <div class="typeCard__body">${introText(entry)}</div>
          <div class="typeChipWrap">
            <span class="typeChip">关键词：${entry.traits}</span>
            ${chipsFor(code)}
          </div>
        </article>
      `,
    )
    .join("");
})();
