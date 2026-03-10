import unicodeSets from "../data/unicodeSets.js";

const conversionCache = new Map();
const MAX_CACHE_ENTRIES = 500;

export function convertText(text, styleId) {
  const sourceText = typeof text === "string" ? text : String(text ?? "");
  const cacheKey = `${styleId}::${sourceText}`;

  if (conversionCache.has(cacheKey)) {
    return conversionCache.get(cacheKey);
  }

  const mapping = unicodeSets[styleId]?.map || {};
  const converted = Array.from(sourceText)
    .map((char) => mapping[char] || char)
    .join("");

  if (conversionCache.size >= MAX_CACHE_ENTRIES) {
    const firstKey = conversionCache.keys().next().value;
    conversionCache.delete(firstKey);
  }

  conversionCache.set(cacheKey, converted);
  return converted;
}
