import React from "react";

import copyToClipboard from "@utils/copyToClipboard";

import { AiOutlineCopy } from "react-icons/ai";

const MyCopyButton = ({ value, type = "absolute", className }) => {
  const [classes, setClasses] = React.useState();

  React.useEffect(() => {
    if (type === "absolute") {
      setClasses("absolute top-1 right-1" + (className ? ` ${className}` : ""));
    }
  }, [type, className]);

  return (
    <button
      className={`p-1 bg-gray-200 dark:bg-dark-secondary rounded-md dark:text-dark-text ${classes}`}
      onClick={() => copyToClipboard(value)}
    >
      <AiOutlineCopy />
    </button>
  );
};

export default MyCopyButton;
