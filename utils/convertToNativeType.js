const convertToNativeType = (value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (trimmed === "") return value;

  const number = Number(trimmed);
  if (!isNaN(number)) {
    return number;
  }

  const lower = trimmed.toLowerCase();
  if (lower === "true") {
    return true;
  } else if (lower === "false") {
    return false;
  }

  return value;
};

export default convertToNativeType;
