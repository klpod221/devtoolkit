import React from "react";

import MyCopyButton from "./MyCopyButton";

const CodeOutput = ({
  language,
  output = false,
  error = false,
  canCopy = true,
}) => {
  return (
    <div className="relative group overflow-auto h-full w-full border text-sm disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark">
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
        <MyCopyButton
          value={output}
          type="absolute"
          className="hidden group-hover:block"
        />
      )}
    </div>
  );
};

export default CodeOutput;
