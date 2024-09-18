import React from "react";
import { toast } from "react-toastify";

import MyButton from "@components/MyButton";
import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";

import { FaArrowRight } from "react-icons/fa";
import MyInput from "@components/MyInput";

const UrlParser = () => {
  const [url, setUrl] = React.useState("");
  const [parsedUrl, setParsedUrl] = React.useState({
    protocol: "",
    hostname: "",
    post: "",
    path: "",
    query: "",
    hash: "",
  });

  const parseUrl = () => {
    try {
      const urlObj = new URL(url);

      const query = urlObj.searchParams
        .toString()
        .replace(/&/g, "\n")
        .replace(/=/g, ": ")
        .replace(/\+/g, " ");

      setParsedUrl({
        protocol: urlObj.protocol.replace(":", ""),
        hostname: urlObj.hostname,
        post: urlObj.port,
        path: urlObj.pathname,
        query: query,
        hash: urlObj.hash,
      });
    } catch (error) {
      toast.error(error.message || "Invalid URL");
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.LeftContent>
        <MyCard.Header title="Input" helper="Enter the URL to parse">
          <MyButton size="sm" onClick={parseUrl}>
            Parse <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyInput
          id="url"
          label="URL"
          value={url}
          onChange={setUrl}
          placeholder="https://example.com"
          type="text"
          required
        />
      </TwoColumn.LeftContent>
      <TwoColumn.RightContent>
        <MyCard.Header title="Output" helper="Parsed URL will be shown here" />

        <div className="flex flex-col border border-gray-300 dark:border-dark-secondary dark:text-dark-text rounded-md">
          {Object.entries(parsedUrl).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col dark:text-dark-text p-5 border-b border-gray-300/50 dark:border-dark-secondary/50"
            >
              <span className="font-semibold capitalize">{key}:</span>
              <span className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </TwoColumn.RightContent>
    </TwoColumn>
  );
};

export default UrlParser;
