const random = () => {
  return Math.random();
};

const randomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArrayMutate = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const shuffleArray = (array) => {
  const newArray = [...array];
  shuffleArrayMutate(newArray);
  return newArray;
};

const shuffleString = (string, delimiter = "") => {
  return shuffleArray(string.split(delimiter)).join(delimiter);
};

export {
  random,
  randomFromArray,
  randomIntFromInterval,
  shuffleArray,
  shuffleString,
};
