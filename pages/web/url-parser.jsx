import React from "react";
import { toast } from "react-toastify";

import TwoColumn from "@components/TwoColumn";
import ObjectOutput from "@components/ObjectOutput";
import MyButton from "@components/MyButton";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";

import { FaArrowRight } from "react-icons/fa";

// TODO: Need to handle more cases: username:password@hostname:port/path?query#hash
// TODO: Params should be shown as key-value pairs
const UrlParser = () => {
  const [url, setUrl] = React.useState("");
  const [parsedUrl, setParsedUrl] = React.useState({});

  const parseUrl = () => {
    try {
      const urlObj = new URL(url);

      const params = {};
      urlObj.searchParams.forEach((val, key) => {
        params[key] = val;
      });

      setParsedUrl({
        protocol: urlObj.protocol.replace(":", ""),
        origin: urlObj.origin,
        hostname: urlObj.hostname,
        port: urlObj.port || "(default)",
        pathname: urlObj.pathname,
        search: urlObj.search,
        params: Object.keys(params).length > 0 ? JSON.stringify(params, null, 2) : "None",
        hash: urlObj.hash || "None",
        username: urlObj.username || "None",
        password: urlObj.password || "None",
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

        <ObjectOutput data={parsedUrl} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

UrlParser.title = "URL Parser";
export default UrlParser;
