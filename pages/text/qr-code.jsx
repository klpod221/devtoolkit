import React from "react";
import QRCode from "qrcode";

import debounce from "@utils/debounce";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";
import MyImage from "@components/MyImage";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyColorPicker from "@components/MyColorPicker";

const errorCorrectionLevels = ["L", "M", "Q", "H"];

const QRCodeGenerator = () => {
  const [input, setInput] = React.useState("https://devtools.klpod221.site/");
  const [qrCode, setQRCode] = React.useState(null);
  const [options, setOptions] = React.useState({
    width: 500,
    margin: 1,
    errorCorrectionLevel: "H",
    type: "image/png",
    quality: 1,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(input, options);
        setQRCode(url);
      } catch (error) {
        console.error(error);
      }
    };

    generateQRCode();
  }, [input, options]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter the text to generate QR code"
        />

        <MyCodeEditor language="text" value={input} onChange={setInput} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="QR Code" />

        <div className="flex items-center flex-wrap gap-4">
          <MyInput
            label="Width"
            type="number"
            value={options.width}
            onChange={(value) => setOptions({ ...options, width: value })}
            max={1000}
            min={1}
          />

          <MyInput
            label="Margin"
            type="number"
            value={options.margin}
            onChange={(value) => setOptions({ ...options, margin: value })}
            max={100}
            min={0}
          />

          <MySelect
            label="Correction Level"
            value={options.errorCorrectionLevel}
            sizing="md"
            onChange={(value) =>
              setOptions({ ...options, errorCorrectionLevel: value })
            }
          >
            {errorCorrectionLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </MySelect>

          <MyInput
            label="Quality"
            type="number"
            value={options.quality}
            onChange={(value) => setOptions({ ...options, quality: value })}
            max={1}
            min={0}
            step={0.1}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <MyColorPicker
            label="QR Color"
            value={options.color.dark}
            onChange={(value) =>
              setOptions({
                ...options,
                color: { ...options.color, dark: value },
              })
            }
          />

          <MyColorPicker
            label="Background Color"
            value={options.color.light}
            onChange={(value) =>
              setOptions({
                ...options,
                color: { ...options.color, light: value },
              })
            }
          />
        </div>

        {qrCode && <MyImage src={qrCode} alt="QR Code" />}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

QRCodeGenerator.title = "QR Code Generator";
export default QRCodeGenerator;
