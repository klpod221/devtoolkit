import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import MyCopyButton from "@components/MyCopyButton";
import { FaExchangeAlt, FaVolumeUp, FaTrash } from "react-icons/fa";

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語 (Japanese)" },
  { code: "ko", label: "한국어 (Korean)" },
  { code: "zh-CN", label: "中文 (Simplified)" },
  { code: "fr", label: "Français (French)" },
  { code: "de", label: "Deutsch (German)" },
  { code: "es", label: "Español (Spanish)" },
  { code: "it", label: "Italiano (Italian)" },
  { code: "ru", label: "Русский (Russian)" },
  { code: "th", label: "ไทย (Thai)" },
  { code: "id", label: "Bahasa Indonesia" },
];

const AITranslator = () => {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("vi");
  const [inputText, setInputText] = useState("Hello world! Welcome to DevToolkit.");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    setLoading(true);
    try {
      // Free endpoint with high availability and no API key required
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText.trim(),
      )}&langpair=${sourceLang}|${targetLang}`;

      const res = await axios.get(url, { timeout: 10000 });
      const data = res.data;

      if (data && data.responseData && data.responseData.translatedText) {
        setOutputText(data.responseData.translatedText);
        toast.success("Translated successfully!");
      } else {
        throw new Error("Translation provider returned an unexpected format.");
      }
    } catch (err) {
      toast.error(err.message || "Translation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    const tempText = inputText;
    setInputText(outputText);
    setOutputText(tempText);
  };

  const handleSpeak = (text, lang) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      toast.warn("Speech synthesis is not supported in this browser.");
      return;
    }
    if (!text.trim()) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <TwoColumn leftWidth={50}>
      <TwoColumn.Left>
        <MyCard.Header title="Source Text" helper="Enter text to translate">
          <div className="flex items-center space-x-2">
            <MySelect
              value={sourceLang}
              onChange={setSourceLang}
              sizing="sm"
              className="w-36"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </MySelect>

            <MyButton
              size="xs"
              color="light"
              onClick={() => handleSpeak(inputText, sourceLang)}
              disabled={!inputText}
              title="Listen to pronunciation"
            >
              <FaVolumeUp />
            </MyButton>
          </div>
        </MyCard.Header>

        <div className="space-y-4 mt-4">
          <MyTextarea
            rows={8}
            value={inputText}
            onChange={setInputText}
            placeholder="Type or paste text here..."
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {inputText.length} characters | {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words
            </span>

            <div className="flex space-x-2">
              <MyButton
                size="sm"
                color="light"
                onClick={() => {
                  setInputText("");
                  setOutputText("");
                }}
                disabled={!inputText}
              >
                <FaTrash className="mr-1" /> Clear
              </MyButton>

              <MyButton onClick={handleTranslate} loading={loading}>
                Translate
              </MyButton>
            </div>
          </div>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Translated Text" helper="Target language output">
          <div className="flex items-center space-x-2">
            <MyButton
              size="xs"
              color="light"
              onClick={handleSwap}
              title="Swap Languages"
            >
              <FaExchangeAlt />
            </MyButton>

            <MySelect
              value={targetLang}
              onChange={setTargetLang}
              sizing="sm"
              className="w-36"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </MySelect>

            {outputText && <MyCopyButton value={outputText} />}

            <MyButton
              size="xs"
              color="light"
              onClick={() => handleSpeak(outputText, targetLang)}
              disabled={!outputText}
              title="Listen to pronunciation"
            >
              <FaVolumeUp />
            </MyButton>
          </div>
        </MyCard.Header>

        <div className="mt-4">
          <MyTextarea
            rows={8}
            value={outputText}
            readOnly
            placeholder="Translated text will appear here..."
          />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

AITranslator.title = "Translator";
export default AITranslator;
