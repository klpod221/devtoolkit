import React from "react";
import _ from "lodash";

import qrCodeGenerator from "@utils/qrCodeGenerator";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";
import MyImage from "@components/MyImage";
import MySelect from "@components/MySelect";
import MyColorPicker from "@components/MyColorPicker";
import MyRangeSlider from "@components/MyRangeSlider";

const errorCorrectionLevels = ["L", "M", "Q", "H"];

const QRCodeGenerator = () => {
  const [input, setInput] = React.useState("https://devtools.klpod221.site/");
  const [qrCode, setQRCode] = React.useState(null);
  const [options, setOptions] = React.useState({
    width: 500,
    margin: 1,
    errorCorrectionLevel: "M",
    type: "image/png",
    quality: 1,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  const generateQRCode = React.useMemo(
    () =>
      _.debounce(async (input, options) => {
        try {
          const url = await qrCodeGenerator(input, options);
          setQRCode(url);
        } catch (error) {
          console.error(error);
        }
      }, 500),
    [],
  );

  React.useEffect(() => {
    generateQRCode(input, options);
  }, [input, options, generateQRCode]);

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
        <MyCard.Header title="Output" helper="QR Code with custom options" />

        <div className="overflow-y-auto">
          <div className="flex flex-col gap-2 w-full">
            <MyRangeSlider
              label="Width"
              value={options.width}
              onChange={(value) => setOptions({ ...options, width: value })}
              max={1000}
              min={150}
            />

            <MyRangeSlider
              label="Margin"
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

          <div className="flex flex-col justify-center items-center gap-2 w-full mt-2">
            {qrCode && <MyImage src={qrCode} alt="QR Code" />}
          </div>
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

QRCodeGenerator.title = "QR Code Generator";
export default QRCodeGenerator;
