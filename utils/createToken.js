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

  if (!alphabet || length <= 0) return "";

  const tokenLength = Number(length) || 0;
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const bytes = new Uint32Array(tokenLength);
    window.crypto.getRandomValues(bytes);
    let result = "";
    for (let i = 0; i < tokenLength; i++) {
      result += alphabet[bytes[i] % alphabet.length];
    }
    return result;
  }

  let result = "";
  for (let i = 0; i < tokenLength; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
};

export default createToken;
