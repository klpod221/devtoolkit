import React from "react";

import { romanToArabic, arabicToRoman } from "@utils/romanNumerals";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyCopyButton from "@components/MyCopyButton";

const RomanNumeralConverter = () => {
  const [arabic, setArabic] = React.useState("10");
  const [roman, setRoman] = React.useState("XX");

  const [output, setOutput] = React.useState({
    roman: "",
    arabic: "",
  });

  const [error, setError] = React.useState({
    arabic: false,
    roman: false,
  });

  React.useEffect(() => {
    if (arabic) {
      try {
        const roman = arabicToRoman(Number(arabic));
        setOutput((prev) => ({ ...prev, roman }));
        setError((prev) => ({ ...prev, arabic: false }));
      } catch (err) {
        setOutput((prev) => ({ ...prev, roman: "" }));
        setError((prev) => ({ ...prev, arabic: err.message }));
      }
    } else {
      setOutput((prev) => ({ ...prev, roman: "" }));
      setError((prev) => ({ ...prev, arabic: false }));
    }
  }, [arabic]);

  React.useEffect(() => {
    if (roman) {
      try {
        const arabic = romanToArabic(roman);
        setOutput((prev) => ({ ...prev, arabic }));
        setError((prev) => ({ ...prev, roman: false }));
      } catch (err) {
        setOutput((prev) => ({ ...prev, arabic: "" }));
        setError((prev) => ({ ...prev, roman: err.message }));
      }
    } else {
      setOutput((prev) => ({ ...prev, arabic: "" }));
      setError((prev) => ({ ...prev, roman: false }));
    }
  }, [roman]);

  return (
    <div className="flex flex-col gap-2">
      <MyCard className="w-full max-w-xl">
        <MyCard.Header
          title="Arabic to Roman"
          helper="Convert Arabic numbers to Roman numerals."
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 items-center">
          <div>
            <MyInput
              placeholder="Enter a number"
              type="number"
              value={arabic}
              onChange={setArabic}
              helperText={
                <span className="text-red-500 dark:text-red-400 -mt-2">
                  {error.arabic}
                </span>
              }
            />
          </div>

          <div className="flex items-center justify-end space-x-2">
            <span className="font-semibold">{output.roman || ""}</span>
            {output.roman && <MyCopyButton value={output.roman} />}
          </div>
        </div>
      </MyCard>

      <MyCard className="w-full max-w-xl">
        <MyCard.Header
          title="Roman to Arabic"
          helper="Convert Roman numerals to Arabic numbers."
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 items-center">
          <MyInput
            placeholder="Enter a Roman numeral"
            value={roman}
            onChange={setRoman}
            helperText={
              <span className="text-red-500 dark:text-red-400 -mt-2">
                {error.roman}
              </span>
            }
          />

          <div className="flex items-center justify-end space-x-2">
            <span className="font-semibold">{output.arabic || ""}</span>
            {output.arabic && <MyCopyButton value={output.arabic} />}
          </div>
        </div>
      </MyCard>
    </div>
  );
};

RomanNumeralConverter.title = "Roman Numeral Converter";
export default RomanNumeralConverter;
