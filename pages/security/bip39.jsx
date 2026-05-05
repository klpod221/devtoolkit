import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MySelect from "@components/MySelect";
import MyCopyButton from "@components/MyCopyButton";

const strengths = {
  12: 128,
  15: 160,
  18: 192,
  21: 224,
  24: 256,
};

const BIP39PassphraseGenerator = () => {
  const [wordCount, setWordCount] = useState("12");
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerate = () => {
    const strength = strengths[parseInt(wordCount)];
    const newMnemonic = generateMnemonic(strength);
    setMnemonic(newMnemonic);
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="BIP39 Generator" helper="Generate a secure BIP39 mnemonic passphrase" />
        <div className="mt-4 space-y-4">
          <MySelect
            label="Word Count"
            value={wordCount}
            onChange={(val) => setWordCount(val)}
          >
            <option value="12">12 Words</option>
            <option value="15">15 Words</option>
            <option value="18">18 Words</option>
            <option value="21">21 Words</option>
            <option value="24">24 Words</option>
          </MySelect>
          <MyButton onClick={handleGenerate} className="w-full">
            Generate Passphrase
          </MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Your mnemonic phrase" />
        {mnemonic ? (
          <div className="relative p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-secondary rounded-lg">
            <div className="flex flex-wrap gap-2 mb-8">
              {mnemonic.split(" ").map((word, i) => (
                <span key={i} className="px-3 py-1 bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 rounded shadow-sm text-sm font-medium">
                  <span className="text-gray-400 mr-2 text-xs select-none">{i + 1}</span>
                  {word}
                </span>
              ))}
            </div>
            <div className="absolute bottom-2 right-2">
              <MyCopyButton value={mnemonic} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[200px] border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500">
             <p>Click generate to create a passphrase.</p>
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

BIP39PassphraseGenerator.title = "BIP39 Passphrase Generator";
export default BIP39PassphraseGenerator;
