import _ from "lodash";
import emojiUnicodeData from "unicode-emoji-json";
import emojiKeywords from "emojilib";

const escapeUnicode = (emoji) => {
  return emoji
    .split("")
    .map((unit) => `\\u${unit.charCodeAt(0).toString(16).padStart(4, "0")}`)
    .join("");
};

const getEmojiCodePoint = (emoji) => {
  return emoji.codePointAt(0)
    ? `0x${emoji.codePointAt(0)?.toString(16)}`
    : undefined;
};

const emojis = _.map(emojiUnicodeData, (emojiInfo, emoji) => ({
  ...emojiInfo,
  emoji,
  title: _.capitalize(emojiInfo.name),
  keywords: emojiKeywords[emoji] || [],
  unicode: escapeUnicode(emoji),
  codePoint: getEmojiCodePoint(emoji),
}));

const emojiGroups = _.chain(emojis)
  .groupBy("group")
  .map((emojis, group) => ({ group, emojis }))
  .value();

const searchEmojis = (keyword) => {
  // split keyword by space
  const keywords = keyword.toLowerCase().split(" ");

  return emojis.filter((emoji) =>
    keywords.every((keyword) =>
      emoji.keywords.some((emojiKeyword) =>
        emojiKeyword.toLowerCase().includes(keyword),
      ),
    ),
  );
};

const searchEmojiGroups = (keyword) => {
  const emojis = searchEmojis(keyword);

  return _.chain(emojis)
    .groupBy("group")
    .map((emojis, group) => ({ group, emojis }))
    .value();
};

export { emojis, emojiGroups, searchEmojis, searchEmojiGroups };
