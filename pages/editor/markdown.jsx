import React from "react";
import MarkdownIt from "markdown-it";
import TwoColumnComponent from "@/components/TwoColumnComponent";
import MyCodeEditor from "@/components/MyCodeEditor";

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
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Markdown Input
          </div>
        </div>

        <MyCodeEditor language={"markdown"} code={code} onChange={setCode} />
      </TwoColumnComponent.LeftContent>

      <TwoColumnComponent.RightContent>
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Markdown Preview
          </div>
        </div>

        <div
          className="w-full h-full border border-gray-200 dark:border-gray-700 overflow-y-auto p-4 html-preview"
          dangerouslySetInnerHTML={{ __html: output }}
        />
      </TwoColumnComponent.RightContent>
    </TwoColumnComponent>
  );
};

MarkdownEditor.title = "Markdown Editor";
export default MarkdownEditor;
