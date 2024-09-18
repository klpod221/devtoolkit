import React from "react";
import MarkdownIt from "markdown-it";

import TwoColumnComponent from "@/components/TwoColumnComponent";
import CodeOutput from "@components/CodeOutput";
import MyCodeEditor from "@/components/MyCodeEditor";
import MyCard from "@components/MyCard";

const MarkdownEditor = () => {
  const [code, setCode] = React.useState("");
  const [output, setOutput] = React.useState();

  React.useEffect(() => {
    const md = new MarkdownIt();
    setOutput(md.render(code));
  }, [code]);

  return (
    <TwoColumnComponent>
      <TwoColumnComponent.LeftContent>
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800 dark:text-dark-text">
            Markdown Input
          </div>
        </div>

        <MyCodeEditor language={"markdown"} value={code} onChange={setCode} />
      </TwoColumnComponent.LeftContent>

      <TwoColumnComponent.RightContent>
        <MyCard.Header>
          <div className="text-xl font-semibold text-gray-800 dark:text-dark-text">
            Preview
          </div>
        </MyCard.Header>

        <CodeOutput language={"html"} output={output} canCopy={false} />
      </TwoColumnComponent.RightContent>
    </TwoColumnComponent>
  );
};

MarkdownEditor.title = "Markdown Editor";
export default MarkdownEditor;
