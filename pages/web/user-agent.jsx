import React from "react";
import { UAParser } from "ua-parser-js";

import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import ObjectOutput from "@components/ObjectOutput";

const UserAgentParser = () => {
  const [userAgent, setUserAgent] = React.useState("");
  const [output, setOutput] = React.useState({
    browser: "",
    engine: "",
    os: "",
    device: "",
    cpu: "",
  });

  React.useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  React.useEffect(() => {
    const parser = new UAParser();
    parser.setUA(userAgent);

    const browser = parser.getBrowser();
    const engine = parser.getEngine();
    const os = parser.getOS();
    const device = parser.getDevice();
    const cpu = parser.getCPU();

    setOutput({
      browser: `${browser.name || ""} ${browser.version || ""}`,
      engine: `${engine.name || ""} ${engine.version || ""}`,
      os: `${os.name || ""} ${os.version || ""}`,
      device: `${device.type || ""} ${device.vendor || ""} ${device.model || ""}`,
      cpu: `${cpu.architecture || ""}`,
    });
  }, [userAgent]);

  return (
    <MyCard className="w-full max-w-4xl">
      <MyCard.Header
        title="Input"
        helper="Enter your user agent to get information about your browser, engine, OS, device and CPU."
      />

      <MyTextarea
        className="w-full"
        label="User Agent"
        placeholder="Enter your user agent here..."
        rows={5}
        value={userAgent}
        onChange={setUserAgent}
      />

      <MyCard.Header title="Output" />

      <ObjectOutput data={output} />
    </MyCard>
  );
};

UserAgentParser.title = "User Agent Parser";
export default UserAgentParser;
