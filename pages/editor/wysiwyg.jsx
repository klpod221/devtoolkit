import React from "react";
import { format } from "prettier";
import htmlParser from "prettier/plugins/html";

import TwoColumn from "@components/TwoColumn";
import MyTextEditor from "@components/MyTextEditor";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";

const HTMLWYSIWYGEditor = () => {
  const [content, setContent] = React.useState("<h2 style='color: red;'>Hello World</h2>");
  const [output, setOutput] = React.useState("");

  React.useEffect(() => {
    const formatCode = async () => {
      try {
        if (content) {
          const formatted = await format(content, {
            parser: "html",
            plugins: [htmlParser],
          });

          setOutput(formatted);
        }
      } catch (e) {
        console.error(e);
      }
    };

    formatCode();
  }, [content]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Write your text here and see the result on the right side."
        />

        <MyTextEditor content={content} setContent={setContent} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Output"
          helper="This is the result of your input."
        />

        <MyCodeEditor
          value={output}
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
          }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

HTMLWYSIWYGEditor.title = "HTML WYSIWYG Editor";
export default HTMLWYSIWYGEditor;
