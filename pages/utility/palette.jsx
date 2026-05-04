import React, { useState } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyColorPicker from "@components/MyColorPicker";
import ObjectOutput from "@components/ObjectOutput";
import Color from "color";
import { FaArrowRight } from "react-icons/fa";

const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState("#3B82F6");

  const generatePalette = (hex) => {
    try {
      const c = Color(hex);
      return {
        "Base Color": hex,
        "Lightest": c.lighten(0.4).hex(),
        "Lighter": c.lighten(0.2).hex(),
        "Darker": c.darken(0.2).hex(),
        "Darkest": c.darken(0.4).hex(),
        "Complementary": c.rotate(180).hex(),
        "Analogous (-30°)": c.rotate(-30).hex(),
        "Analogous (+30°)": c.rotate(30).hex(),
      };
    } catch (e) {
      return {};
    }
  };

  const paletteData = generatePalette(baseColor);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Seed Color" helper="Select base color for palette">
          <MyButton onClick={() => setBaseColor("#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'))}>
            Random <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyColorPicker
          label="Base Color"
          value={baseColor}
          onChange={setBaseColor}
        />

        <div className="mt-8 space-y-4">
           <h6 className="text-sm font-bold uppercase text-gray-500">Visual Preview</h6>
           <div className="flex h-24 rounded-xl overflow-hidden shadow-lg">
              {Object.values(paletteData).map((clr, i) => (
                 <div 
                    key={i} 
                    className="flex-1 cursor-pointer hover:flex-[1.5] transition-all" 
                    style={{ backgroundColor: clr }}
                    onClick={() => setBaseColor(clr)}
                    title={clr}
                 />
              ))}
           </div>
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Palette Codes" helper="HEX codes for generated colors" />
        
        <ObjectOutput data={paletteData} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ColorPaletteGenerator.title = "Color Palette Generator";
export default ColorPaletteGenerator;
