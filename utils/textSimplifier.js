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
  "、",
  "、",
  "、",
];

const textSimplifier = (text) => {
  if (text.trim() === "") return "";

  // Replace punctuations to empty spaces
  PUNCTUATIONS.forEach((punctuation) => {
    const punctuationReg = new RegExp("\\" + punctuation, "g");
    text = text.replace(punctuationReg, " ");
  });

  // Remove all kind of symbols
  text = text.replace(/[\uFF00-\uFFEF\u2000-\u206F]/g, "");

  // Format white space character
  text = text.replace(/\s+/, " ");

  return text;
};

export default textSimplifier;
