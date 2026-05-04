import React from "react";
import _ from "lodash";
import figlet from "figlet";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import MyInput from "@components/MyInput";
import MyButton from "@components/MyButton";
import CodeOutput from "@components/CodeOutput";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ASCII_FONTS from "@constants/ascii_fonts";

const TextToASCIIArt = () => {
  const [text, setText] = React.useState("klpod221");
  const [asciiArt, setAsciiArt] = React.useState("");

  const [options, setOptions] = React.useState({
    font: "Standard",
    width: 80,
  });

  const fontIndex = ASCII_FONTS.indexOf(options.font);

  const prevFont = () => {
    const idx = fontIndex <= 0 ? ASCII_FONTS.length - 1 : fontIndex - 1;
    setOptions((prev) => ({ ...prev, font: ASCII_FONTS[idx] }));
  };

  const nextFont = () => {
    const idx = fontIndex >= ASCII_FONTS.length - 1 ? 0 : fontIndex + 1;
    setOptions((prev) => ({ ...prev, font: ASCII_FONTS[idx] }));
  };

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
    figlet.defaults({ fontPath: "/figlet-fonts/" });
  }, []);

  React.useEffect(() => {
    generateASCIIArt(text, options);
  }, [text, options, generateASCIIArt]);

  return (
    <TwoColumn leftWidth="35">
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter text and select a font to generate ASCII art."
        />

        <MyTextarea
          label="Your text"
          value={text}
          onChange={setText}
          rows={4}
          placeholder="Type something..."
        />

        <MyInput
          label="Width"
          type="number"
          value={options.width}
          onChange={(value) => setOptions((prev) => ({ ...prev, width: value }))}
        />

        {/* Font Selector with Prev/Next */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Font{" "}
            <span className="text-gray-400 font-normal">
              ({fontIndex + 1} / {ASCII_FONTS.length})
            </span>
          </label>

          <div className="flex items-center gap-2">
            <MyButton color="light" onClick={prevFont} title="Previous font" className="shrink-0 px-2">
              <FaChevronLeft className="w-3 h-3" />
            </MyButton>

            <div className="flex-1 min-w-0">
              <MySelect
                value={options.font}
                onChange={(value) => setOptions((prev) => ({ ...prev, font: value }))}
              >
                {ASCII_FONTS.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </MySelect>
            </div>

            <MyButton color="light" onClick={nextFont} title="Next font" className="shrink-0 px-2">
              <FaChevronRight className="w-3 h-3" />
            </MyButton>
          </div>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Preview of your ASCII art." />
        <CodeOutput output={asciiArt} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

TextToASCIIArt.title = "Text to ASCII Art";
export default TextToASCIIArt;
