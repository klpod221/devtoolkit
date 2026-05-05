import { xml2json } from "xml-js";
import convertToNativeType from "@utils/convertToNativeType";

const xmlToJson = (xml) => {
  const json = xml2json(xml, {
    compact: true,
    spaces: 4,
    trim: true,
    textFn: (value, parentElement) => {
      try {
        const keyNo = Object.keys(parentElement._parent).length;
        const keyName = Object.keys(parentElement._parent)[keyNo - 1];

        if (parentElement._attributes) {
          const attributes = {};

          Object.entries(parentElement._attributes).forEach(
            ([attribute, value]) => {
              if (attributes[attribute] === undefined) {
                attributes[attribute] = convertToNativeType(value);
              }
            }
          );

          parentElement._parent[keyName] = {
            _value: convertToNativeType(value),
            _attributes: attributes,
          };
        } else {
          parentElement._parent[keyName] = convertToNativeType(value);
        }
      } catch (error) {
        // do nothing
      }
    },
  });

  return json;
};

export default xmlToJson;
