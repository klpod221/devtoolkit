const textToUnicode = (text) => {
  return text
    .split("")
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join("");
};

const unicodeToText = (unicode) => {
  return unicode.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};

export { textToUnicode, unicodeToText };
