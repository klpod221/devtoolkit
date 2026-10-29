const PUNCTUATIONS = [
  ",",
  "，",
  ".",
  "。",
  ":",
  "：",
  ";",
  "；",
  "[",
  "]",
  "【",
  "]",
  "】",
  "{",
  "｛",
  "}",
  "｝",
  "(",
  "（",
  ")",
  "）",
  "<",
  "《",
  ">",
  "》",
  "$",
  "￥",
  "!",
  "！",
  "?",
  "？",
  "~",
  "～",
  "'",
  "’",
  '"',
  "“",
  "”",
  "*",
  "/",
  "\\",
  "&",
  "%",
  "@",
  "#",
  "^",
  "、",
];

const textSimplifier = (text) => {
  if (!text || text.trim() === "") return "";

  // Replace punctuations to empty spaces
  PUNCTUATIONS.forEach((punctuation) => {
    try {
      const punctuationReg = new RegExp("\\" + punctuation, "g");
      text = text.replace(punctuationReg, " ");
    } catch {
      text = text.replaceAll(punctuation, " ");
    }
  });

  // Remove all kind of symbols
  text = text.replace(/[\uFF00-\uFFEF\u2000-\u206F]/g, "");

  // Format white space character globally
  text = text.replace(/\s+/g, " ").trim();

  return text;
};

export default textSimplifier;
