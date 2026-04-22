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
    const raw = `${item?.slug || ""} ${item?.species || ""} ${item?.name || ""}`.toLowerCase();
    if (raw.includes("pig")) return "pig";
    if (raw.includes("rabbit")) return "rabbit";
    if (raw.includes("dog")) return "dog";
    if (raw.includes("cat")) return "cat";
    if (raw.includes("elephant")) return "elephant";
    if (raw.includes("giraffe")) return "giraffe";
    if (raw.includes("sheep")) return "sheep";
    if (raw.includes("goat")) return "goat";
    if (raw.includes("fox")) return "fox";
    if (raw.includes("zebra")) return "zebra";
    if (raw.includes("bear")) return "bear";
    if (raw.includes("mouse")) return "mouse";
    if (raw.includes("panda")) return "panda";
    if (raw.includes("queen") || raw.includes("human")) return "human";
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
          <path d="M118 132 L142 94 L160 142 Z" fill="${style.face}" />
          <path d="M282 132 L258 94 L240 142 Z" fill="${style.face}" />
          <path d="M128 128 L142 106 L152 136 Z" fill="${style.inner}" />
          <path d="M272 128 L258 106 L248 136 Z" fill="${style.inner}" />
        `;
      case "rabbit":
        return `
          <rect x="132" y="34" width="24" height="108" rx="14" fill="${style.face}" />
          <rect x="244" y="34" width="24" height="108" rx="14" fill="${style.face}" />
          <rect x="138" y="50" width="12" height="78" rx="10" fill="${style.inner}" />
          <rect x="250" y="50" width="12" height="78" rx="10" fill="${style.inner}" />
        `;
      case "dog":
        return `
          <path d="M120 136 C94 120 84 158 116 184 C120 172 122 152 120 136 Z" fill="${style.accent}" opacity="0.82" />
          <path d="M280 136 C306 120 316 158 284 184 C280 172 278 152 280 136 Z" fill="${style.accent}" opacity="0.82" />
        `;
      case "cat":
      case "fox":
        return `
          <path d="M120 144 L150 88 L176 148 Z" fill="${style.face}" />
          <path d="M280 144 L250 88 L224 148 Z" fill="${style.face}" />
          <path d="M132 138 L150 104 L163 142 Z" fill="${style.inner}" />
          <path d="M268 138 L250 104 L237 142 Z" fill="${style.inner}" />
        `;
      case "elephant":
        return `
          <circle cx="124" cy="178" r="48" fill="${style.face}" opacity="0.92" />
          <circle cx="276" cy="178" r="48" fill="${style.face}" opacity="0.92" />
          <circle cx="124" cy="178" r="26" fill="${style.inner}" opacity="0.9" />
          <circle cx="276" cy="178" r="26" fill="${style.inner}" opacity="0.9" />
        `;
      case "giraffe":
        return `
          <rect x="138" y="94" width="14" height="46" rx="8" fill="${style.face}" />
          <rect x="248" y="94" width="14" height="46" rx="8" fill="${style.face}" />
          <circle cx="145" cy="90" r="11" fill="${style.accent}" />
          <circle cx="255" cy="90" r="11" fill="${style.accent}" />
        `;
      case "sheep":
      case "goat":
      case "bear":
      case "mouse":
      case "panda":
        return `
          <circle cx="132" cy="136" r="24" fill="${style.face}" />
          <circle cx="268" cy="136" r="24" fill="${style.face}" />
          <circle cx="132" cy="136" r="11" fill="${style.inner}" />
          <circle cx="268" cy="136" r="11" fill="${style.inner}" />
        `;
      case "human":
        return `
          <path d="M132 132 C138 100 156 88 176 92" stroke="${style.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
          <path d="M268 132 C262 100 244 88 224 92" stroke="${style.accent}" stroke-width="10" stroke-linecap="round" fill="none" />
        `;
      default:
        return `
          <circle cx="132" cy="136" r="20" fill="${style.face}" />
          <circle cx="268" cy="136" r="20" fill="${style.face}" />
        `;
    }
  }

  function buildFace(kind, style, mood) {
    const mouth = mood === "calm"
      ? '<path d="M180 286 C194 294 206 294 220 286" stroke="#6a2846" stroke-width="7" stroke-linecap="round" fill="none" />'
      : '<path d="M170 278 C188 302 212 302 230 278" stroke="#6a2846" stroke-width="7" stroke-linecap="round" fill="none" />';
    const eyes = kind === "panda"
      ? `
        <ellipse cx="160" cy="220" rx="24" ry="28" fill="#20252f" opacity="0.88" />
        <ellipse cx="240" cy="220" rx="24" ry="28" fill="#20252f" opacity="0.88" />
        <circle cx="162" cy="220" r="10" fill="#fff" />
        <circle cx="238" cy="220" r="10" fill="#fff" />
        <circle cx="162" cy="220" r="5" fill="#3a2331" />
        <circle cx="238" cy="220" r="5" fill="#3a2331" />
      `
      : `
        <circle cx="164" cy="222" r="12" fill="#fff" />
        <circle cx="236" cy="222" r="12" fill="#fff" />
        <circle cx="164" cy="222" r="5" fill="#3a2331" />
        <circle cx="236" cy="222" r="5" fill="#3a2331" />
      `;

    const cheeks = mood === "energetic"
      ? `
        <circle cx="132" cy="248" r="14" fill="#ff8fb2" opacity="0.24" />
        <circle cx="268" cy="248" r="14" fill="#ff8fb2" opacity="0.24" />
      `
      : "";

    const muzzle = {
      pig: `
        <ellipse cx="200" cy="258" rx="52" ry="36" fill="${style.inner}" />
        <ellipse cx="200" cy="258" rx="32" ry="20" fill="#f7b7cc" />
        <circle cx="188" cy="258" r="5" fill="#c96a8b" />
        <circle cx="212" cy="258" r="5" fill="#c96a8b" />
      `,
      elephant: `
        <path d="M186 246 C180 292 186 326 200 326 C214 326 220 292 214 246 Z" fill="${style.inner}" />
      `,
      rabbit: `<ellipse cx="200" cy="258" rx="34" ry="24" fill="${style.inner}" />`,
      dog: `<ellipse cx="200" cy="260" rx="44" ry="30" fill="${style.inner}" />`,
      cat: `<ellipse cx="200" cy="258" rx="38" ry="26" fill="${style.inner}" />`,
      fox: `<path d="M160 246 L240 246 L200 294 Z" fill="${style.inner}" />`,
      giraffe: `<ellipse cx="200" cy="264" rx="42" ry="32" fill="${style.inner}" />`,
      sheep: `<ellipse cx="200" cy="258" rx="38" ry="26" fill="${style.inner}" />`,
      goat: `<ellipse cx="200" cy="258" rx="38" ry="26" fill="${style.inner}" />`,
      bear: `<ellipse cx="200" cy="260" rx="40" ry="28" fill="${style.inner}" />`,
      mouse: `<ellipse cx="200" cy="262" rx="34" ry="22" fill="${style.inner}" />`,
      panda: `<ellipse cx="200" cy="260" rx="38" ry="28" fill="${style.inner}" />`,
      human: `<path d="M190 252 C194 264 206 264 210 252" stroke="${style.accent}" stroke-width="6" stroke-linecap="round" fill="none" />`,
      generic: `<ellipse cx="200" cy="258" rx="40" ry="28" fill="${style.inner}" />`,
    }[kind] || `<ellipse cx="200" cy="258" rx="40" ry="28" fill="${style.inner}" />`;

    const horns = kind === "goat"
      ? `
        <path d="M128 126 C108 104 112 82 130 72" stroke="${style.accent}" stroke-width="8" stroke-linecap="round" fill="none" />
        <path d="M272 126 C292 104 288 82 270 72" stroke="${style.accent}" stroke-width="8" stroke-linecap="round" fill="none" />
      `
      : "";

    const stripes = kind === "zebra"
      ? `
        <path d="M150 154 L136 300" stroke="${style.accent}" stroke-width="10" opacity="0.9" />
        <path d="M188 148 L178 302" stroke="${style.accent}" stroke-width="8" opacity="0.82" />
        <path d="M226 148 L220 300" stroke="${style.accent}" stroke-width="8" opacity="0.82" />
        <path d="M264 154 L264 292" stroke="${style.accent}" stroke-width="10" opacity="0.9" />
      `
      : "";

    const spots = kind === "giraffe"
      ? `
        <circle cx="162" cy="180" r="12" fill="${style.accent}" opacity="0.34" />
        <circle cx="236" cy="162" r="11" fill="${style.accent}" opacity="0.34" />
        <circle cx="232" cy="232" r="12" fill="${style.accent}" opacity="0.34" />
        <circle cx="170" cy="258" r="9" fill="${style.accent}" opacity="0.34" />
      `
      : "";

    const fluff = kind === "sheep"
      ? `
        <circle cx="150" cy="134" r="24" fill="#fff" />
        <circle cx="180" cy="114" r="28" fill="#fff" />
        <circle cx="220" cy="114" r="28" fill="#fff" />
        <circle cx="250" cy="134" r="24" fill="#fff" />
      `
      : "";

    return `
      ${horns}
      ${buildEars(kind, style)}
      ${fluff}
      <ellipse cx="200" cy="214" rx="98" ry="112" fill="${style.face}" />
      ${stripes}
      ${spots}
      ${eyes}
      ${muzzle}
      ${cheeks}
      <circle cx="200" cy="252" r="4" fill="#6a2846" />
      ${mouth}
    `;
  }

  function buildPortraitSvg(item) {
    const seed = hash(item?.slug || item?.name || displayName(item));
    const bgId = `bg-${seed}`;
    const shadowId = `shadow-${seed}`;
    const clipId = `clip-${seed}`;
    const style = SPECIES_STYLES[inferSpeciesKey(item)] || SPECIES_STYLES.generic;
    const palette = pickPalette(item);
    const traits = []
      .concat(Array.isArray(item?.combined_traits) ? item.combined_traits : [])
      .concat(Array.isArray(item?.traits) ? item.traits : []);
    const mood = traits.some((trait) => String(trait || "").toLowerCase().includes("calm")) ? "calm" : "energetic";
    const title = escapeHtml(displayName(item));

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-labelledby="title desc">
        <title id="title">${title}</title>
        <desc id="desc">${title} portrait</desc>
        <defs>
          <linearGradient id="${bgId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${palette.from}" />
            <stop offset="100%" stop-color="${palette.to}" />
          </linearGradient>
          <filter id="${shadowId}" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="${palette.shadow}" flood-opacity="0.26" />
          </filter>
          <clipPath id="${clipId}">
            <rect x="32" y="32" width="336" height="336" rx="34" />
          </clipPath>
        </defs>
        <rect width="400" height="400" rx="44" fill="url(#${bgId})" />
        <rect x="22" y="22" width="356" height="356" rx="34" fill="rgba(255,255,255,0.12)" />
        <circle cx="318" cy="82" r="24" fill="rgba(255,255,255,0.18)" />
        <circle cx="86" cy="308" r="16" fill="rgba(255,255,255,0.16)" />
        <g filter="url(#${shadowId})" clip-path="url(#${clipId})">
          <circle cx="200" cy="170" r="126" fill="rgba(255,255,255,0.2)" />
          <g transform="translate(200 178) scale(0.92) translate(-200 -178)">
            ${buildFace(style.kind, style, mood)}
          </g>
        </g>
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
