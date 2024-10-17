import React from "react";

import copyToClipboard from "@utils/copyToClipboard";

import { AiOutlineCopy, AiFillCopy } from "react-icons/ai";
import MyButton from "./MyButton";

/**
 * MyCopyButton component
 * 
 * @param {Object} props
 * @param {string} props.value - Value to copy
 * @param {string} props.type - "button" | "absolute"
 * @param {string} props.className
 * @returns {JSX.Element}
 */
const MyCopyButton = ({ value, type, className }) => {
  const [classes, setClasses] = React.useState();

  React.useEffect(() => {
    if (type === "absolute") {
      setClasses("absolute top-1 right-1");
    }
  }, [type, className]);

  return (
    <>
      {type === "button" ? (
        <MyButton onClick={() => copyToClipboard(value)} className={className}>
          Copy
          <AiFillCopy className="ml-2" />
        </MyButton>
      ) : (
        <button
          className={`p-1 bg-gray-200 dark:bg-dark-secondary rounded-md  hover:opacity-80 transition-all duration-300 ease-in-out ${classes} ${className}`}
          onClick={() => copyToClipboard(value)}
        >
          <AiOutlineCopy />
        </button>
      )}
    </>
  );
};

export default MyCopyButton;
