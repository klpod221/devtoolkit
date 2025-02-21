import React from "react";
import _ from "lodash";

import createToken from "@utils/createToken";

import MyCard from "@components/MyCard";
import MySwitch from "@components/MySwitch";
import MyButton from "@components/MyButton";
import MyRangeSlider from "@components/MyRangeSlider";
import MyTextarea from "@components/MyTextarea";

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

  return (
    <MyCard className="w-full max-w-5xl">
      <MyCard.Header title="Input Options" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MySwitch
          label="Uppercase (A-Z)"
          checked={options.uppercase}
          onChange={(value) =>
            setOptions({ ...options, uppercase: value })
          }
        />
        <MySwitch
          label="Lowercase (a-z)"
          checked={options.lowercase}
          onChange={(value) =>
            setOptions({ ...options, lowercase: value })
          }
        />
        <MySwitch
          label="Numbers (0-9)"
          checked={options.numbers}
          onChange={(value) =>
            setOptions({ ...options, numbers: value })
          }
        />
        <MySwitch
          label="Symbols (.,; etc.)"
          checked={options.symbols}
          onChange={(value) =>
            setOptions({ ...options, symbols: value })
          }
        />
      </div>

      <MyRangeSlider
        label="Token Length"
        min={8}
        max={128}
        step={1}
        value={options.length}
        onChange={(value) => setOptions({ ...options, length: value })}
      />

      <MyCard.Header title="Output" />

      <MyTextarea
        value={token}
        readOnly
        placeholder="Generated token will appear here"
      />

      <MyButton
        className="mt-4"
        onClick={generateToken}
      >
        <FaSyncAlt className="mr-2" />
        Regenerate Token
      </MyButton>
    </MyCard>
  );
};

TokenGenerator.title = "Token Generator";
export default TokenGenerator;
