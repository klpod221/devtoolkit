import { parse } from "yaml";
import formatJs from "@utils/formatJs";

const yamlToJson = (yaml) => {
  const json = formatJs(JSON.stringify(parse(yaml)));
  return json;
};

export default yamlToJson;
