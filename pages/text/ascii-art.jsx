import React from "react";
import _ from "lodash";
import figlet from "figlet";

import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import MyInput from "@components/MyInput";
import CodeOutput from "@components/CodeOutput";

import ASCII_FONTS from "@constants/ascii_fonts";

const TextToASCIIArt = () => {
  const [text, setText] = React.useState("");
  const [asciiArt, setAsciiArt] = React.useState("");

  const [options, setOptions] = React.useState({
    font: "Standard",
    width: 80,
  });

  const generateASCIIArt = React.useMemo(
    () =>
      _.debounce((text, options) => {
        figlet.text(
          text,
          {
            font: options.font,
            width: options.width,
            whitespaceBreak: true,
          },
          (err, data) => {
            if (err) {
              setAsciiArt(err.message);
            } else {
              setAsciiArt(data);
            }
          },
        );
      }, 200),
    [],
  );

  React.useEffect(() => {
    figlet.defaults({ fontPath: "//unpkg.com/figlet@1.8.0/fonts/" });

    console.log(ASCII_FONTS.length);
  }, []);

  React.useEffect(() => {
    generateASCIIArt(text, options);
  }, [text, options, generateASCIIArt]);

  return (
    <MyCard>
      <MyTextarea label="Your text" value={text} onChange={setText} />

      <hr className="d-block border-t border-gray-200 dark:border-gray-600" />

      <div className="flex space-x-4 mx-auto">
        <MySelect
          label="Font"
          sizing="md"
          value={options.font}
          onChange={(value) => setOptions({ ...options, font: value })}
        >
          {ASCII_FONTS.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </MySelect>

        <MyInput
          label="Width"
          type="number"
          value={options.width}
          onChange={(value) => setOptions({ ...options, width: value })}
        />
      </div>

      <hr className="d-block border-t border-gray-200 dark:border-gray-600" />

      <CodeOutput output={asciiArt} />
    </MyCard>
  );
};

TextToASCIIArt.title = "Text to ASCII Art";
export default TextToASCIIArt;
