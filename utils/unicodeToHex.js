const unicodeToHex = (text) => {
  if (!text) return "";
  const hexes = [];

  for (const char of text) {
    const codePoint = char.codePointAt(0);
    hexes.push("0x" + codePoint.toString(16));
  }

  return hexes.join(" ");
};

export default unicodeToHex;
