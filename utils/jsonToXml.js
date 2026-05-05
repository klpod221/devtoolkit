import { json2xml } from "xml-js";

const jsonToXml = (json) => {
  const xml = json2xml(json, { compact: true, spaces: 4 });
  return xml;
};

export default jsonToXml;
