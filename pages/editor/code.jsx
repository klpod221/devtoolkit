import React from "react";
import axios from "axios";
import { Spinner, theme } from "flowbite-react";

import SUPPORT_LANGUAGES from "@constants/programming_languages";
import CODE_SAMPLES from "@constants/code_samples";

import TwoColumn from "@components/TwoColumn";
import CodeOutput from "@components/CodeOutput";
import MyCodeEditor from "@/components/MyCodeEditor";
import MyButton from "@/components/MyButton";
import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";

import { BsPlayFill } from "react-icons/bs";

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("html");
  const [language, setLanguage] = React.useState();
  const [themeLanguage, setThemeLanguage] = React.useState();
  const [code, setCode] = React.useState("");
  const [stdin, setStdin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState();
  const [helperMessage, setHelperMessage] = React.useState(
    "You can write your code here",
  );

  const handleRunCode = async () => {
    try {
      setLoading(true);

      const formData = {
        code,
        language,
        theme: themeLanguage,
        stdin,
      };

      setOutput(null);
      const { data } = await axios.post("/api/run-code", formData);

      setOutput(data);
    } catch (error) {
      setOutput(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const selectedLang = SUPPORT_LANGUAGES.find(
      (lang) => lang.slug === selectedLanguage,
    );

    if (selectedLang) {
      setLanguage(selectedLang.slug);
      setThemeLanguage(selectedLang.theme || selectedLang.slug);
      setHelperMessage(selectedLang.helper || "");

      const codeSample = CODE_SAMPLES[selectedLang.slug];
      setCode(codeSample || "");
    }

    setOutput(null);
  }, [selectedLanguage]);

  return (
    <TwoColumn leftWidth={70}>
      <TwoColumn.Left>
        <MyCard.Header
          title="Code Input"
          helper={helperMessage || "You can write your code here"}
        >
          <MySelect value={selectedLanguage} onChange={setSelectedLanguage}>
            {SUPPORT_LANGUAGES.map((lang, index) => (
              <option key={index} value={lang.slug}>
                {lang.name}
              </option>
            ))}
          </MySelect>

          <MyButton className="py-0" onClick={handleRunCode} disabled={loading}>
            Run Code
            {loading ? (
              <Spinner size="sm" className="ml-1" />
            ) : (
              <BsPlayFill className="h-5 w-5" />
            )}
          </MyButton>
        </MyCard.Header>

        {/* TODO: Multi file editor */}
        <MyCodeEditor
          language={themeLanguage}
          value={code}
          onChange={setCode}
        />
      </TwoColumn.Left>

      <TwoColumn.Right>
        <div className="flex h-full flex-col">
          {language !== "html" && themeLanguage !== "html" && (
            <MyTextarea
              id="stdin"
              label="INPUT"
              className="mb-4"
              value={stdin}
              rows={2}
              required
              onChange={setStdin}
            />
          )}

          <div className="flex mb-1 justify-between">
            <span className="text-base">OUTPUT</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {loading ? (
                <div className="flex items-center">Processing...</div>
              ) : output?.executionTime ? (
                `${output.executionTime}ms`
              ) : (
                ""
              )}
            </span>
          </div>

          <CodeOutput
            language={themeLanguage}
            error={output?.exception || output?.stderr}
            output={output?.stdout}
          />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

CodeEditor.title = "Code Editor";
export default CodeEditor;
