const textToBinary = (text, separator = " ") => {
  return text
    .trim()
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(separator);
};

const binaryToText = (binary) => {
  const cleanedBinary = binary.replace(/[^01]/g, "");

  // if (cleanedBinary.length % 8) {
  //   throw new Error("Invalid binary string");
  // }

  return cleanedBinary
    .split(/(\d{8})/)
    .filter(Boolean)
    .map((binary) => String.fromCharCode(Number.parseInt(binary, 2)))
    .join("");
};

export { textToBinary, binaryToText };
