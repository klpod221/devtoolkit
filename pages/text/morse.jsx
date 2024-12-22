import React from "react";
import _, { set } from "lodash";

import {
  morseToText,
  textToMorse,
  playMorseCode,
  morseCodeDictionary,
} from "@utils/morseCodeTranslator";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";
import MyTextarea from "@components/MyTextarea";

import { FaPlay } from "react-icons/fa";

const MorseCodeTranslator = () => {
  const [text, setText] = React.useState("KLPOD221");
  const [textError, setTextError] = React.useState("");
  const [morseCode, setMorseCode] = React.useState("");

  const [morse, setMorse] = React.useState(
    "-.- .-.. .--. --- -.. ..--- ..--- .----",
  );
  const [morseError, setMorseError] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");

  const [isPlaying, setIsPlaying] = React.useState(false);

  const playSound = async (morse) => {
    setIsPlaying(true);
    await playMorseCode(morse);
    setIsPlaying(false);
  };

  const textToMorseCode = React.useMemo(
    () =>
      _.debounce((text) => {
        try {
          setMorseCode(textToMorse(text));
          setTextError("");
        } catch (error) {
          setMorseCode("");
          setTextError(error.message);
        }
      }, 300),
    [],
  );

  const morseCodeToText = React.useMemo(
    () =>
      _.debounce((morse) => {
        try {
          setTranslatedText(morseToText(morse));
          setMorseError("");
        } catch (error) {
          setTranslatedText("");
          setMorseError(error.message);
        }
      }, 300),
    [],
  );

  React.useEffect(() => {
    textToMorseCode(text);
  }, [text, textToMorseCode]);

  React.useEffect(() => {
    morseCodeToText(morse);
  }, [morse, morseCodeToText]);

  return (
    <TwoColumn leftWidth={60}>
      <TwoColumn.Left>
        <MyCard.Header title="Text to Morse Code" />

        <MyTextarea
          label="Input your text here"
          value={text}
          onChange={setText}
          placeholder="Enter text here"
          error={textError}
        />

        <MyTextarea
          label={
            <div className="flex items-center gap-2">
              <span>Morse code will appear here</span>
              <button
                onClick={() => playSound(morseCode)}
                disabled={isPlaying || !morseCode}
                className="text-cyan-500 dark:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                title="Play Morse Code"
              >
                <FaPlay />
              </button>
            </div>
          }
          value={morseCode}
          onChange={setMorseCode}
          placeholder="Morse code will appear here"
          readOnly
        />

        <MyCard.Header title="Morse Code to Text" />

        <MyTextarea
          label={
            <div className="flex items-center gap-2">
              <span>Enter morse code here</span>
              <button
                onClick={() => playSound(morse)}
                disabled={isPlaying || !morse}
                className="text-cyan-500 dark:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                title="Play Morse Code"
              >
                <FaPlay />
              </button>
            </div>
          }
          value={morse}
          onChange={setMorse}
          placeholder="Enter morse code here"
          error={morseError}
        />

        <MyTextarea
          label="Text will appear here"
          value={translatedText}
          onChange={setTranslatedText}
          placeholder="Text will appear here"
          readOnly
        />
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Morse Code Dictionary" />

        <div className="grid grid-cols-4 gap-2 mt-4 overflow-y-auto">
          {Object.entries(morseCodeDictionary).map(([key, value]) => (
            <div key={key} className="flex gap-2 items-center">
              <span>{key === " " ? "space" : key}</span>
              <span className="text-lg font-bold">{value}</span>
            </div>
          ))}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

MorseCodeTranslator.title = "Morse Code Translator";
export default MorseCodeTranslator;
