const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

const charsFromRange = (start, count) =>
  Array.from({ length: count }, (_, i) => String.fromCodePoint(start + i)).join(
    "",
  );

const assignMap = (map, source, target) => {
  const sourceChars = Array.from(source);
  const targetChars = Array.from(target);

  sourceChars.forEach((char, index) => {
    if (targetChars[index]) {
      map[char] = targetChars[index];
    }
  });
};

const buildMathMap = ({
  upper,
  lower,
  digits,
  upperStart,
  lowerStart,
  digitStart,
}) => {
  const map = {};

  if (upper) assignMap(map, UPPER, upper);
  if (lower) assignMap(map, LOWER, lower);
  if (digits) assignMap(map, DIGITS, digits);

  if (typeof upperStart === "number") {
    assignMap(map, UPPER, charsFromRange(upperStart, UPPER.length));
  }

  if (typeof lowerStart === "number") {
    assignMap(map, LOWER, charsFromRange(lowerStart, LOWER.length));
  }

  if (typeof digitStart === "number") {
    assignMap(map, DIGITS, charsFromRange(digitStart, DIGITS.length));
  }

  return map;
};

const buildCombiningMap = (mark) => {
  const map = {};
  const chars = `${UPPER}${LOWER}${DIGITS}`;

  Array.from(chars).forEach((char) => {
    map[char] = `${char}${mark}`;
  });

  return map;
};

const smallCapsMap = (() => {
  const map = {};
  const smallCaps = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ";

  assignMap(map, LOWER, smallCaps);
  assignMap(map, UPPER, smallCaps);

  return map;
})();

const superscriptMap = (() => {
  const map = {};
  const letters = "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ";
  const digits = "⁰¹²³⁴⁵⁶⁷⁸⁹";

  assignMap(map, LOWER, letters);
  assignMap(map, UPPER, letters);
  assignMap(map, DIGITS, digits);

  return map;
})();

const subscriptMap = (() => {
  const map = {};
  const subset = {
    a: "ₐ",
    e: "ₑ",
    h: "ₕ",
    i: "ᵢ",
    j: "ⱼ",
    k: "ₖ",
    l: "ₗ",
    m: "ₘ",
    n: "ₙ",
    o: "ₒ",
    p: "ₚ",
    r: "ᵣ",
    s: "ₛ",
    t: "ₜ",
    u: "ᵤ",
    v: "ᵥ",
    x: "ₓ",
  };

  Object.entries(subset).forEach(([key, value]) => {
    map[key] = value;
    map[key.toUpperCase()] = value;
  });

  assignMap(map, DIGITS, "₀₁₂₃₄₅₆₇₈₉");

  return map;
})();

const circledMap = (() => {
  const map = {};

  assignMap(map, UPPER, charsFromRange(0x24b6, 26));
  assignMap(map, LOWER, charsFromRange(0x24d0, 26));
  assignMap(map, "123456789", charsFromRange(0x2460, 9));
  map["0"] = "⓪";

  return map;
})();

const squaredMap = (() => {
  const map = {};
  const squaredLetters = charsFromRange(0x1f130, 26);

  assignMap(map, UPPER, squaredLetters);
  assignMap(map, LOWER, squaredLetters);

  return map;
})();

const regionalIndicatorMap = (() => {
  const map = {};
  const regional = charsFromRange(0x1f1e6, 26);

  assignMap(map, UPPER, regional);
  assignMap(map, LOWER, regional);

  return map;
})();

