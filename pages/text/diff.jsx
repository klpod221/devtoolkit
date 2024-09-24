import React from "react";
import { DiffEditor } from "@monaco-editor/react";

import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";

const TextDiff = () => {
  const [original, setOriginal] = React.useState("");
  const [modified, setModified] = React.useState("");

  return (
    <MyCard>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Original Text</label>
          <div className="h-96">
            <MyCodeEditor
              value={original}
              onChange={setOriginal}
              options={{
                minimap: { enabled: false },
              }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>Modified Text</label>
          <div className="h-96">
            <MyCodeEditor
              value={modified}
              onChange={setModified}
              options={{
                minimap: { enabled: false },
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <label>Diff Text</label>
        <div className="h-96">
          <MyCodeEditor type="diff" original={original} modified={modified} />
        </div>
      </div>
    </MyCard>
  );
};

TextDiff.title = "Text Diff";
export default TextDiff;
