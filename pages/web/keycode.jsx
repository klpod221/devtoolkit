import React from "react";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";
import ObjectOutput from "@components/ObjectOutput";

const KeycodeInfo = () => {
  const [keycode, setKeycode] = React.useState(null);
  const [output, setOutput] = React.useState({
    key: "",
    keycode: "",
    code: "",
    location: "",
    modifiers: "",
  });

  const handleKeyDown = (e) => {
    e.preventDefault();

    const modifierKeys = {
      ShiftKey: e.shiftKey,
      CtrlKey: e.ctrlKey,
      AltKey: e.altKey,
      MetaKey: e.metaKey,
    };

    setKeycode(e.key);
    setOutput({
      key: e.key,
      keycode: e.keyCode,
      code: e.code,
      location: e.location,
      modifiers: Object.keys(modifierKeys)
        .filter((key) => modifierKeys[key])
        .map((key) => key.replace("Key", ""))
        .join(" + "),
    });
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Find the javascript keycode, code, location and modifiers of any pressed key."
        />

        <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-dark-secondary dark:bg-dark w-full p-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{keycode}</p>
            <p className="text-sm text-gray-500">
              Press the key on your keyboard you want to get info about this
              key.
            </p>
          </div>
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Output will be shown here." />

        <ObjectOutput data={output} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

KeycodeInfo.title = "Keycode Info";
export default KeycodeInfo;
