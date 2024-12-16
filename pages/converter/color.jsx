import React from "react";
import Color from "color";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyColorPicker from "@components/MyColorPicker";
import ObjectOutput from "@components/ObjectOutput";

const ColorConverter = () => {
  const [color, setColor] = React.useState("#00000020");
  const [output, setOutput] = React.useState({
    hex: "#000000",
    rgb: "rgb(0, 0, 0)",
    hsl: "hsl(0, 0%, 0%)",
    hsv: "hsv(0, 0%, 0%)",
    hwb: "hwb(0, 0%, 100%)",
    cmyk: "cmyk(0%, 0%, 0%, 100%)",
  });

  React.useEffect(() => {
    try {
      const colorObject = Color(color);

      const hsv = colorObject.hsv();
      const cmyk = colorObject.cmyk();

      setOutput({
        hex: colorObject.alpha() === 1 ? colorObject.hex() : colorObject.hexa(),
        rgb: colorObject.rgb().string(),
        hsl: colorObject.hsl().string(),
        hsv: `hsv(${Math.round(hsv.color[0])}, ${
          Math.round(hsv.color[1] * 10) / 10
        }%, ${Math.round(hsv.color[2] * 10) / 10}%${
          hsv.valpha < 1 ? `, ${hsv.valpha}` : ""
        })`,
        hwb: colorObject.hwb().string(),
        cmyk: `cmyk(${Math.round(cmyk.color[0])}%, ${
          Math.round(cmyk.color[1] * 10) / 10
        }%, ${Math.round(cmyk.color[2] * 10) / 10}%, ${
          Math.round(cmyk.color[3] * 10) / 10
        }%${cmyk.valpha < 1 ? `, ${cmyk.valpha}` : ""})`,
      });
    } catch (error) {
      setOutput({
        hex: "Invalid color",
        rgb: "Invalid color",
        hsl: "Invalid color",
        hsv: "Invalid color",
        hwb: "Invalid color",
        cmyk: "Invalid color",
      });
    }
  }, [color]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter a color code" />

        <div className="flex items-center mt-4">
          <MyColorPicker value={color} onChange={setColor} />
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Converted color code" />

        <ObjectOutput keyType="uppercase" data={output} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ColorConverter.title = "Color Converter";
export default ColorConverter;
