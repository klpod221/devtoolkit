import { loremIpsum } from "lorem-ipsum";

const LOREM_IPSUM_SENTENCE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const LOREM_IPSUM_SENTENCE_PLAIN =
  "lorem ipsum dolor sit amet consectetur adipiscing elit";
const LOREM_IPSUM_SENTENCE_WORDS = LOREM_IPSUM_SENTENCE_PLAIN.split(" ");

const generateLoremIpsum = (length, type, isStartWithLorem) => {
  const count = Math.max(1, Number(length) || 1);
  let generatedText = "";

  if (isStartWithLorem) {
    switch (type) {
      case "words":
        if (count <= LOREM_IPSUM_SENTENCE_WORDS.length) {
          generatedText = LOREM_IPSUM_SENTENCE_WORDS.slice(0, count).join(" ");
        } else {
          const newText = loremIpsum({
            count: count - LOREM_IPSUM_SENTENCE_WORDS.length,
            units: "words",
          });
          generatedText = `${LOREM_IPSUM_SENTENCE_PLAIN} ${newText}`;
        }
        break;

      case "sentences":
        if (count <= 1) {
          generatedText = LOREM_IPSUM_SENTENCE;
        } else {
          const newText = loremIpsum({
            count: count - 1,
            units: "sentences",
          });
          generatedText = `${LOREM_IPSUM_SENTENCE} ${newText}`;
        }
        break;

      case "paragraphs":
        if (count <= 1) {
          const newText = loremIpsum({ count: 1, units: "paragraphs" });
          generatedText = `${LOREM_IPSUM_SENTENCE} ${newText}`;
        } else {
          const firstP = `${LOREM_IPSUM_SENTENCE} ${loremIpsum({ count: 1, units: "sentences" })}`;
          const remainingP = loremIpsum({ count: count - 1, units: "paragraphs" });
          generatedText = `${firstP}\n\n${remainingP}`;
        }
        break;

      default:
        break;
    }
  } else {
    generatedText = loremIpsum({
      count,
      units: type,
    });
  }

  return generatedText;
};

export default generateLoremIpsum;
