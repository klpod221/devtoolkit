import textSimplifier from "./textSimplifier";

const convertTextCase = (text, caseType) => {
  if (text.trim() === "") return "";

  const lines = text.split("\n");

  return lines
    .map((line) => {
      switch (caseType) {
        case "lowercase":
          return line.toLowerCase();

        case "uppercase":
          return line.toUpperCase();

        case "capitalize":
          return line
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());

        case "camelCase":
          return textSimplifier(line)
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (char, index) =>
              index === 0 ? char.toLowerCase() : char.toUpperCase()
            )
            .replace(/\s+/g, "");

        case "pascalCase":
          return textSimplifier(line)
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (char) => char.toUpperCase())
            .replace(/\s+/g, "");

        case "snake_case":
          return textSimplifier(line)
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "_");

        case "kebab-case":
          return textSimplifier(line)
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "-");

        default:
          return line;
      }
    })
    .join("\n");
};

export default convertTextCase;
