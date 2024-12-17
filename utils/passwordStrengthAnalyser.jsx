import _ from "lodash";

const prettifyExponentialNotation = (number) => {
  const [base, exponent] = number.toString().split("e");
  const baseAsNumber = Number.parseFloat(base);
  const prettyBase =
    baseAsNumber % 1 === 0
      ? baseAsNumber.toLocaleString()
      : baseAsNumber.toFixed(2);
  return exponent ? `${prettyBase}e${exponent}` : prettyBase;
};

const getHumanFriendlyDuration = (seconds) => {
  if (seconds <= 0.01) {
    return "Instantly";
  }

  if (seconds <= 1) {
    return "Less than a second";
  }

  const timeUnits = [
    {
      unit: "millennium",
      secondsInUnit: 31557600000,
      plural: "millennia",
      format: prettifyExponentialNotation,
    },
    { unit: "century", secondsInUnit: 3155760000, plural: "centuries" },
    { unit: "decade", secondsInUnit: 315576000, plural: "decades" },
    { unit: "year", secondsInUnit: 31557600, plural: "years" },
    { unit: "month", secondsInUnit: 2629800, plural: "months" },
    { unit: "week", secondsInUnit: 604800, plural: "weeks" },
    { unit: "day", secondsInUnit: 86400, plural: "days" },
    { unit: "hour", secondsInUnit: 3600, plural: "hours" },
    { unit: "minute", secondsInUnit: 60, plural: "minutes" },
    { unit: "second", secondsInUnit: 1, plural: "seconds" },
  ];

  return _.chain(timeUnits)
    .map(({ unit, secondsInUnit, plural, format = _.identity }) => {
      const quantity = Math.floor(seconds / secondsInUnit);
      seconds %= secondsInUnit;

      if (quantity <= 0) {
        return null;
      }

      const formattedQuantity = format(quantity);
      return `${formattedQuantity} ${quantity === 1 ? plural : unit}`;
    })
    .compact()
    .take(2)
    .join(", ")
    .value();
};

const getCharsetLength = (password) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialCharacter = /\W|_/.test(password);

  let length = 0;

  if (hasLowercase) {
    length += 26;
  }
  if (hasUppercase) {
    length += 26;
  }
  if (hasDigit) {
    length += 10;
  }
  if (hasSpecialCharacter) {
    length += 32;
  }

  return length;
};

const passwordStrengthAnalyser = (password) => {
  const charsetLength = getCharsetLength(password);
  const passwordLength = password.length;
  
  const entropy = password === '' ? 0 : Math.log2(Math.pow(charsetLength, passwordLength));

  const secondsToCrack = 2 ** entropy / 2e10;

  const humanFriendlyDuration = getHumanFriendlyDuration(secondsToCrack);

  const score = Math.min(entropy / 128, 1);

  return {
    entropy,
    charsetLength,
    passwordLength,
    crackDuration: humanFriendlyDuration,
    secondsToCrack,
    score,
  };
};

export default passwordStrengthAnalyser;
