const convertToNativeType = (value) => {
  const number = Number(value);
  if (!isNaN(number)) {
    return number;
  }

  const boolean = value.toLowerCase();
  if (boolean === "true") {
    return true;
  } else if (boolean === "false") {
    return false;
  }

  return value;
};

export default convertToNativeType;
