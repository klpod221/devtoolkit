import React from "react";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";
import MyInput from "@components/MyInput";
import MyColorPicker from "@components/MyColorPicker";
import MySwitch from "@components/MySwitch";
import MyTextarea from "@components/MyTextarea";
import MyImage from "@components/MyImage";

const SVGPlaceholderGenerator = () => {
  const [input, setInput] = React.useState({
    width: 200,
    height: 200,
    bgColor: "#f3f4f6",
    textColor: "#d1d5db",
    text: "",
    fontSize: 16,
    useExactSize: false,
  });

  const [output, setOutput] = React.useState({
    svg: "",
    base64: "",
  });

  React.useEffect(() => {
    const { width, height, bgColor, textColor, text, fontSize, useExactSize } =
      input;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" ${useExactSize ? 'width="' + width + '" height="' + height + '"': ''}>
  <rect width="${width}" height="${height}" fill="${bgColor}"></rect>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${fontSize}px" fill="${textColor}">
    ${text || `${width}x${height}`}
  </text>
</svg>`;

    const base64 = "data:image/svg+xml;base64," + btoa(svg);
    setOutput({ svg, base64 });
  }, [input]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Generate SVG placeholders with custom dimensions and colors."
        />

        <div className="grid grid-cols-2 gap-4">
          <MyInput
            label="Width (px)"
            type="number"
            value={input.width}
            onChange={(value) => setInput({ ...input, width: value })}
            placeholder="Enter width"
          />

          <MyInput
            label="Height (px)"
            type="number"
            value={input.height}
            onChange={(value) => setInput({ ...input, height: value })}
            placeholder="Enter height"
          />

          <MyColorPicker
            label="Background color"
            value={input.bgColor}
            onChange={(value) => setInput({ ...input, bgColor: value })}
          />

          <MyColorPicker
            label="Text color"
            value={input.textColor}
            onChange={(value) => setInput({ ...input, textColor: value })}
          />

          <MyInput
            label="Custom Text"
            placeholder="Default is width x height"
            value={input.text}
            onChange={(value) => setInput({ ...input, text: value })}
          />

          <MyInput
            label="Font size (px)"
            type="number"
            placeholder="Enter font size"
            value={input.fontSize}
            onChange={(value) => setInput({ ...input, fontSize: value })}
          />

          <MySwitch
            label="Use exact size"
            checked={input.useExactSize}
            onChange={(value) => setInput({ ...input, useExactSize: value })}
          />
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Output"
          helper="This is the result of your input."
        />

        <MyTextarea label="SVG" value={output.svg} rows="7" readOnly />

        <MyTextarea label="Base64" value={output.base64} rows="5" readOnly />

        <MyImage src={output.base64} alt="SVG Placeholder" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

SVGPlaceholderGenerator.title = "SVG Placeholder Generator";
export default SVGPlaceholderGenerator;
