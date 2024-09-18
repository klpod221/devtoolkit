import React from "react";
import { toast } from "react-toastify";

import RegexCheatsheet from "@constants/RegexCheatsheet";

import MyCard from "@components/MyCard";
import TwoColumnComponent from "@components/TwoColumnComponent";
import MyCodeEditor from "@components/MyCodeEditor";
import MyPopover from "@components/MyPopover";
import MyButton from "@components/MyButton";

import findTextPosition from "@utils/findTextPosition";

import { FaCopy } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";

const flagOptions = [
  {
    label: "<b>g</b>lobal",
    value: "g",
  },
  {
    label: "case <b>i</b>nsensitive",
    value: "i",
  },
  {
    label: "<b>m</b>ultiline",
    value: "m",
  },
  {
    label: "<b>s</b>ingle line",
    value: "s",
  },
  {
    label: "<b>u</b>nicode",
    value: "u",
  },
  {
    label: "stick<b>y</b>",
    value: "y",
  },
];

const commonRegexPatterns = [
  {
    name: "Whole Numbers",
    pattern: `^\d+$`,
    flags: ["g", "m"],
  },
  {
    name: "Decimal Numbers",
    pattern: `^\d*\.\d+$`,
    flags: ["g", "m"],
  },
];

const RegexTester = () => {
  const [flags, setFlags] = React.useState([flagOptions[0].value]);
  const [pattern, setPattern] = React.useState("");
  const [string, setString] = React.useState("");

  const [decorationIds, setDecorationIds] = React.useState([]);

  const editorRef = React.useRef(null);

  const onStringChange = (value) => {
    setString(value);
    highlightMatches(flags, pattern, value);
  };

  const onPatternChange = (value) => {
    setPattern(value);
    highlightMatches(flags, value, string);
  };

  const onFlagsChange = (value) => {
    let newFlags = [...flags];

    if (flags.includes(value)) {
      newFlags = newFlags.filter((flag) => flag !== value);
    } else {
      newFlags.push(value);
    }

    newFlags.sort((a, b) => {
      return (
        flagOptions.findIndex((flag) => flag.value === a) -
        flagOptions.findIndex((flag) => flag.value === b)
      );
    });

    setFlags(newFlags);
    highlightMatches(newFlags, pattern, string);
  };

  const highlightMatches = (flags, pattern, string) => {
    editorRef.current?.deltaDecorations(decorationIds, []);

    try {
      const regex = new RegExp(pattern, flags.join(""));
      console.log(regex);

      const decorations = [];

      let match = null;
      let lastIndex = -1;

      while (
        (match = regex.exec(string)) !== null &&
        match[0] &&
        match.index > lastIndex
      ) {
        lastIndex = match.index;

        const startPos = findTextPosition(string, match.index);
        const endPos = findTextPosition(string, match.index + match[0].length);

        if (!startPos || !endPos) {
          continue;
        }

        decorations.push({
          range: new monaco.Range(
            startPos.row,
            startPos.col,
            endPos.row,
            endPos.col
          ),
          options: {
            inlineClassName: "regex-match",
          },
        });
      }

      setDecorationIds(editorRef.current?.deltaDecorations([], decorations));
    } catch (error) {
      console.error(error);
    }
  };

  const onCopyRegex = () => {
    try {
      const regex = new RegExp(pattern, flags.join("")).toString();
      navigator.clipboard.writeText(regex);
      toast.success("Regex copied to clipboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TwoColumnComponent leftWidth="70">
      <TwoColumnComponent.LeftContent>
        <MyCard.Header title="Regex Tester" helper="Test your regex pattern">
          <MyButton size="sm" onClick={onCopyRegex}>
            <FaCopy className="w-4 h-4 mr-1" />
            Copy
          </MyButton>
        </MyCard.Header>

        <div className="border border-gray-200 dark:border-dark-secondary rounded-lg flex overflow-hidden">
          <span className="px-4 py-1.5 flex items-center bg-gray-100 dark:bg-dark-secondary dark:text-dark-text">
            /
          </span>

          <input
            type="text"
            placeholder="Enter your regex pattern here"
            value={pattern}
            onChange={(e) => onPatternChange(e.target.value)}
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:text-white dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text p-2.5 text-sm font-mono"
          />

          <MyPopover
            position="bottom"
            trigger="click"
            content={
              <div className="p-4 space-y-2">
                <div className="text-sm font-semibold dark:text-dark-text">
                  Flags
                </div>
                {flagOptions.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.value}
                      value={option.value}
                      className="mr-2"
                      onChange={(e) => onFlagsChange(e.target.value)}
                      checked={flags.includes(option.value)}
                    />
                    <label
                      htmlFor={option.value}
                      dangerouslySetInnerHTML={{ __html: option.label }}
                      className="dark:text-dark-text-secondary"
                    />
                  </div>
                ))}
              </div>
            }
          >
            <button className="px-2 py-1.5 flex items-center bg-gray-100 dark:bg-dark-secondary dark:text-dark-text w-24 justify-between">
              <span className="text-blue-500 dark:text-blue-400">
                /{flags.join("")}
              </span>
              <GoChevronDown className="ml-1" />
            </button>
          </MyPopover>
        </div>

        <MyCodeEditor
          fullScreen={false}
          value={string}
          onChange={onStringChange}
          language="plaintext"
          editorRef={editorRef}
          options={{
            minimap: { enabled: false },
            wordWrap: "on",
          }}
        />
      </TwoColumnComponent.LeftContent>
      <TwoColumnComponent.RightContent>
        <MyCard.Header
          title="Regex Cheatsheet"
          helper="A quick reference for regex syntax"
        />

        <div className="flex flex-col space-y-2 overflow-y-auto">
          {RegexCheatsheet.map((item, index) => (
            <>
              <div className="font-semibold dark:text-dark-text">
                {item.title}
              </div>

              {item.items.map((subItem, subIndex) => (
                <div
                  key={subIndex}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex space-x-2">
                    {subItem.expressions.map((expression, index) => (
                      <kbd key={index}>{expression}</kbd>
                    ))}
                  </div>
                  <span className="dark:text-dark-text text-right">
                    {subItem.explanation}
                  </span>
                </div>
              ))}
            </>
          ))}
        </div>
      </TwoColumnComponent.RightContent>
    </TwoColumnComponent>
  );
};

RegexTester.title = "Regex Tester";
export default RegexTester;
