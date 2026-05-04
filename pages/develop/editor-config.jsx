import React from "react";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyCheckbox from "@components/MyCheckbox";
import MySelect from "@components/MySelect";
import MyInput from "@components/MyInput";
import CodeOutput from "@components/CodeOutput";

import { FaDownload } from "react-icons/fa";

const INDENT_STYLES = ["space", "tab"];
const EOL_OPTIONS = ["lf", "crlf", "cr"];
const CHARSET_OPTIONS = ["utf-8", "utf-8-bom", "utf-16be", "utf-16le", "latin1"];

/**
 * Generates an .editorconfig file content string from options.
 * @param {object} opts - Configuration options.
 * @returns {string} The .editorconfig file content.
 */
const generateEditorconfig = (opts) => {
  const lines = [
    "# EditorConfig is awesome: https://EditorConfig.org",
    "",
    "# top-most EditorConfig file",
    "root = true",
    "",
    "[*]",
  ];

  lines.push(`indent_style = ${opts.indentStyle}`);
  lines.push(`indent_size = ${opts.indentSize}`);
  lines.push(`end_of_line = ${opts.eol}`);
  lines.push(`charset = ${opts.charset}`);
  lines.push(`trim_trailing_whitespace = ${opts.trimTrailingWhitespace}`);
  lines.push(`insert_final_newline = ${opts.insertFinalNewline}`);

  if (opts.maxLineLength) {
    lines.push(`max_line_length = ${opts.maxLineLength}`);
  }

  if (opts.addMarkdown) {
    lines.push("");
    lines.push("[*.md]");
    lines.push("trim_trailing_whitespace = false");
  }

  return lines.join("\n");
};

const EditorconfigGenerator = () => {
  const [opts, setOpts] = React.useState({
    indentStyle: "space",
    indentSize: 2,
    eol: "lf",
    charset: "utf-8",
    trimTrailingWhitespace: true,
    insertFinalNewline: true,
    maxLineLength: 120,
    addMarkdown: true,
  });

  const output = generateEditorconfig(opts);

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".editorconfig";
    a.click();
    URL.revokeObjectURL(url);
  };

  const set = (key) => (value) => setOpts((prev) => ({ ...prev, [key]: value }));

  return (
    <TwoColumn leftWidth="40">
      <TwoColumn.Left>
        <MyCard.Header
          title="Configuration"
          helper="Generate an .editorconfig file to maintain consistent coding styles."
        >
          <MyButton onClick={handleDownload}>
            <FaDownload className="mr-2" /> Download
          </MyButton>
        </MyCard.Header>

        <div className="flex flex-col gap-4">
          <MySelect label="Indent Style" value={opts.indentStyle} onChange={set("indentStyle")}>
            {INDENT_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
          </MySelect>

          <MyInput
            label="Indent Size"
            type="number"
            value={opts.indentSize}
            onChange={set("indentSize")}
            min={1}
            max={8}
          />

          <MySelect label="End of Line" value={opts.eol} onChange={set("eol")}>
            {EOL_OPTIONS.map((e) => <option key={e} value={e}>{e.toUpperCase()}</option>)}
          </MySelect>

          <MySelect label="Charset" value={opts.charset} onChange={set("charset")}>
            {CHARSET_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </MySelect>

          <MyInput
            label="Max Line Length"
            type="number"
            value={opts.maxLineLength}
            onChange={set("maxLineLength")}
            min={0}
            max={300}
          />

          <MyCheckbox
            label="Trim Trailing Whitespace"
            checked={opts.trimTrailingWhitespace}
            onChange={(e) => set("trimTrailingWhitespace")(e.target.checked)}
          />
          <MyCheckbox
            label="Insert Final Newline"
            checked={opts.insertFinalNewline}
            onChange={(e) => set("insertFinalNewline")(e.target.checked)}
          />
          <MyCheckbox
            label="Add Markdown Section"
            checked={opts.addMarkdown}
            onChange={(e) => set("addMarkdown")(e.target.checked)}
          />
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Preview of your .editorconfig file." />
        <CodeOutput output={output} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

EditorconfigGenerator.title = "Editorconfig Generator";
export default EditorconfigGenerator;
