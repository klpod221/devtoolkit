import React from "react";

import numberBaseConverter from "@utils/numberBaseConverter";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyRangeSlider from "@components/MyRangeSlider";
import ObjectOutput from "@components/ObjectOutput";

const NumberBaseConverter = () => {
  const [number, setNumber] = React.useState(10);
  const [base, setBase] = React.useState(10);

  const [customOutputBase, setCustomOutputBase] = React.useState(42);

  const [error, setError] = React.useState(null);
  const [output, setOutput] = React.useState(null);
  const [customOutput, setCustomOutput] = React.useState(null);

  React.useEffect(() => {
    try {
      setError(null);
      setOutput({
        "base 2 (binary)": numberBaseConverter(number, base, 2),
        "base 8 (octal)": numberBaseConverter(number, base, 8),
        "base 10 (decimal)": numberBaseConverter(number, base, 10),
        "base 16 (hex)": numberBaseConverter(number, base, 16),
        "base 64": numberBaseConverter(number, base, 64),
      });
      setCustomOutput({
        [`base ${customOutputBase}`]: numberBaseConverter(
          number,
          base,
          customOutputBase,
        ),
      });
    } catch (error) {
      setError(error.message);
      setOutput(null);
    }
  }, [number, base, customOutputBase]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the number to convert" />

        <MyRangeSlider
          label="Base"
          min={2}
          max={64}
          step={1}
          value={base}
          onChange={setBase}
        />

        <MyInput
          label="Number"
          placeholder="Enter the number to convert"
          value={number}
          onChange={setNumber}
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Converted number" />

        <ObjectOutput object={output} />

        <MyRangeSlider
          label="Custom Output Base"
          min={2}
          max={64}
          step={1}
          value={customOutputBase}
          onChange={setCustomOutputBase}
        />

        <ObjectOutput object={customOutput} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

NumberBaseConverter.title = "Number Base Converter";
export default NumberBaseConverter;
