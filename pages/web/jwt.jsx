import React from "react";
import { toast } from "react-toastify";

import jwtParser from "@utils/jwtParser";

import MyCodeEditor from "@components/MyCodeEditor";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";

import { FaArrowRight } from "react-icons/fa";

const JWTParser = () => {
  const [input, setInput] = React.useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  );
  const [output, setOutput] = React.useState(null);

  const parseJWT = () => {
    try {
      const parsed = jwtParser(input);
      console.log(parsed);
      setOutput(parsed);
      toast.success("JWT token parsed successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to parse JWT token.");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Paste your JWT token here.">
          <MyButton onClick={parseJWT}>
            Parse <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyCodeEditor language="text" value={input} onChange={setInput} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Decoded JWT token." />

        {output?.header && (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th
                  colSpan="2"
                  className="border px-4 py-2 border-gray-20 dark:border-dark-secondary text-center"
                >
                  Header
                </th>
              </tr>
            </thead>

            <tbody>
              {output.header.map((claim, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 border-gray-20 dark:border-dark-secondary">
                    {claim.claim}
                    <span className="text-xs text-gray-500 dark:text-dark-text-secondary ml-1">
                      {claim.claimDescriptions &&
                        `(${claim.claimDescriptions})`}
                    </span>
                  </td>
                  <td className="border px-4 py-2 border-gray-20 dark:border-dark-secondary">
                    {claim.value}
                    <span className="text-xs text-gray-500 dark:text-dark-text-secondary ml-1">
                      {claim.friendlyValue && `(${claim.friendlyValue})`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {output?.payload && (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th colSpan="2" className="border px-4 py-2 border-gray-20 dark:border-dark-secondary text-center">
                  Payload
                </th>
              </tr>
            </thead>

            <tbody>
              {output.payload.map((claim, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 border-gray-20 dark:border-dark-secondary">
                    {claim.claim}
                    <span className="text-xs text-gray-500 dark:text-dark-text-secondary ml-1">
                      {claim.claimDescriptions &&
                        `(${claim.claimDescriptions})`}
                    </span>
                  </td>
                  <td className="border px-4 py-2 border-gray-20 dark:border-dark-secondary">
                    {claim.value}
                    <span className="text-xs text-gray-500 dark:text-dark-text-secondary ml-1">
                      {claim.friendlyValue && `(${claim.friendlyValue})`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

JWTParser.title = "JWT Parser";
export default JWTParser;
