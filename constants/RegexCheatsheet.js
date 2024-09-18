const cheatsheet = [
  {
    title: "Character classes",
    items: [
      {
        expressions: ["."],
        explanation: "any character except newline",
      },
      {
        expressions: ["\\w", "\\d", "\\s"],
        explanation: "word, digit, whitespace",
      },
      {
        expressions: ["[abc]"],
        explanation: "any of a, b, or c",
      },
      {
        expressions: ["[^abc]"],
        explanation: "not a, b, or c",
      },
      {
        expressions: ["[a-g]"],
        explanation: "character between a & g",
      },
    ],
  },
  {
    title: "Anchors",
    items: [
      {
        expressions: ["^abc$"],
        explanation: "start / end of the string",
      },
      {
        expressions: ["\\b", "\\B"],
        explanation: "word, not-word boundary",
      },
    ],
  },
  {
    title: "Escaped characters",
    items: [
      {
        expressions: ["\\.", "\\*", "\\\\"],
        explanation: "escaped special characters",
      },
      {
        expressions: ["\\t", "\\n", "\\r"],
        explanation: "tab, linefeed, carriage return",
      },
    ],
  },
  {
    title: "Groups & Lookaround",
    items: [
      {
        expressions: ["(abc)"],
        explanation: "capture group",
      },
      {
        expressions: ["\\1"],
        explanation: "backreference to group #1",
      },
      {
        expressions: ["(?:abc)"],
        explanation: "non-capturing group",
      },
      {
        expressions: ["(?=abc)"],
        explanation: "positive lookahead",
      },
      {
        expressions: ["(?!abc)"],
        explanation: "negative lookahead",
      },
    ],
  },
  {
    title: "Quantifiers & Alternation",
    items: [
      {
        expressions: ["a*", "a+", "a?"],
        explanation: "0 or more, 1 or more, 0 or 1",
      },
      {
        expressions: ["a{5}", "a{2,}"],
        explanation: "exactly five, two or more",
      },
      {
        expressions: ["a{1,3}"],
        explanation: "between one & three",
      },
      {
        expressions: ["a+?", "a{2,}?"],
        explanation: "match as few as possible",
      },
      {
        expressions: ["ab|cd"],
        explanation: "match ab or cd",
      },
    ],
  },
];

export default cheatsheet;
