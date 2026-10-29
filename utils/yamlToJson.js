import { parse } from "yaml";

const yamlToJson = (yaml) => {
  if (!yaml || !yaml.trim()) return "";
  const parsed = parse(yaml);
  return JSON.stringify(parsed, null, 2);
};

export default yamlToJson;
