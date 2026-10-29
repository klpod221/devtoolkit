const splitIntoWords = (str) => {
  if (!str) return [];
  return str
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
};

const convertTextCase = (text, caseType) => {
  if (!text || text.trim() === "") return "";

  const lines = text.split("\n");

  return lines
    .map((line) => {
      const words = splitIntoWords(line);

      switch (caseType) {
        case "lowercase":
          return line.toLowerCase();

        case "uppercase":
          return line.toUpperCase();

        case "capitalize":
          return words
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");

        case "camelCase":
          return words
            .map((w, index) =>
              index === 0
                ? w.toLowerCase()
                : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            )
            .join("");

        case "pascalCase":
          return words
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join("");

        case "snake_case":
          return words.map((w) => w.toLowerCase()).join("_");

        case "kebab-case":
          return words.map((w) => w.toLowerCase()).join("-");

        default:
          return line;
      }
    })
    .join("\n");
};

export default convertTextCase;
