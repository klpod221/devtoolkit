import React from "react";
import MyCodeEditor from "@/components/MyCodeEditor";
import { Card, Select, Label, Textarea, Button } from "flowbite-react";
import supportLanguages from "@/const/languages";

import { BsArrowsExpandVertical, BsPlayFill } from "react-icons/bs";

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    supportLanguages[0].slug
  ); // [1]
  const [language, setLanguage] = React.useState();
  const [code, setCode] = React.useState("");
  const [width, setWidth] = React.useState(70);

  const handleResizeWidth = (e) => {
    e.preventDefault();
    const initialWidth = width;
    const initialX = e.clientX;

    const $resizeLine = document.getElementById("resize-line");
    const $resizeIcon = document.getElementById("resize-icon");

    const onMouseMove = (e) => {
      if ($resizeIcon) {
        $resizeIcon.classList.remove("hidden");
      }

      if ($resizeLine) {
        $resizeLine.classList.add("bg-gray-300");
        $resizeIcon.classList.add("dark:bg-gray-600");
      }

      const dx = e.clientX - initialX;
      setWidth(
        Math.max(
          10,
          Math.min(90, initialWidth + (dx / window.innerWidth) * 100)
        )
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      if ($resizeIcon) {
        $resizeIcon.classList.add("hidden");
      }

      if ($resizeLine) {
        $resizeLine.classList.remove("bg-gray-300");
        $resizeIcon.classList.remove("dark:bg-gray-600");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  React.useEffect(() => {
    console.log(code);
  }, [code]);

  React.useEffect(() => {
    const selectedLang = supportLanguages.find(
      (lang) => lang.slug === selectedLanguage
    );

    if (selectedLang) {
      setLanguage(selectedLang.theme || selectedLang.slug);
    }
  }, [selectedLanguage]);

  React.useEffect(() => {
    if (window.innerWidth < 640) {
      setWidth(100);
    }

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setWidth(100);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex sm:flex-row flex-col h-full">
      <Card style={{ width: `${width}%` }} className="mb-4 sm:mb-0">
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

            <Button size={"sm"} className="py-0">
              Run Code
              <BsPlayFill className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <MyCodeEditor language={language} code={code} setCode={setCode} />
      </Card>

      {/* change size line */}
      <div
        id="resize-line"
        className="hidden items-center cursor-ew-resize w-1 relative z-10 group hover:bg-gray-300 dark:hover:bg-gray-600 sm:flex"
        onMouseDown={handleResizeWidth}
        onDoubleClick={() => setWidth(50)}
      >
        <BsArrowsExpandVertical
          id="resize-icon"
          className="text-gray-600 dark:text-gray-400 hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 group-hover:block"
        />
      </div>

      <Card
        style={{ width: `calc(${width === 100 ? 100 : 100 - width}%)` }}
        className="h-screen overflow-auto sm:h-auto"
      >
        <div className="flex h-full flex-col">
          {language === "html" && (
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
              />
            </>
          )}

          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
            Code Output
          </div>
          <pre className="h-full w-full border text-sm disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 mb-4 p-4">
            <iframe src="" title="output" className="w-full h-full"></iframe>
          </pre>
        </div>
      </Card>
    </div>
  );
};

CodeEditor.title = "Code Editor";
export default CodeEditor;
