import React from "react";

import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";

const SlugifyString = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <MyCard className="w-full max-w-5xl">
      <MyCard.Header
        title="Slugify String"
        helper="Convert a string to a slug"
      />

      <MyTextarea
        label="Input"
        value={input}
        onChange={(value) => {
          setInput(value);
          setOutput(slugify(value));
        }}
        placeholder="Enter a string"
      />

      <MyTextarea
        label="Output"
        value={output}
        placeholder="Slugified string"
        readOnly
      />
    </MyCard>
  );
};

SlugifyString.title = "Slugify String";
export default SlugifyString;
