const objectKeyToHumanReadable = (key) => {
  return key
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default objectKeyToHumanReadable;
