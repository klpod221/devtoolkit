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

const natoAlphabetConverter = (text) => {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        return NATO_ALPHABET[char.toUpperCase().charCodeAt(0) - 65];
      }
      return char;
    })
    .join(" ");
};

export default natoAlphabetConverter;
