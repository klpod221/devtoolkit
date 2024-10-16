import React from "react";
import { toast } from "react-toastify";

import wordCount from "@utils/wordCount";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyCodeEditor from "@components/MyCodeEditor";

import { FaArrowRight } from "react-icons/fa";

const WordCounter = () => {
  const [text, setText] = React.useState("");
  const [analysis, setAnalysis] = React.useState({
    words: 0,
    characters: 0,
    spaces: 0,
    lines: 0,
    bytes: 0,
    readingTime: 0,
    distribution: [],
  });

  const countWords = React.useCallback(() => {
    try {
      if (!text) {
        toast.error("Please enter some text.");
        return;
      }

      const characters = text.length;
      const spaces = text.split(" ").length - 1;
      const lines = text.split("\n").length;
      const bytes = new TextEncoder().encode(text).length;

      const wordCounter = wordCount(text);
      const words = Object.values(wordCounter).reduce((a, b) => a + b, 0);

      const distribution = Object.entries(wordCounter)
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count);

      // if reading time is < 1 minute, show in seconds
      const readingTime = words < 200 ? Math.ceil(words / 5) + " sec" : Math.ceil(words / 200) + " min";

      setAnalysis({ words, characters, spaces, lines, bytes, readingTime, distribution });
    } catch (error) {
      toast.error(error.message || "An error occurred.");
      console.error(error);
    }
  }, [text]);

  React.useEffect(() => {
    if (text) countWords();
  }, [text, countWords]);

  return (
    <TwoColumn leftWidth={65}>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter your text below.">
          <MyButton onClick={() => countWords()}>
            Count Words
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyCodeEditor language="text" value={text} onChange={setText} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Output"
          helper="Word count will be displayed here."
        />

        <div className="flex flex-wrap gap-4">
          <div className="w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center">
            <div className="text-gray-400 dark:text-dark-text-secondary">
              Words
            </div>
            <div className="text-3xl">{analysis.words}</div>
          </div>

          <div className="w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center">
            <div className="text-gray-400 dark:text-dark-text-secondary">
              Characters
            </div>
            <div className="text-3xl">{analysis.characters}</div>
          </div>

          <div className="w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center">
            <div className="text-gray-400 dark:text-dark-text-secondary">
              Spaces
            </div>
            <div className="text-3xl">{analysis.spaces}</div>
          </div>

          <div className="w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center">
            <div className="text-gray-400 dark:text-dark-text-secondary">
              Lines
            </div>
            <div className="text-3xl">{analysis.lines}</div>
          </div>

          <div className="w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center">
            <div className="text-gray-400 dark:text-dark-text-secondary">
              Bytes
            </div>
            <div className="text-3xl">{analysis.bytes}</div>
          </div>

          <div className="w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col items-center justify-center">
            <div className="text-gray-400 dark:text-dark-text-secondary">
              Reading Time
            </div>
            <div className="text-3xl">{analysis.readingTime}</div>
          </div>
        </div>

        <div className="mt-8">Word Distribution</div>
        <div className="h-full overflow-auto mt-2 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
          {analysis.distribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <kbd>{item.word}</kbd>
              <span>x {item.count}</span>
            </div>
          ))}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

WordCounter.title = "Word Counter";
export default WordCounter;
