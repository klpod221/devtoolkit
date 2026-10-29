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

  const isNegative = value.startsWith("-");
  let cleanValue = isNegative ? value.slice(1) : value;

  if (from <= 36) {
    cleanValue = cleanValue.toLowerCase();
  }

  let decimal = cleanValue
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      if (!fromRange.includes(digit)) {
        throw new Error(`Invalid digit "${digit}" for base ${from}.`);
      }

      return (acc +=
        BigInt(fromRange.indexOf(digit)) * BigInt(from) ** BigInt(index));
    }, 0n);

  if (decimal === 0n) return "0";

  let converted = "";
  while (decimal > 0n) {
    converted = toRange[Number(decimal % BigInt(to))] + converted;
    decimal = decimal / BigInt(to);
  }

  const res = converted || "0";
  return isNegative && res !== "0" ? "-" + res : res;
};

export default numberBaseConverter;
