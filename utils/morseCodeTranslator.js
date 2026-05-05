const morseCodeDictionary = {
  // letters
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  // digits
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  // Punctuation marks
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  // Accented letters
  À: ".--.-",
  Å: ".--.-",
  Ä: ".-.-",
  Æ: ".-.-",
  Ą: ".-.-",
  Ç: "-.-..",
  Ĉ: "-.-..",
  Ç: "-.-..",
  Ch: "----",
  Ĥ: "----",
  Š: "----",
  Ð: "..--.",
  È: ".-..-",
  É: "..-..",
  Ê: "-..-.",
  Ë: "..-..",
  Ĝ: "--.-.",
  Ĥ: "----",
  Ĵ: ".---.",
  Ł: ".-..-",
  Ń: "--.--",
  Ñ: "--.--",
  Ó: "---.",
  Ô: "---.",
  Ö: "---.",
  Ø: "---.",
  Œ: "---.",
  Ś: "...-...",
  Þ: ".--..",
  Ü: "..--",
  Ŭ: "..--",
  Ź: "--..-.",
  Ż: "--..-",
  // space
  " ": "/",
};

const reverseMorseCodeDictionary = Object.fromEntries(
  Object.entries(morseCodeDictionary).map(([key, value]) => [value, key]),
);

const checkText = (text) => {
  if (typeof text !== "string") {
    throw new Error("Text must be a string!");
  }

  if (text.length === 0) {
    throw new Error("Text must not be empty!");
  }

  // Check if text contains only valid characters from the dictionary
  const invalidChars = text
    .split("")
    .filter((char) => morseCodeDictionary[char.toUpperCase()] === undefined);

  if (invalidChars.length > 0) {
    throw new Error(
      `Text contains invalid characters: ${invalidChars.join(", ")}`,
    );
  }

  return true;
};

const checkMorseCode = (morseCode) => {
  if (typeof morseCode !== "string") {
    throw new Error("Morse code must be a string!");
  }

  if (morseCode.length === 0) {
    throw new Error("Morse code must not be empty!");
  }

  const invalidChars = morseCode
    .split("")
    .filter((char) => !/[./\s-]/.test(char));

  if (invalidChars.length > 0) {
    throw new Error(
      `Morse code contains invalid characters: ${invalidChars.join(", ")}`,
    );
  }

  return true;
};

const textToMorse = (text) => {
  checkText(text);

  return text
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase()
    .split("")
    .map((char) => morseCodeDictionary[char])
    .join(" ");
};

const morseToText = (morseCode) => {
  checkMorseCode(morseCode);

  return morseCode
    .trim()
    .split(" ")
    .map((code) => {
      return reverseMorseCodeDictionary[code] || code;
    })
    .join("");
};

const FREQUENCY = 550;

const DOT_DURATION = 60;
const DASH_DURATION = DOT_DURATION * 3;

const SYMBOL_BREAK_DURATION = DOT_DURATION;
const LETTER_BREAK_DURATION = DOT_DURATION * 3;
const WORD_BREAK_DURATION = DOT_DURATION * 7;

let noteContext = null;
let noteNode = null;
let gainNode = null;
let audioContextInitialized = false;

const initAudioContext = () => {
  if (audioContextInitialized) {
    return;
  }

  noteContext = new (window.AudioContext || window.webkitAudioContext)();
  noteNode = noteContext.createOscillator();
  gainNode = noteContext.createGain();

  noteNode.frequency.value = FREQUENCY.toFixed(2);
  gainNode.gain.value = 0;
  noteNode.connect(gainNode);
  gainNode.connect(noteContext.destination);
  noteNode.start();

  audioContextInitialized = true;
};

const startNotePlaying = () => {
  gainNode.gain.setTargetAtTime(0.1, 0, 0.001);
};

const stopNotePlaying = () => {
  gainNode.gain.setTargetAtTime(0, 0, 0.001);
};

const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms));

const playDot = async () => {
  startNotePlaying();
  await sleep(DOT_DURATION);
  stopNotePlaying();
};

const playDash = async () => {
  startNotePlaying();
  await sleep(DASH_DURATION);
  stopNotePlaying();
};

const playLetter = async (letter) => {
  if (!audioContextInitialized) {
    initAudioContext();
  }

  for (let i = 0; i < letter.length; i++) {
    if (letter[i] === ".") {
      await playDot();
    } else if (letter[i] === "-") {
      await playDash();
    }
    await sleep(SYMBOL_BREAK_DURATION);
  }
};

const playWord = async (word) => {
  for (let i = 0; i < word.length; i++) {
    await playLetter(word[i]);
    await sleep(LETTER_BREAK_DURATION);
  }
};

const playMorseCode = async (morseCode) => {
  const words = morseCode.trim().split("/");
  for (let i = 0; i < words.length; i++) {
    await playWord(words[i]);
    await sleep(WORD_BREAK_DURATION);
  }
};

export {
  morseToText,
  textToMorse,
  playMorseCode,
  checkText,
  checkMorseCode,
  morseCodeDictionary,
};
