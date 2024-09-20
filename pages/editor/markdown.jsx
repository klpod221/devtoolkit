import React from "react";
import MarkdownIt from "markdown-it";

import TwoColumn from "@components/TwoColumn";
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
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Markdown Editor"
          helper="Write your markdown here"
        />

        <MyCodeEditor language={"markdown"} value={code} onChange={setCode} />
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Preview" />

        <CodeOutput language={"html"} output={output} canCopy={false} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

MarkdownEditor.title = "Markdown Editor";
export default MarkdownEditor;
