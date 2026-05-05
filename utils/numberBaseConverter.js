const numberBaseConverter = (value, from, to) => {
  const range =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split(
      "",
    );
  const fromRange = range.slice(0, from);
  const toRange = range.slice(0, to);

  value = value.toString().trim();

  if (!value) {
    throw new Error("Value is required.");
  }

  let decimal = value
    .toString()
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      if (!fromRange.includes(digit)) {
        throw new Error(`Invalid digit "${digit}" for base ${from}.`);
      }

      return (acc +=
        BigInt(fromRange.indexOf(digit)) * BigInt(from) ** BigInt(index));
    }, 0n);

  let converted = "";
  while (decimal > 0) {
    converted = toRange[Number(decimal % BigInt(to))] + converted;
    decimal = (decimal - (decimal % BigInt(to))) / BigInt(to);
  }

  return converted || "0";
};

export default numberBaseConverter;
