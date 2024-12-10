import { shuffleString } from "./random";

const createToken = ({
  length = 64,
  dictionary,
  withUpperCase = true,
  withLowerCase = true,
  withNumbers = true,
  withSymbols = false,
}) => {
  const alphabet =
    dictionary ??
    [
      withUpperCase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      withLowerCase ? "abcdefghijklmnopqrstuvwxyz" : "",
      withNumbers ? "0123456789" : "",
      withSymbols ? ".,;:!?./-\"'#{([-|\\@)]=}*+" : "",
    ].join("");

  return shuffleString(alphabet.repeat(length)).substring(0, length);
};

export default createToken;
