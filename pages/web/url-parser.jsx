import React from "react";
import { toast } from "react-toastify";

import TwoColumn from "@components/TwoColumn";
import ObjectOutput from "@components/ObjectOutput";
import MyButton from "@components/MyButton";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";

import { FaArrowRight } from "react-icons/fa";

const UrlParser = () => {
  const [url, setUrl] = React.useState("");
  const [parsedUrl, setParsedUrl] = React.useState({});

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
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the URL to parse">
          <MyButton onClick={parseUrl}>
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
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Parsed URL will be shown here" />

        <ObjectOutput object={parsedUrl} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

export default UrlParser;
