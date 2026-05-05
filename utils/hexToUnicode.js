const hexToUnicode = (text) => {
  const hexes = text.replace(/\s+/g, "").split("0x");

  return hexes
    .map((hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16));
      } catch (e) {
        return "";
      }
    })
    .join("");
};

export default hexToUnicode;
