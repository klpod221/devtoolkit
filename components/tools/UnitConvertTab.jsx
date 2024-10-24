import React from "react";

import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";

const UnitConvertTab = ({ tab }) => {
  const { title, units } = tab;

  const [input, setInput] = React.useState(1);
  const [fromUnit, setFromUnit] = React.useState(units[0].value);

  const [output, setOutput] = React.useState();
  const [toUnit, setToUnit] = React.useState(units[1].value);

  React.useEffect(() => {
    const fromUnitObj = units.find((unit) => unit.value === fromUnit);
    const toUnitObj = units.find((unit) => unit.value === toUnit);

    let result = 0;

    switch (title) {
      case "Temperature":
        result = Number(input) * fromUnitObj.ratio + toUnitObj.ratio;
        break;
      default:
        result = (Number(input) * fromUnitObj.ratio) / toUnitObj.ratio;
        break;
    }
    
    if (Number.isInteger(result)) {
      setOutput(result);
    } else {
      setOutput(result.toFixed(6).replace(/\.?0*$/, ""));
    }
  }, [input, fromUnit, toUnit, tab.units, units, title]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <MyInput
            type="number"
            label="From Value"
            value={input}
            onChange={setInput}
          />

          <MySelect
            label="From Unit"
            sizing="md"
            value={fromUnit}
            onChange={setFromUnit}
          >
            {units.map((unit, index) => (
              <option key={index} value={unit.value}>
                {unit.title + " (" + unit.value + ")"}
              </option>
            ))}
          </MySelect>
        </div>

        <div className="space-y-4">
          <MyInput type="text" label="To Value" value={output} />

          <MySelect
            label="To Unit"
            sizing="md"
            value={toUnit}
            onChange={setToUnit}
          >
            {tab.units.map((unit, index) => (
              <option key={index} value={unit.value}>
                {unit.title + " (" + unit.value + ")"}
              </option>
            ))}
          </MySelect>
        </div>
      </div>
    </>
  );
};

export default UnitConvertTab;
