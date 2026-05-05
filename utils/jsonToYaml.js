import { parse, stringify } from "yaml";

const jsonToYaml = (json) => {
  const yamlObject = parse(json);
  return stringify(yamlObject, { indent: 4 });
};

export default jsonToYaml;
