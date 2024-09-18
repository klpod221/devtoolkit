import React from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

import copyToClipboard from "@utils/copyToClipboard";

const CodeOutput = ({
  language,
  output = false,
  error = false,
  canCopy = true,
  textWrap = false,
}) => {
  return (
    <div className="relative group overflow-auto h-full w-full border text-sm disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:text-dark-text">
      {error ? (
        <pre className="p-2 text-red-500">{error}</pre>
      ) : language === "html" ? (
        <iframe
          title="output"
          srcDoc={output}
          className="w-full h-full bg-white"
          id="iframe-output"
        />
      ) : (
        <pre className="p-2">
          <code>{output}</code>
        </pre>
      )}

      {canCopy && output && (
        <button
          className="absolute top-1 right-1 p-1 bg-gray-200 dark:bg-dark-secondary rounded-md group-hover:block hidden"
          onClick={() => copyToClipboard(output)}
        >
          <FaCopy />
        </button>
      )}
    </div>
  );
};

export default CodeOutput;
