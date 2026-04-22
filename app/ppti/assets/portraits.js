(function attachPortraitHelpers() {
  const generated = window.PPTI_GENERATED_PORTRAITS || {};

  const SPECIES_STYLES = {
    pig: { face: "#f8a8c2", inner: "#f7d2de", accent: "#ef6f9c", kind: "pig" },
    rabbit: { face: "#f7f1f3", inner: "#ffd9e8", accent: "#ff8eb6", kind: "rabbit" },
    dog: { face: "#c58c6a", inner: "#f1d7c9", accent: "#ef8b52", kind: "dog" },
    cat: { face: "#f5c0be", inner: "#ffe5db", accent: "#ff9b86", kind: "cat" },
    elephant: { face: "#b8c7de", inner: "#d9e3f2", accent: "#6f8db6", kind: "elephant" },
    giraffe: { face: "#f5d07d", inner: "#f8ebbb", accent: "#d39228", kind: "giraffe" },
    sheep: { face: "#ffffff", inner: "#f4f4f4", accent: "#8f9cb2", kind: "sheep" },
    goat: { face: "#fffaf2", inner: "#f4ead4", accent: "#aa8d58", kind: "goat" },
    fox: { face: "#f8a05b", inner: "#fff0e1", accent: "#df6f1b", kind: "fox" },
    zebra: { face: "#f8f8fa", inner: "#ffffff", accent: "#1d2433", kind: "zebra" },
    bear: { face: "#b58b67", inner: "#e5c5a8", accent: "#7f5637", kind: "bear" },
    mouse: { face: "#c5bccd", inner: "#ece7f1", accent: "#8f83a0", kind: "mouse" },
    panda: { face: "#f7f7f7", inner: "#ffffff", accent: "#20252f", kind: "panda" },
    human: { face: "#f2c39d", inner: "#ffe5cb", accent: "#885d46", kind: "human" },
    generic: { face: "#f2d7cb", inner: "#fff3ed", accent: "#c7806b", kind: "generic" },
  };

  const TRAIT_PALETTES = {
    energetic: ["#ffb86d", "#ff7cae"],
    playful: ["#ffd56b", "#ff98c1"],
    curious: ["#9fd7ff", "#7ab4ff"],
    caring: ["#ffb9cf", "#ff89b5"],
    friendly: ["#ffc38d", "#ffa86d"],
    brave: ["#ff987f", "#ff5c82"],
    calm: ["#b6d6ff", "#7ea6df"],
    smart: ["#8fc4ff", "#7d94ff"],
    creative: ["#c8b3ff", "#ff9bd3"],
    funny: ["#ffd56b", "#ff8a7c"],
    loud: ["#ff8d78", "#ff6585"],
    stubborn: ["#d4b1ff", "#a77eff"],
    responsible: ["#b5d7b0", "#7fb37a"],
  };

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function hash(value) {
    let output = 0;
    const text = String(value || "");
    for (let index = 0; index < text.length; index += 1) {
      output = (output * 31 + text.charCodeAt(index)) >>> 0;
    }
    return output;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function displayName(item) {
    return item?.name_zh || item?.name || "Character";
  }

  function displaySpecies(item) {
    return item?.species_zh || item?.species || "Character";
  }

  function inferSpeciesKey(item) {
    const raw = `${item?.species || ""} ${item?.species_zh || ""} ${item?.name || ""}`.toLowerCase();
    if (raw.includes("pig") || raw.includes("猪")) return "pig";
    if (raw.includes("rabbit") || raw.includes("兔")) return "rabbit";
    if (raw.includes("dog") || raw.includes("狗")) return "dog";
    if (raw.includes("cat") || raw.includes("猫")) return "cat";
    if (raw.includes("elephant") || raw.includes("象")) return "elephant";
    if (raw.includes("giraffe") || raw.includes("长颈鹿")) return "giraffe";
    if (raw.includes("sheep") || raw.includes("羊")) return "sheep";
    if (raw.includes("goat") || raw.includes("山羊")) return "goat";
    if (raw.includes("fox") || raw.includes("狐")) return "fox";
    if (raw.includes("zebra") || raw.includes("斑马")) return "zebra";
    if (raw.includes("bear") || raw.includes("熊")) return "bear";
    if (raw.includes("mouse") || raw.includes("鼠")) return "mouse";
    if (raw.includes("panda") || raw.includes("熊猫")) return "panda";
    if (raw.includes("human") || raw.includes("人")) return "human";
    return "generic";
  }

  function pickPalette(item) {
    const traits = []
      .concat(Array.isArray(item?.combined_traits) ? item.combined_traits : [])
      .concat(Array.isArray(item?.traits) ? item.traits : []);
    const match = traits.find((trait) => TRAIT_PALETTES[trait]);
    const pair = TRAIT_PALETTES[match] || ["#ffbdd3", "#ffd56b"];
    return {
      from: pair[0],
      to: pair[1],
      shadow: pair[1],
    };
  }

  function buildEars(kind, style) {
    switch (kind) {
      case "pig":
        return `
          <path d="M110 120 L138 84 L156 132 Z" fill="${style.face}" />
          <path d="M290 120 L262 84 L244 132 Z" fill="${style.face}" />
          <path d="M121 117 L138 96 L148 124 Z" fill="${style.inner}" />
          <path d="M279 117 L262 96 L252 124 Z" fill="${style.inner}" />
        `;
      case "rabbit":
        return `
          <rect x="126" y="36" width="26" height="108" rx="14" fill="${style.face}" />
          <rect x="248" y="36" width="26" height="108" rx="14" fill="${style.face}" />
          <rect x="132" y="52" width="14" height="78" rx="10" fill="${style.inner}" />
          <rect x="254" y="52" width="14" height="78" rx="10" fill="${style.inner}" />
        `;
      case "dog":
        return `
          <path d="M116 128 C90 110 76 154 112 180 C116 168 118 150 116 128 Z" fill="${style.accent}" opacity="0.82" />
          <path d="M284 128 C310 110 324 154 288 180 C284 168 282 150 284 128 Z" fill="${style.accent}" opacity="0.82" />
        `;
      case "cat":
      case "fox":
        return `
          <path d="M114 138 L148 80 L174 144 Z" fill="${style.face}" />
          <path d="M286 138 L252 80 L226 144 Z" fill="${style.face}" />
          <path d="M127 132 L148 98 L161 138 Z" fill="${style.inner}" />
          <path d="M273 132 L252 98 L239 138 Z" fill="${style.inner}" />
        `;
      case "elephant":
        return `
          <circle cx="122" cy="176" r="48" fill="${style.face}" opacity="0.92" />
          <circle cx="278" cy="176" r="48" fill="${style.face}" opacity="0.92" />
          <circle cx="122" cy="176" r="26" fill="${style.inner}" opacity="0.9" />
          <circle cx="278" cy="176" r="26" fill="${style.inner}" opacity="0.9" />
        `;
      case "giraffe":
        return `
          <rect x="134" y="92" width="16" height="48" rx="8" fill="${style.face}" />
          <rect x="250" y="92" width="16" height="48" rx="8" fill="${style.face}" />
          <circle cx="142" cy="88" r="12" fill="${style.accent}" />
          <circle cx="258" cy="88" r="12" fill="${style.accent}" />
        `;
      case "sheep":
      case "goat":
      case "bear":
      case "mouse":
      case "panda":
        return `
          <circle cx="132" cy="132" r="26" fill="${style.face}" />
          <circle cx="268" cy="132" r="26" fill="${style.face}" />
          <circle cx="132" cy="132" r="12" fill="${style.inner}" />
          <circle cx="268" cy="132" r="12" fill="${style.inner}" />
        `;
      case "human":
        return `
          <path d="M126 124 C132 96 154 82 176 88" stroke="${style.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
          <path d="M274 124 C268 96 246 82 224 88" stroke="${style.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
        `;
      default:
        return `
          <circle cx="132" cy="132" r="22" fill="${style.face}" />
          <circle cx="268" cy="132" r="22" fill="${style.face}" />
        `;
    }
  }

  function buildFace(kind, style, mood) {
    const mouth = mood === "calm"
      ? '<path d="M178 286 C193 296 207 296 222 286" stroke="#6a2846" stroke-width="7" stroke-linecap="round" fill="none" />'
      : '<path d="M168 278 C188 304 212 304 232 278" stroke="#6a2846" stroke-width="7" stroke-linecap="round" fill="none" />';
    const eyes = kind === "panda"
      ? `
        <ellipse cx="156" cy="218" rx="26" ry="30" fill="#20252f" opacity="0.88" />
        <ellipse cx="244" cy="218" rx="26" ry="30" fill="#20252f" opacity="0.88" />
        <circle cx="160" cy="218" r="12" fill="#fff" />
        <circle cx="240" cy="218" r="12" fill="#fff" />
        <circle cx="160" cy="218" r="5" fill="#3a2331" />
        <circle cx="240" cy="218" r="5" fill="#3a2331" />
      `
      : `
        <circle cx="160" cy="220" r="13" fill="#fff" />
        <circle cx="240" cy="220" r="13" fill="#fff" />
        <circle cx="160" cy="220" r="5" fill="#3a2331" />
        <circle cx="240" cy="220" r="5" fill="#3a2331" />
      `;

    const cheeks = mood === "energetic"
      ? `
        <circle cx="126" cy="248" r="16" fill="#ff8fb2" opacity="0.28" />
        <circle cx="274" cy="248" r="16" fill="#ff8fb2" opacity="0.28" />
      `
      : "";

    const muzzle = {
      pig: `
        <ellipse cx="200" cy="256" rx="54" ry="38" fill="${style.inner}" />
        <ellipse cx="200" cy="256" rx="34" ry="22" fill="#f7b7cc" />
        <circle cx="188" cy="256" r="5" fill="#c96a8b" />
        <circle cx="212" cy="256" r="5" fill="#c96a8b" />
      `,
      elephant: `
        <path d="M185 244 C178 292 184 330 200 330 C216 330 222 292 215 244 Z" fill="${style.inner}" />
      `,
      rabbit: `<ellipse cx="200" cy="258" rx="36" ry="26" fill="${style.inner}" />`,
      dog: `<ellipse cx="200" cy="260" rx="46" ry="32" fill="${style.inner}" />`,
      cat: `<ellipse cx="200" cy="258" rx="40" ry="28" fill="${style.inner}" />`,
      fox: `<path d="M156 246 L244 246 L200 298 Z" fill="${style.inner}" />`,
      giraffe: `<ellipse cx="200" cy="266" rx="44" ry="34" fill="${style.inner}" />`,
      sheep: `<ellipse cx="200" cy="258" rx="38" ry="26" fill="${style.inner}" />`,
      goat: `<ellipse cx="200" cy="258" rx="38" ry="26" fill="${style.inner}" />`,
      bear: `<ellipse cx="200" cy="260" rx="42" ry="30" fill="${style.inner}" />`,
      mouse: `<ellipse cx="200" cy="262" rx="34" ry="24" fill="${style.inner}" />`,
      panda: `<ellipse cx="200" cy="260" rx="40" ry="30" fill="${style.inner}" />`,
      human: `<path d="M188 252 C194 266 206 266 212 252" stroke="${style.accent}" stroke-width="6" stroke-linecap="round" fill="none" />`,
      generic: `<ellipse cx="200" cy="258" rx="40" ry="28" fill="${style.inner}" />`,
    }[kind] || `<ellipse cx="200" cy="258" rx="40" ry="28" fill="${style.inner}" />`;

    const horns = kind === "goat"
      ? `
        <path d="M126 124 C106 102 112 78 132 68" stroke="${style.accent}" stroke-width="9" stroke-linecap="round" fill="none" />
        <path d="M274 124 C294 102 288 78 268 68" stroke="${style.accent}" stroke-width="9" stroke-linecap="round" fill="none" />
      `
      : "";

    const stripes = kind === "zebra"
      ? `
        <path d="M150 152 L132 302" stroke="${style.accent}" stroke-width="10" opacity="0.9" />
        <path d="M190 146 L176 306" stroke="${style.accent}" stroke-width="8" opacity="0.82" />
        <path d="M230 146 L220 304" stroke="${style.accent}" stroke-width="8" opacity="0.82" />
        <path d="M270 152 L268 290" stroke="${style.accent}" stroke-width="10" opacity="0.9" />
      `
      : "";

    const spots = kind === "giraffe"
      ? `
        <circle cx="158" cy="178" r="14" fill="${style.accent}" opacity="0.36" />
        <circle cx="238" cy="160" r="12" fill="${style.accent}" opacity="0.36" />
        <circle cx="232" cy="232" r="14" fill="${style.accent}" opacity="0.36" />
        <circle cx="168" cy="260" r="10" fill="${style.accent}" opacity="0.36" />
      `
      : "";

    const fluff = kind === "sheep"
      ? `
        <circle cx="150" cy="130" r="26" fill="#fff" />
        <circle cx="180" cy="112" r="30" fill="#fff" />
        <circle cx="220" cy="112" r="30" fill="#fff" />
        <circle cx="250" cy="130" r="26" fill="#fff" />
      `
      : "";

    return `
      ${horns}
      ${buildEars(kind, style)}
      ${fluff}
      <ellipse cx="200" cy="214" rx="102" ry="118" fill="${style.face}" />
      ${stripes}
      ${spots}
      ${eyes}
      ${muzzle}
      ${cheeks}
      <circle cx="200" cy="252" r="4" fill="#6a2846" />
      ${mouth}
    `;
  }

  function buildBackground(item, palette) {
    const seed = hash(item?.slug || item?.name || displayName(item));
    const dots = Array.from({ length: 7 }, (_, index) => {
      const x = 42 + ((seed >> (index % 8)) % 310);
      const y = 52 + ((seed >> ((index + 3) % 8)) % 286);
      const r = 10 + ((seed >> ((index + 5) % 8)) % 18);
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,0.22)" />`;
    }).join("");
    return `
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.from}" />
          <stop offset="100%" stop-color="${palette.to}" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="${palette.shadow}" flood-opacity="0.28" />
        </filter>
      </defs>
      <rect width="400" height="400" rx="44" fill="url(#bg)" />
      <rect x="22" y="22" width="356" height="356" rx="34" fill="rgba(255,255,255,0.14)" />
      ${dots}
    `;
  }

  function buildPortraitSvg(item) {
    const style = SPECIES_STYLES[inferSpeciesKey(item)] || SPECIES_STYLES.generic;
    const palette = pickPalette(item);
    const traits = []
      .concat(Array.isArray(item?.combined_traits_zh) ? item.combined_traits_zh : [])
      .concat(Array.isArray(item?.combined_traits) ? item.combined_traits : []);
    const mood = traits.some((trait) => /calm|冷静|稳/.test(String(trait))) ? "calm" : "energetic";
    const title = escapeHtml(displayName(item));
    const subtitle = escapeHtml(displaySpecies(item));
    const chips = traits.slice(0, 2).map((trait, index) => {
      const x = 72 + index * 132;
      return `
        <rect x="${x}" y="338" width="120" height="28" rx="14" fill="rgba(255,255,255,0.28)" />
        <text x="${x + 60}" y="357" text-anchor="middle" font-size="13" fill="#ffffff">${escapeHtml(String(trait))}</text>
      `;
    }).join("");

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-labelledby="title desc">
        <title id="title">${title}</title>
        <desc id="desc">${title} portrait</desc>
        ${buildBackground(item, palette)}
        <g filter="url(#shadow)">
          <circle cx="200" cy="192" r="118" fill="rgba(255,255,255,0.26)" />
          ${buildFace(style.kind, style, mood)}
        </g>
        <rect x="54" y="292" width="292" height="58" rx="20" fill="rgba(255,255,255,0.9)" />
        <text x="200" y="318" text-anchor="middle" font-size="24" font-weight="700" fill="#6a2846">${title}</text>
        <text x="200" y="340" text-anchor="middle" font-size="13" fill="#9b627d">${subtitle}</text>
        ${chips}
      </svg>
    `.trim();
  }

  function getGeneratedSrc(item) {
    const slug = item?.slug || slugify(item?.name || displayName(item));
    const entry = generated[slug];
    if (!entry) return "";
    if (entry.src) return entry.src;
    if (entry.filename) return `./assets/generated/${entry.filename}`;
    return "";
  }

  function getPortraitSrc(item) {
    const generatedSrc = getGeneratedSrc(item);
    if (generatedSrc) return generatedSrc;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(buildPortraitSvg(item))}`;
  }

  function getPortraitAlt(item) {
    return `${displayName(item)} portrait`;
  }

  window.PPTI_PORTRAITS = {
    buildPortraitSvg,
    displayName,
    getPortraitAlt,
    getPortraitSrc,
  };
}());
