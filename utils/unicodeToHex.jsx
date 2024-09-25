const unicodeToHex = (text) => {
  const hexes = [];

  for (let i = 0; i < text.length; i++) {
    const hex = text.charCodeAt(i).toString(16);
    hexes.push('0x' + hex);
  }

  return hexes.join(' ');
};

export default unicodeToHex;
