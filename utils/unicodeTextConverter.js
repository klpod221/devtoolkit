const textToUnicode = (text) => {
  if (!text) return "";
  return Array.from(text)
    .map((char) => `&#${char.codePointAt(0)};`)
    .join("");
};

const unicodeToText = (unicode) => {
  if (!unicode) return "";
  return unicode.replace(/&#(\d+);/g, (match, dec) => {
    try {
      return String.fromCodePoint(Number(dec));
    } catch {
      return match;
    }
  });
};

export { textToUnicode, unicodeToText };
