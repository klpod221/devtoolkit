import React from "react";
import Editor from "@monaco-editor/react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";

const MyCodeEditor = ({ language = "html", code = "", setCode }) => {
  const { theme } = React.useContext(ThemeContext);
  const disposeEmmet = React.useRef();

  const handleEditorDidMount = () => {
    if (language === "html") {
      disposeEmmet.current = emmetHTML(monaco);
    } else if (language === "css") {
      disposeEmmet.current = emmetCSS(monaco);
    } else if (language === "javascript") {
      disposeEmmet.current = emmetJSX(monaco);
    } else {
      disposeEmmet.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      disposeEmmet.current && disposeEmmet.current();
    };
  }, []);

  return (
    <Editor
      height="80vh"
      language={language}
      beforeMount={handleEditorDidMount}
      className="w-full h-full border border-gray-200 dark:border-gray-700"
      value={code}
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
      onChange={setCode}
      options={{
        minimap: { enabled: false },
      }}
    />
  );
};

export default MyCodeEditor;
