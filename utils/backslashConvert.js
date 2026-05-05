import escapeText from "js-string-escape";
import unescapeText from "unescape-js";

const escape = (text) => {
  return escapeText(text);
}

const unescape = (text) => {
  return unescapeText(text);
}

export { escape, unescape };
