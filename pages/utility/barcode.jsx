import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import MyCheckbox from "@components/MyCheckbox";
import TwoColumn from "@components/TwoColumn";
import { AiOutlineDownload } from "react-icons/ai";

const BarcodeGenerator = () => {
  const [value, setValue] = useState("klpod221");
  const [format, setFormat] = useState("CODE128");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [background, setBackground] = useState("#ffffff");
  const [lineColor, setLineColor] = useState("#000000");
  const [error, setError] = useState(false);
  
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && value) {
      try {
        setError(false);
        JsBarcode(barcodeRef.current, value, {
          format,
          width: parseInt(width) || 2,
          height: parseInt(height) || 100,
          displayValue,
          background,
          lineColor,
          margin: 10
        });
      } catch (err) {
        setError(true);
        // Clear canvas on error
        const canvas = barcodeRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, [value, format, width, height, displayValue, background, lineColor]);

  const handleDownload = () => {
    if (barcodeRef.current && !error) {
      const url = barcodeRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `barcode-${value}.png`;
      a.click();
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Barcode Configuration" helper="Enter values to generate a barcode" />
        <div className="space-y-4 mt-4">
          <MyInput label="Barcode Value" value={value} onChange={(val) => setValue(val)} />
          <MySelect label="Format" value={format} onChange={(val) => setFormat(val)}>
            <option value="CODE128">CODE128</option>
            <option value="CODE39">CODE39</option>
            <option value="EAN13">EAN13</option>
            <option value="EAN8">EAN8</option>
            <option value="UPC">UPC</option>
            <option value="ITF14">ITF14</option>
            <option value="MSI">MSI</option>
            <option value="pharmacode">Pharmacode</option>
          </MySelect>
          <div className="grid grid-cols-2 gap-4">
            <MyInput label="Width (px)" type="number" value={width} onChange={(val) => setWidth(val)} />
            <MyInput label="Height (px)" type="number" value={height} onChange={(val) => setHeight(val)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MyInput label="Background" type="color" value={background} onChange={(val) => setBackground(val)} />
            <MyInput label="Line Color" type="color" value={lineColor} onChange={(val) => setLineColor(val)} />
          </div>
          <MyCheckbox id="displayValue" label="Display Value" checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} />
        </div>
      </TwoColumn.Left>
      
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated Barcode image" />
        <div className="space-y-4 mt-4">
          <div className="flex flex-col items-center justify-center min-h-[300px] border border-gray-200 dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-dark-secondary">
            {error && <p className="text-red-500 mb-4">Invalid value for this barcode format</p>}
            <canvas ref={barcodeRef} className={`max-w-full bg-white ${error ? "hidden" : ""}`}></canvas>
          </div>
          <MyButton className="w-full flex items-center justify-center space-x-2" onClick={handleDownload} disabled={error}>
            <AiOutlineDownload />
            <span>Download PNG</span>
          </MyButton>
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

BarcodeGenerator.title = "Barcode Generator";
export default BarcodeGenerator;
