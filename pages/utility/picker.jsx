import React, { useState, useMemo } from "react";
import MyCard from "@components/MyCard";
import MyColorPicker from "@components/MyColorPicker";
import ObjectOutput from "@components/ObjectOutput";
import Color from "color";

const ColorPickerPage = () => {
  const [color, setColor] = useState("#3B82F6");

  const data = useMemo(() => {
    try {
      const c = Color(color);
      return {
        hex: color.toUpperCase(),
        rgb: c.rgb().string(),
        hsl: c.hsl().string(),
        hsv: c.hsv().string(),
        cmyk: c.cmyk().round().string(),
        luminance: c.luminance().toFixed(2),
        isDark: c.isDark() ? "Yes" : "No",
      };
    } catch (e) {
      return null;
    }
  }, [color]);

  return (
    <div className="flex flex-col items-center">
      <MyCard className="w-full max-w-2xl">
        <MyCard.Header 
          title="Advanced Color Picker" 
          helper="Select a color and get detailed information and conversions."
        />

        <div className="space-y-8">
          <div className="flex flex-col items-center py-4">
            <MyColorPicker
              label="Color Selector"
              value={color}
              onChange={setColor}
            />
            
            <div 
              className="mt-8 w-full h-32 rounded-2xl shadow-inner border-4 border-white dark:border-dark-secondary"
              style={{ backgroundColor: color }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-lg border dark:border-dark-secondary flex flex-col items-center">
                <span className="text-xs text-gray-500 mb-2 uppercase tracking-tighter">Foreground Preview</span>
                <span className="text-3xl font-bold" style={{ color: color }}>AaBbCc</span>
             </div>
             <div className="p-4 rounded-lg border dark:border-dark-secondary flex flex-col items-center" style={{ backgroundColor: color }}>
                <span className="text-xs opacity-70 mb-2 uppercase tracking-tighter" style={{ color: Color(color).isDark() ? 'white' : 'black' }}>Background Preview</span>
                <span className="text-3xl font-bold" style={{ color: Color(color).isDark() ? 'white' : 'black' }}>AaBbCc</span>
             </div>
          </div>

          <hr className="border-gray-200 dark:border-dark-secondary" />

          <MyCard.Header title="Color Details" />
          {data && <ObjectOutput data={data} />}
        </div>
      </MyCard>
    </div>
  );
};

ColorPickerPage.title = "Color Picker";
export default ColorPickerPage;
