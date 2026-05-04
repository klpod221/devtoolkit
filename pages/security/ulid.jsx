import React from "react";
import { ulid, decodeTime } from "ulid";

import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyCopyButton from "@components/MyCopyButton";

import { FaSyncAlt } from "react-icons/fa";

const ULIDGenerator = () => {
  const [count, setCount] = React.useState(1);
  const [ulids, setUlids] = React.useState([]);

  const generate = React.useCallback(() => {
    const n = Math.min(Math.max(parseInt(count) || 1, 1), 100);
    const generated = Array.from({ length: n }, () => {
      const id = ulid();
      const timestamp = new Date(decodeTime(id)).toISOString();
      return { id, timestamp };
    });
    setUlids(generated);
  }, [count]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  return (
    <MyCard className="w-full max-w-4xl mx-auto">
      <MyCard.Header
        title="ULID Generator"
        helper="Universally Unique Lexicographically Sortable Identifier — a time-sortable alternative to UUID."
      >
        <MyButton onClick={generate}>
          <FaSyncAlt className="mr-2" /> Regenerate
        </MyButton>
      </MyCard.Header>

      <div className="flex items-center space-x-4 mb-4">
        <MyInput
          label="Count"
          type="number"
          value={count}
          onChange={setCount}
          min={1}
          max={100}
          className="w-32"
        />
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-5">
          Max 100 per generation
        </span>
      </div>

      <div className="space-y-2">
        {ulids.map(({ id, timestamp }) => (
          <div
            key={id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-100 dark:bg-dark-secondary rounded-lg gap-2"
          >
            <div>
              <p className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-100 break-all">
                {id}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {timestamp}
              </p>
            </div>
            <MyCopyButton value={id} className="shrink-0" />
          </div>
        ))}
      </div>
    </MyCard>
  );
};

ULIDGenerator.title = "ULID Generator";
export default ULIDGenerator;
