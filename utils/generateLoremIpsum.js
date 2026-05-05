import { loremIpsum } from "lorem-ipsum";

const LOREM_IPSUM_SENTENCE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
const LOREM_IPSUM_SENTENCE_PLAIN =
  "lorem ipsum dolor sit amet consectetur adipiscing elit";
const LOREM_IPSUM_SENTENCE_WORDS = LOREM_IPSUM_SENTENCE_PLAIN.split(" ");

const generateLoremIpsum = (length, type, isStartWithLorem) => {
  let generatedText = "";

  if (isStartWithLorem) {
    switch (type) {
      case "words":
        if (length <= LOREM_IPSUM_SENTENCE_WORDS.length) {
          generatedText = LOREM_IPSUM_SENTENCE_WORDS.slice(0, length).join(" ");
        } else {
          const newText = loremIpsum({
            count: length - LOREM_IPSUM_SENTENCE_WORDS.length,
            units: type,
          });
          generatedText = `${LOREM_IPSUM_SENTENCE_PLAIN} ${newText}`;
        }
        break;

      case "sentences":
      case "paragraphs":
        const newText = loremIpsum({
          count: length,
          units: type,
        });
        generatedText = `${LOREM_IPSUM_SENTENCE} ${newText}`;
        break;

      default:
        break;
    }
  } else {
    generatedText = loremIpsum({
      count: length,
      units: type,
    });
  }

  return generatedText;
};

export default generateLoremIpsum;