const unicodeSets = {
  "bold-sans": {
    name: "Bold Sans Serif",
    preview: "𝗔𝗕𝗖𝟭𝟮𝟯",
    map: buildMathMap({
      upperStart: 0x1d5d4,
      lowerStart: 0x1d5ee,
      digitStart: 0x1d7ec,
    }),
  },
  "italic-sans": {
    name: "Italic Sans Serif",
    preview: "𝘈𝘉𝘊123",
    map: buildMathMap({ upperStart: 0x1d608, lowerStart: 0x1d622 }),
  },
  "bold-italic-sans": {
    name: "Bold Italic Sans Serif",
    preview: "𝘼𝘽𝘾123",
    map: buildMathMap({ upperStart: 0x1d63c, lowerStart: 0x1d656 }),
  },
  "bold-serif": {
    name: "Bold Serif",
    preview: "𝐀𝐁𝐂𝟏𝟐𝟑",
    map: buildMathMap({
      upperStart: 0x1d400,
      lowerStart: 0x1d41a,
      digitStart: 0x1d7ce,
    }),
  },
  "italic-serif": {
    name: "Italic Serif",
    preview: "𝐴𝐵𝐶123",
    map: buildMathMap({
      upper: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
      lower: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
    }),
  },
  "bold-italic-serif": {
    name: "Bold Italic Serif",
    preview: "𝑨𝑩𝑪123",
    map: buildMathMap({ upperStart: 0x1d468, lowerStart: 0x1d482 }),
  },
  monospace: {
    name: "Monospace",
    preview: "𝙰𝙱𝙲𝟷𝟸𝟹",
    map: buildMathMap({
      upperStart: 0x1d670,
      lowerStart: 0x1d68a,
      digitStart: 0x1d7f6,
    }),
  },
  "double-struck": {
    name: "Double Struck",
    preview: "𝔸𝔹ℂ𝟙𝟚𝟛",
    map: buildMathMap({
      upper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
      lowerStart: 0x1d552,
      digitStart: 0x1d7d8,
    }),
  },
  script: {
    name: "Script",
    preview: "𝒜ℬ𝒞123",
    map: buildMathMap({
      upper: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵",
      lower: "𝒶𝒷𝒸𝒹ℯ𝒻ℊℎ𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
    }),
  },
  "bold-script": {
    name: "Bold Script",
    preview: "𝓐𝓑𝓒123",
    map: buildMathMap({ upperStart: 0x1d4d0, lowerStart: 0x1d4ea }),
  },
  fraktur: {
    name: "Fraktur",
    preview: "𝔄𝔅ℭ123",
    map: buildMathMap({
      upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ",
      lowerStart: 0x1d51e,
    }),
  },
  "bold-fraktur": {
    name: "Bold Fraktur",
    preview: "𝕬𝕭𝕮123",
    map: buildMathMap({ upperStart: 0x1d56c, lowerStart: 0x1d586 }),
  },
  circled: {
    name: "Circled",
    preview: "ⒶⒷⒸ①②③",
    map: circledMap,
  },
  fullwidth: {
    name: "Fullwidth",
    preview: "ＡＢＣ１２３",
    map: buildMathMap({
      upperStart: 0xff21,
      lowerStart: 0xff41,
      digitStart: 0xff10,
    }),
  },
  "small-caps": {
    name: "Small Caps",
    preview: "ᴀʙᴄ123",
    map: smallCapsMap,
  },
  superscript: {
    name: "Superscript",
    preview: "ᴬᴮᶜ¹²³",
    map: superscriptMap,
  },
  subscript: {
    name: "Subscript",
    preview: "ₐᵦ𝒸₁₂₃",
    map: subscriptMap,
  },
  squared: {
    name: "Squared",
    preview: "🄰🄱🄲123",
    map: squaredMap,
  },
  "regional-indicator": {
    name: "Regional Indicator",
    preview: "🇦🇧🇨123",
    map: regionalIndicatorMap,
  },
  underline: {
    name: "Underline",
    preview: "A̲B̲C̲1̲2̲3̲",
    map: buildCombiningMap("\u0332"),
  },
  "double-underline": {
    name: "Double Underline",
    preview: "A̳B̳C̳1̳2̳3̳",
    map: buildCombiningMap("\u0333"),
  },
  strikethrough: {
    name: "Strikethrough",
    preview: "A̶B̶C̶1̶2̶3̶",
    map: buildCombiningMap("\u0336"),
  },
  overline: {
    name: "Overline",
    preview: "A̅B̅C̅1̅2̅3̅",
    map: buildCombiningMap("\u0305"),
  },
  crossed: {
    name: "Crossed",
    preview: "A̸B̸C̸1̸2̸3̸",
    map: buildCombiningMap("\u0338"),
  },
};

export default Object.freeze(unicodeSets);
