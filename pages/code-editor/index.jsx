import React from "react";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import MyCodeEditor from "@/components/MyCodeEditor";
import { Select, Label, Textarea, Button, Spinner } from "flowbite-react";
import supportLanguages from "@/const/languages";
import axios from "axios";

import { BsPlayFill } from "react-icons/bs";

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    supportLanguages[0].slug
  );
  const [language, setLanguage] = React.useState();
  const [code, setCode] = React.useState("");
  const [stdin, setStdin] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const [output, setOutput] = React.useState();

  const handleRunCode = async () => {
    try {
      setLoading(true);

      const formData = {
        code,
        language,
        stdin,
      };

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
    const selectedLang = supportLanguages.find(
      (lang) => lang.slug === selectedLanguage
    );

    if (selectedLang) {
      setLanguage(selectedLang.theme || selectedLang.slug);
    }

    setOutput(null);
  }, [selectedLanguage]);

  const leftContent = (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Code Input
        </div>

        <div className="flex space-x-2">
          <Select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            sizing={"sm"}
          >
            {supportLanguages.map((lang) => (
              <option key={lang.slug} value={lang.slug}>
                {lang.name}
              </option>
            ))}
          </Select>

          <Button
            size={"sm"}
            className="py-0"
            onClick={handleRunCode}
            disabled={loading}
          >
            Run Code
            {loading ? (
              <Spinner size="sm" className="ml-1" />
            ) : (
              <BsPlayFill className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <MyCodeEditor language={language} code={code} setCode={setCode} />
    </>
  );

  const rightContent = (
    <div className="flex h-full flex-col">
      {language !== "html" && (
        <>
          <div className="mb-2 block">
            <Label
              htmlFor="stdin"
              value="STDIN"
              className="text-xl font-semibold"
            />
          </div>
          <Textarea
            id="stdin"
            required
            rows={2}
            className="mb-4 rounded-none"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
          />
        </>
      )}

      <div className="text-gray-800 dark:text-gray-200 mb-1 flex justify-between">
        <span className="text-xl font-semibold">STDOUT</span>
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

      <div className="overflow-auto h-full w-full border text-sm disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500">
        {output?.exception ? (
          <pre className="text-red-500 dark:text-red-400">
            <code>{output.exception}</code>
          </pre>
        ) : language === "html" && output?.stdout ? (
          <iframe
            title="output"
            srcDoc={output.stdout}
            className="w-full h-full bg-white"
          />
        ) : (
          <pre>
            <code>{output?.stdout}</code>
          </pre>
        )}
      </div>
    </div>
  );

  return (
    <TwoColumnLayout
      leftContent={leftContent}
      rightContent={rightContent}
      defaultWidth={70}
    />
  );
};

CodeEditor.title = "Code Editor";
export default CodeEditor;
