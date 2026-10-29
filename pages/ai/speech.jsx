import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import MyRangeSlider from "@components/MyRangeSlider";
import MyButton from "@components/MyButton";
import MyCopyButton from "@components/MyCopyButton";
import { FaPlay, FaPause, FaStop, FaMicrophone, FaTrash } from "react-icons/fa";

const COMMON_STT_LANGUAGES = [
  { label: "English (US) (en-US)", value: "en-US" },
  { label: "English (UK) (en-GB)", value: "en-GB" },
  { label: "Tiếng Việt (vi-VN)", value: "vi-VN" },
  { label: "日本語 (ja-JP)", value: "ja-JP" },
  { label: "Français (fr-FR)", value: "fr-FR" },
  { label: "Español (es-ES)", value: "es-ES" },
  { label: "Deutsch (de-DE)", value: "de-DE" },
  { label: "中文 (zh-CN)", value: "zh-CN" },
];

const TextSpeechSuite = () => {
  const [tab, setTab] = useState("tts"); // tts | stt

  // TTS State
  const [ttsText, setTtsText] = useState(
    "Hello! This is the Text-to-Speech and Speech-to-Text tool in DevToolkit.",
  );
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // STT State
  const [sttText, setSttText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [sttLang, setSttLang] = useState("en-US");
  const [sttSupported, setSttSupported] = useState(true);
  const recognitionRef = useRef(null);

  // Initialize Voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedVoice]);

  // Initialize STT
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setSttSupported(false);
    }
  }, []);

  // --- TTS Handlers ---
  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      toast.error("Text-to-Speech is not supported in this browser.");
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();

    if (!ttsText.trim()) {
      toast.warn("Please enter some text to speak.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(ttsText);
    const voiceObj = voices.find((v) => v.name === selectedVoice);
    if (voiceObj) utterance.voice = voiceObj;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (e.error !== "canceled") {
        toast.error("Speech error: " + e.error);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (window.speechSynthesis && isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  // --- STT Handlers ---
  const toggleListening = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      toast.error("Speech Recognition is not supported in this browser (Recommended: Chrome, Edge, Safari).");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = sttLang;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Microphone active. Start speaking...");
      };

      recognition.onresult = (event) => {
        let finalTrans = "";
        for (let i = 0; i < event.results.length; i++) {
          finalTrans += event.results[i][0].transcript + " ";
        }
        setSttText(finalTrans.trim());
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error !== "no-speech") {
          toast.error("Recognition error: " + event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      toast.error("Could not start recognition: " + err.message);
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 dark:border-dark-secondary">
        <button
          type="button"
          onClick={() => setTab("tts")}
          className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition-colors ${
            tab === "tts"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Text to Speech (TTS)
        </button>
        <button
          type="button"
          onClick={() => setTab("stt")}
          className={`py-2.5 px-4 font-semibold text-sm border-b-2 transition-colors ${
            tab === "stt"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Speech to Text (STT)
        </button>
      </div>

      {tab === "tts" && (
        <TwoColumn leftWidth={50}>
          <TwoColumn.Left>
            <MyCard.Header
              title="Text to Speech"
              helper="Synthesize natural voice audio from text using browser speech engine."
            />

            <div className="space-y-4 mt-4">
              <MyTextarea
                label="Text to Read Aloud"
                rows={6}
                value={ttsText}
                onChange={setTtsText}
                placeholder="Enter text..."
              />

              <div className="flex flex-wrap gap-2">
                <MyButton
                  onClick={handleSpeak}
                  className={isSpeaking && !isPaused ? "bg-amber-600" : ""}
                >
                  <FaPlay className="mr-2" /> {isPaused ? "Resume" : "Speak"}
                </MyButton>

                {isSpeaking && !isPaused && (
                  <MyButton color="light" onClick={handlePause}>
                    <FaPause className="mr-2" /> Pause
                  </MyButton>
                )}

                <MyButton color="red" onClick={handleStop} disabled={!isSpeaking && !isPaused}>
                  <FaStop className="mr-2" /> Stop
                </MyButton>
              </div>
            </div>
          </TwoColumn.Left>

          <TwoColumn.Right>
            <MyCard.Header title="Voice Settings" helper="Adjust voice timbre, speed, and pitch" />

            <div className="space-y-4 mt-4">
              <MySelect
                label="Voice Selector"
                value={selectedVoice}
                onChange={setSelectedVoice}
              >
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </MySelect>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Speed (Rate): {rate}x
                </label>
                <MyRangeSlider
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={rate}
                  onChange={(v) => setRate(Number(v))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Pitch: {pitch}
                </label>
                <MyRangeSlider
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={pitch}
                  onChange={(v) => setPitch(Number(v))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Volume: {Math.round(volume * 100)}%
                </label>
                <MyRangeSlider
                  min={0}
                  max={1.0}
                  step={0.05}
                  value={volume}
                  onChange={(v) => setVolume(Number(v))}
                />
              </div>
            </div>
          </TwoColumn.Right>
        </TwoColumn>
      )}

      {tab === "stt" && (
        <TwoColumn leftWidth={45}>
          <TwoColumn.Left>
            <MyCard.Header
              title="Voice Recognition"
              helper="Transcribe speech from microphone into text in real time."
            />

            {!sttSupported && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-sm rounded-lg mb-4">
                Speech recognition is not natively supported by your current browser. Please use Chrome, Edge, or Safari.
              </div>
            )}

            <div className="space-y-4 mt-4">
              <MySelect
                label="Recognition Language"
                value={sttLang}
                onChange={setSttLang}
                disabled={isListening}
              >
                {COMMON_STT_LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </MySelect>

              <MyButton
                onClick={toggleListening}
                disabled={!sttSupported}
                className={`w-full py-3 text-base font-semibold ${
                  isListening ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-blue-600"
                }`}
              >
                <FaMicrophone className="mr-2" />
                {isListening ? "Listening... (Click to Stop)" : "Start Recording Speech"}
              </MyButton>
            </div>
          </TwoColumn.Left>

          <TwoColumn.Right>
            <MyCard.Header title="Transcribed Output" helper="Real-time transcribed text">
              <div className="flex gap-2">
                {sttText && <MyCopyButton value={sttText} />}
                <MyButton
                  size="xs"
                  color="light"
                  onClick={() => setSttText("")}
                  disabled={!sttText}
                >
                  <FaTrash className="mr-1" /> Clear
                </MyButton>
              </div>
            </MyCard.Header>

            <div className="mt-4">
              <MyTextarea
                rows={10}
                value={sttText}
                onChange={setSttText}
                placeholder="Spoken words will appear here..."
              />
            </div>
          </TwoColumn.Right>
        </TwoColumn>
      )}
    </div>
  );
};

TextSpeechSuite.title = "Text to Speech";
export default TextSpeechSuite;
