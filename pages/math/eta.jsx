import React from "react";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import CodeOutput from "@components/CodeOutput";

/** Formats milliseconds into a human-readable duration string */
const formatDuration = (ms) => {
  if (isNaN(ms) || ms <= 0) return "";
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours % 24 > 0) parts.push(`${hours % 24}h`);
  if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
  if (seconds % 60 > 0) parts.push(`${seconds % 60}s`);

  return parts.join(" ") || "less than 1 second";
};

const ETACalculator = () => {
  const [totalItems, setTotalItems] = React.useState("1000");
  const [processedItems, setProcessedItems] = React.useState("350");
  const [elapsedSeconds, setElapsedSeconds] = React.useState("120");

  const calculate = () => {
    const total = parseFloat(totalItems);
    const processed = parseFloat(processedItems);
    const elapsed = parseFloat(elapsedSeconds) * 1000; // to ms

    if (!total || !processed || !elapsed || processed <= 0 || total <= 0) {
      return "";
    }

    if (processed >= total) {
      return "Already completed!";
    }

    const rate = processed / elapsed; // items per ms
    const remaining = total - processed;
    const etaMs = remaining / rate;
    const progress = ((processed / total) * 100).toFixed(1);
    const speed = (rate * 1000).toFixed(2); // items per second

    return [
      `Progress:   ${processed} / ${total} (${progress}%)`,
      `Speed:      ${speed} items/s`,
      `Elapsed:    ${formatDuration(elapsed)}`,
      `Remaining:  ${formatDuration(etaMs)}`,
      `ETA:        ${new Date(Date.now() + etaMs).toLocaleTimeString()}`,
    ].join("\n");
  };

  return (
    <MyCard className="w-full max-w-4xl mx-auto">
      <MyCard.Header
        title="ETA Calculator"
        helper="Estimate the time remaining for a task based on progress and elapsed time."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MyInput
          label="Total Items"
          type="number"
          value={totalItems}
          onChange={setTotalItems}
          placeholder="e.g. 1000"
        />
        <MyInput
          label="Processed Items"
          type="number"
          value={processedItems}
          onChange={setProcessedItems}
          placeholder="e.g. 350"
        />
        <MyInput
          label="Elapsed Time (seconds)"
          type="number"
          value={elapsedSeconds}
          onChange={setElapsedSeconds}
          placeholder="e.g. 120"
        />
      </div>

      <div className="mt-4">
        <MyCard.Header title="Result" />
        <CodeOutput output={calculate()} />
      </div>
    </MyCard>
  );
};

ETACalculator.title = "ETA Calculator";
export default ETACalculator;
