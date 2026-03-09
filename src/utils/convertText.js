import unicodeSets from "../data/unicodeSets.json";

export function convertText(text, styleId) {
  const mapping = unicodeSets[styleId]?.map || {};
  return Array.from(text)
    .map((char) => mapping[char] || char)
    .join("");
}
