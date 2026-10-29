const NATO_ALPHABET = [
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
  "India",
  "Juliet",
  "Kilo",
  "Lima",
  "Mike",
  "November",
  "Oscar",
  "Papa",
  "Quebec",
  "Romeo",
  "Sierra",
  "Tango",
  "Uniform",
  "Victor",
  "Whiskey",
  "X-ray",
  "Yankee",
  "Zulu",
];

const NATO_DIGITS = {
  "0": "Zero",
  "1": "One",
  "2": "Two",
  "3": "Three",
  "4": "Four",
  "5": "Five",
  "6": "Six",
  "7": "Seven",
  "8": "Eight",
  "9": "Niner",
};

const natoAlphabetConverter = (text) => {
  if (!text) return "";
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        return NATO_ALPHABET[char.toUpperCase().charCodeAt(0) - 65];
      }
      if (char.match(/[0-9]/)) {
        return NATO_DIGITS[char];
      }
      return char;
    })
    .join(" ");
};

export default natoAlphabetConverter;
