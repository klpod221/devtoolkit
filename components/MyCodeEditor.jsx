import React from "react";
import Editor from "@monaco-editor/react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";
import { IoExpandOutline, IoContractOutline } from "react-icons/io5";

const MyCodeEditor = ({
  language = "html",
  fullScreen = true,
  options = {},
  editorRef = null,
  ...props
}) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const { theme } = React.useContext(ThemeContext);
  const disposeEmmet = React.useRef();

  const handleEditorWillMount = () => {
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

  const handleEditorDidMount = (editor, monaco) => {
    if (editorRef) {
      editorRef.current = editor;
      editorRef.monaco = monaco;
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      disposeEmmet.current && disposeEmmet.current();
    };
  }, []);

  return (
    <>
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-80 flex justify-center items-center">
          <div className="w-full h-full p-4 bg-white dark:bg-dark rounded-lg shadow-lg relative">
            <div
              className="absolute top-6 right-6 cursor-pointer z-10 p-2 bg-white dark:bg-dark rounded-full shadow-md"
              onClick={() => {
                setIsFullScreen(!isFullScreen);
              }}
            >
              <IoContractOutline className="text-gray-800 dark:text-dark-text" />
            </div>

            <Editor
              language={language}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
              className="w-full h-full border border-gray-200 dark:border-dark-secondary code-editor"
              theme={theme === "dark" ? "vs-dark" : "vs-light"}
              options={{
                smoothScrolling: true,
                ...options,
              }}
              {...props}
            />
          </div>
        </div>
      )}

      <div className="relative w-full h-full group">
        {fullScreen && (
          <div
            className="absolute top-2 right-2 cursor-pointer z-10 p-2 bg-white dark:bg-dark rounded-full shadow-md hidden group-hover:block transition-all duration-300"
            onClick={() => {
              setIsFullScreen(!isFullScreen);
            }}
          >
            <IoExpandOutline className="text-gray-800 dark:text-dark-text" />
          </div>
        )}

        <Editor
          language={language}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          className="w-full h-full border border-gray-200 dark:border-dark-secondary code-editor"
          theme={theme === "dark" ? "vs-dark" : "vs-light"}
          options={{
            scrollbar: {
              vertical: "hidden",
              smoothScrolling: true,
            },
            ...options,
          }}
          {...props}
        />
      </div>
    </>
  );
};

export default MyCodeEditor;
