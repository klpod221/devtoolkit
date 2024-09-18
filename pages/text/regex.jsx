import React from "react";
import { toast } from "react-toastify";

import RegexCheatsheet from "@constants/RegexCheatsheet";

import findTextPosition from "@utils/findTextPosition";
import copyToClipboard from "@utils/copyToClipboard";

import MyCard from "@components/MyCard";
import TwoColumnLayout from "@components/TwoColumnLayout";
import MyCodeEditor from "@components/MyCodeEditor";
import MyPopover from "@components/MyPopover";
import MyButton from "@components/MyButton";

import { FaCopy } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { BsRegex } from "react-icons/bs";
import MyDrawer from "@components/MyDrawer";

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
    pattern: `^\\d+$`,
    flags: ["g", "m"],
  },
  {
    name: "Decimal Numbers",
    pattern: `^\\d*\\.\\d+$`,
    flags: ["g", "m"],
  },
  {
    name: "Alphanumeric without spaces",
    pattern: `^[a-zA-Z0-9]+$`,
    flags: ["g", "m"],
  },
  {
    name: "Alphanumeric with spaces",
    pattern: `^[a-zA-Z0-9 ]+$`,
    flags: ["g", "m"],
  },
  {
    name: "Email Address",
    pattern: `^([a-z0-9_\\.\\+-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$`,
    flags: ["g", "m"],
  },
  {
    name: "Password (8 char, 1 upper, 1 lower, 1 number, 1 special)",
    pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$`,
    flags: ["g", "m"],
  },
  {
    name: "Username",
    pattern: `^[a-zA-Z0-9_-]{3,16}$`,
    flags: ["g", "m"],
  },
  {
    name: "URL",
    pattern: `(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)`,
    flags: ["g", "m"],
  },
  {
    name: "IPv4 Address",
    pattern: `^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$`,
    flags: ["g", "m"],
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: `([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))`,
    flags: ["g", "m"],
  },
  {
    name: "Date (dd-MM-yyyy using separators - / .)",
    pattern: `^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$`,
    flags: ["g", "m"],
  },
  {
    name: "Date (dd-mmm-YYYY using separators - / .)",
    pattern: `^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 12-hour format)",
    pattern: `^(0?[1-9]|1[0-2]):[0-5][0-9]$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 12-hour format with AM/PM)",
    pattern: `((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 24-hour format)",
    pattern: `^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 24-hour format optional leading zero)",
    pattern: `^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM:SS 24-hour format)",
    pattern: `(?:[01]\\d|2[0123]):(?:[012345]\\d):(?:[012345]\\d)`,
    flags: ["g", "m"],
  },
  {
    name: "HTML Tag",
    pattern: `<\\/?[\\w\\s]*>|<.+[\\W]>`,
    flags: ["g", "m"],
  },
  {
    name: "Inline JS",
    pattern: `\\bon\\w+=\\S+(?=.*>)`,
    flags: ["g", "m"],
  },
  {
    name: "Inline JS with element",
    pattern: `(?:<[^>]+\\s)(on\\S+)=["']?((?:.(?!["']?\\s+(?:\\S+)=|[>"']))+.)["']?`,
    flags: ["g", "m"],
  },
  {
    name: "Hex Color",
    pattern: `#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})`,
    flags: ["g", "m"],
  },
  {
    name: "Slug",
    pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`,
    flags: ["g", "m"],
  },
  {
    name: "Phone Number with country code",
    pattern: `\\+?[0-9]{1,3}-?[0-9]{3}-?[0-9]{3}-?[0-9]{4}`,
    flags: ["g", "m"],
  },
  {
    name: "Credit Card Number",
    pattern: `\\b(?:\\d[ -]*?){13,16}\\b`,
    flags: ["g", "m"],
  },
];

const RegexTester = () => {
  const [flags, setFlags] = React.useState(["g", "m"]);
  const [pattern, setPattern] = React.useState("");
  const [string, setString] = React.useState("");

  const [decorationIds, setDecorationIds] = React.useState([]);

  const editorRef = React.useRef(null);

  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const onStringChange = (value) => {
    setString(value);
    highlightMatches(flags, pattern, value);
  };

  const onPatternChange = (value) => {
    setPattern(value);
    highlightMatches(flags, value, string);
  };

  const onFlagsChange = (value, checked) => {
    let newFlags = [...flags];

    const isFlagExist = newFlags.includes(value);

    if (checked && !isFlagExist) {
      newFlags.push(value);
    }

    if (!checked && isFlagExist) {
      newFlags = newFlags.filter((flag) => flag !== value);
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
      const regex = new RegExp(pattern, flags.join(""));
      copyToClipboard(regex);
  };

  return (
    <TwoColumnLayout leftWidth="70">
      <TwoColumnLayout.LeftContent>
        <MyCard.Header title="Regex Tester" helper="Test your regex pattern">
          <div className="flex items-center space-x-2">
            <MyButton size="sm" onClick={onCopyRegex}>
              <FaCopy className="w-4 h-4 mr-1" />
              Copy
            </MyButton>
            <MyButton size="sm" onClick={() => setIsOpenDrawer(true)}>
              Common Patterns
            </MyButton>
          </div>
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
                      onChange={(e) =>
                        onFlagsChange(e.target.value, e.target.checked)
                      }
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

        <MyDrawer
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          title="Regex Common Patterns"
          titleIcon={BsRegex}
        >
          <div className="flex flex-col space-y-3 overflow-y-auto text-sm">
            {commonRegexPatterns.map((item, index) => (
              <div
                className="flex flex-col"
                key={index}
              >
                <span className="dark:text-dark-text font-semibold">
                  {item.name}
                </span>
                <kbd
                  onClick={() => copyToClipboard(item.pattern)}
                  className="cursor-pointer"
                >
                  {new RegExp(item.pattern, item.flags.join("")).toString()}
                </kbd>
              </div>
            ))}
          </div>
        </MyDrawer>
      </TwoColumnLayout.LeftContent>
      <TwoColumnLayout.RightContent>
        <MyCard.Header
          title="Regex Cheatsheet"
          helper="A quick reference for regex syntax"
        />

        <div className="flex flex-col space-y-2 overflow-y-auto">
          {RegexCheatsheet.map((item, index) => (
            <>
              <div className="font-semibold dark:text-dark-text" key={index}>
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
      </TwoColumnLayout.RightContent>
    </TwoColumnLayout>
  );
};

RegexTester.title = "Regex Tester";
export default RegexTester;
