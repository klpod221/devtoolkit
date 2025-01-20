import React from "react";

import { cronToHuman, isCronValid, nextRun } from "@/utils/cron";

import MyCard from "@/components/MyCard";
import MyInput from "@components/MyInput";

const helpers = [
  {
    symbol: "*",
    meaning: "Any value",
    example: "* * * *",
    equivalent: "Every minute",
  },
  {
    symbol: "-",
    meaning: "Range of values",
    example: "1-10 * * *",
    equivalent: "Minutes 1 through 10",
  },
  {
    symbol: ",",
    meaning: "List of values",
    example: "1,10 * * *",
    equivalent: "At minutes 1 and 10",
  },
  {
    symbol: "/",
    meaning: "Step values",
    example: "*/10 * * *",
    equivalent: "Every 10 minutes",
  },
  {
    symbol: "@yearly",
    meaning: "Once every year at midnight of 1 January",
    example: "@yearly",
    equivalent: "0 0 1 1 *",
  },
  {
    symbol: "@annually",
    meaning: "Same as @yearly",
    example: "@annually",
    equivalent: "0 0 1 1 *",
  },
  {
    symbol: "@monthly",
    meaning: "Once a month at midnight on the first day",
    example: "@monthly",
    equivalent: "0 0 1 * *",
  },
  {
    symbol: "@weekly",
    meaning: "Once a week at midnight on Sunday morning",
    example: "@weekly",
    equivalent: "0 0 * * 0",
  },
  {
    symbol: "@daily",
    meaning: "Once a day at midnight",
    example: "@daily",
    equivalent: "0 0 * * *",
  },
  {
    symbol: "@midnight",
    meaning: "Same as @daily",
    example: "@midnight",
    equivalent: "0 0 * * *",
  },
  {
    symbol: "@hourly",
    meaning: "Once an hour at the beginning of the hour",
    example: "@hourly",
    equivalent: "0 * * * *",
  },
  {
    symbol: "@reboot",
    meaning: "Run at startup",
    example: "",
    equivalent: "",
  },
];

const CronExpressionGenerator = () => {
  const [cron, setCron] = React.useState("0 12 * * *");

  return (
    <>
      <MyCard className="w-full max-w-5xl">
        <div className="text-center">
          <p
            className={`text-lg ${isCronValid(cron) ? "text-green-500" : "text-red-500"}`}
          >
            {cronToHuman(cron)}
          </p>

          <p className="text-sm text-gray-400 dark:text-dark-text-secondary">
            Next run: {nextRun(cron, "yyyy-MM-DD HH:mm:ss")}
          </p>
        </div>

        <div className="md:w-2/3 mx-auto">
          <MyInput
            value={cron}
            onChange={setCron}
            placeholder="* * * * *"
            className="text-center !text-4xl font-mono"
          />
        </div>

        <div className="text-center text-sm flex justify-center mt-4">
          {cron.trim().split(" ").length === 6 && <span>second</span>}
          <span>minute</span>
          <span className="ml-4">hour</span>
          <span className="ml-2">
            day
            <br />
            (month)
          </span>
          <span className="ml-2">month</span>
          <span className="ml-2">
            day
            <br />
            (week)
          </span>
        </div>

        <hr className="d-block border-t border-gray-200 dark:border-gray-600" />

        <div className="font-mono text-sm mx-auto">
          ┌──────────── [optional] seconds (0 - 59) <br />
          | ┌────────── minute (0 - 59) <br />
          | | ┌──────── hour (0 - 23) <br />
          | | | ┌────── day of month (1 - 31) <br />
          | | | | ┌──── month (1 - 12) OR jan,feb,mar,apr ... <br />
          | | | | | ┌── day of week (0 - 6, sunday=0) OR sun,mon ... <br />
          | | | | | | <br />
          * * * * * * command <br />
        </div>
      </MyCard>

      <MyCard className="w-full max-w-5xl sm:mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left uppercase">
              <th className="px-6 py-4 text-sm">Symbol</th>
              <th className="px-6 py-4 text-sm">Meaning</th>
              <th className="px-6 py-4 text-sm">Example</th>
              <th className="px-6 py-4 text-sm">Equivalent</th>
            </tr>
          </thead>
          <tbody>
            {helpers.map((helper, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-600"
              >
                <td className="px-6 py-4">{helper.symbol}</td>
                <td className="px-6 py-4">{helper.meaning}</td>
                <td className="px-6 py-4">{helper.example}</td>
                <td className="px-6 py-4">{helper.equivalent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </MyCard>
    </>
  );
};

CronExpressionGenerator.title = "Crontab Generator";
export default CronExpressionGenerator;
