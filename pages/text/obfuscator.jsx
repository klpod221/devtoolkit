import React from "react";
import _ from "lodash";

import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MyInput from "@components/MyInput";
import MyCheckbox from "@components/MyCheckbox";

const StringObfuscator = () => {
  const [input, setInput] = React.useState("Lorem ipsum dolor sit amet");
  const [settings, setSettings] = React.useState({
    first: 4,
    last: 4,
    space: true,
  });

  const [output, setOutput] = React.useState("");

  const handleTransform = React.useMemo(
    () =>
      _.debounce(() => {
        const firstCount = Math.max(0, parseInt(settings.first, 10) || 0);
        const lastCount = Math.max(0, parseInt(settings.last, 10) || 0);

        const first = input.slice(0, firstCount);
        const last = lastCount > 0 ? input.slice(-lastCount) : "";

        const middleLen = Math.max(0, input.length - firstCount - lastCount);
        const middle = settings.space
          ? input.slice(firstCount, lastCount > 0 ? -lastCount : input.length).replace(/\S/g, "*")
          : "*".repeat(middleLen);

        setOutput(`${first}${middle}${last}`);
      }, 300),
    [input, settings],
  );

  React.useEffect(() => {
    handleTransform();
  }, [input, settings, handleTransform]);

  return (
    <MyCard className="w-full max-w-5xl">
      <MyTextarea label="Input" value={input} onChange={setInput} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MyInput
          label="Keep first"
          type="number"
          min="0"
          value={settings.first}
          onChange={(value) =>
            setSettings((prev) => ({ ...prev, first: value }))
          }
        />

        <MyInput
          label="Keep last"
          type="number"
          min="0"
          value={settings.last}
          onChange={(value) =>
            setSettings((prev) => ({ ...prev, last: value }))
          }
        />
      </div>

      <MyCheckbox
        label="Keep space"
        checked={settings.space}
        onChange={(e) => setSettings((prev) => ({ ...prev, space: e.target.checked }))}
      />

      <MyTextarea label="Output" value={output} readOnly />
    </MyCard>
  );
};

StringObfuscator.title = "String Obfuscator";
export default StringObfuscator;
