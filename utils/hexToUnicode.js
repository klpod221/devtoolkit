const hexToUnicode = (text) => {
  if (!text) return "";
  const tokens = text.match(/(?:0x|\\u|U\+)?([0-9a-fA-F]{1,6})/g) || [];

  return tokens
    .map((token) => {
      const clean = token.replace(/^(?:0x|\\u|U\+)/i, "");
      if (!clean) return "";
      try {
        const codePoint = parseInt(clean, 16);
        if (isNaN(codePoint) || codePoint > 0x10ffff) return "";
        return String.fromCodePoint(codePoint);
      } catch {
        return "";
      }
    })
    .join("");
};

export default hexToUnicode;
