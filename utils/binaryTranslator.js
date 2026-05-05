const baseValues = {
  binary: 2,
  octal: 8,
  decimal: 10,
  hex: 16,
};

const textToBinary = (input, base) => {
  return input
    .split("")
    .map((char) => {
      const binary = char.charCodeAt(0).toString(base);
      return base === 2 ? "0".repeat(8 - binary.length) + binary : binary;
    })
    .join(" ");
};

const binaryToText = (input, base) => {
  return input
    .split(" ")
    .map((binary) => String.fromCharCode(parseInt(binary, base)))
    .join("");
};

const binaryToBinary = (input, from, to) => {
  return input
    .split(" ")
    .map((binary) => parseInt(binary, from).toString(to))
    .join(" ");
};

const checkInput = (input, base) => {
  if (input === "") {
    throw new Error("Input is empty");
  }

  const invalidChars = input
    .toLowerCase()
    .replace(/\s+/g, " ")
    .split("")
    .filter((char) => char !== " " && isNaN(parseInt(char, base)))
    .filter((char, index, self) => self.indexOf(char) === index);

  if (invalidChars.length > 0) {
    throw new Error(`Invalid characters: ${invalidChars.join(", ")}.`);
  }
};

const binaryTranslator = (from, to, input) => {
  if (from !== "text") {
    checkInput(input, baseValues[from]);
  }

  if (from === to) {
    return input;
  }

  if (from === "text") {
    return textToBinary(input, baseValues[to]);
  } else if (to === "text") {
    return binaryToText(input, baseValues[from]);
  } else {
    return binaryToBinary(input, baseValues[from], baseValues[to]);
  }
};

export default binaryTranslator;
