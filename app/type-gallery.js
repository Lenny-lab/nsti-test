(() => {
  const container = document.getElementById("typeGallery");
  if (!container || typeof TYPE_LIBRARY === "undefined") return;

  const introText = (entry) => entry.galleryCopy || `这类画像更接近 ${entry.traits} 的做事气质`;

  container.innerHTML = Object.values(TYPE_LIBRARY)
    .map(
      (entry) => `
        <article class="card typeCard">
          <div class="typeCard__top">
            <div>
              <div class="section__eyebrow">校园结果卡</div>
              <h2 class="typeCard__title">${entry.title}</h2>
            </div>
          </div>
          <div class="typeCard__body">${introText(entry)}</div>
          <div class="typeChipWrap">
            <span class="typeChip">校园地标 · ${entry.landmark}</span>
            <span class="typeChip">生活场景 · ${entry.scene || "南师日常"}</span>
          </div>
        </article>
      `,
    )
    .join("");
})();
