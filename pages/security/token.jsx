import React from "react";
import _ from "lodash";

import createToken from "@utils/createToken";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCheckbox from "@components/MyCheckbox";
import MyButton from "@components/MyButton";
import MyRangeSlider from "@components/MyRangeSlider";
import CodeOutput from "@components/CodeOutput";

import { FaSyncAlt } from "react-icons/fa";

const TokenGenerator = () => {
  const [token, setToken] = React.useState("");
  const [options, setOptions] = React.useState({
    length: 64,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const generateToken = React.useMemo(
    () =>
      _.debounce(() => {
        setToken(
          createToken({
            length: options.length,
            withUpperCase: options.uppercase,
            withLowerCase: options.lowercase,
            withNumbers: options.numbers,
            withSymbols: options.symbols,
          }),
        );
      }, 200),
    [options],
  );

  React.useEffect(() => {
    generateToken();
  }, [generateToken]);

  const set = (key) => (e) =>
    setOptions((prev) => ({ ...prev, [key]: e.target.checked }));

  return (
    <TwoColumn leftWidth="40">
      <TwoColumn.Left>
        <MyCard.Header
          title="Configuration"
          helper="Configure the token generation options."
        >
          <MyButton onClick={generateToken}>
            <FaSyncAlt className="mr-2" /> Regenerate
          </MyButton>
        </MyCard.Header>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Token Length: {options.length}
          </label>
          <MyRangeSlider
            min={8}
            max={128}
            step={1}
            value={options.length}
            onChange={(value) => setOptions((prev) => ({ ...prev, length: value }))}
          />
        </div>

        <div className="space-y-3">
          <MyCheckbox
            label="Uppercase (A-Z)"
            checked={options.uppercase}
            onChange={set("uppercase")}
          />
          <MyCheckbox
            label="Lowercase (a-z)"
            checked={options.lowercase}
            onChange={set("lowercase")}
          />
          <MyCheckbox
            label="Numbers (0-9)"
            checked={options.numbers}
            onChange={set("numbers")}
          />
          <MyCheckbox
            label="Symbols (.,; etc.)"
            checked={options.symbols}
            onChange={set("symbols")}
          />
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Your generated token." />
        <CodeOutput output={token} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

TokenGenerator.title = "Token Generator";
export default TokenGenerator;
