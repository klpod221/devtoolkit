import React from "react";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyCopyButton from "@components/MyCopyButton";
import MyTextarea from "@components/MyTextarea";

const BasicAuthGenerator = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [basicAuth, setBasicAuth] = React.useState("Authorization: Basic ");

  React.useEffect(() => {
    setBasicAuth(`Authorization: Basic ${btoa(`${username}:${password}`)}`);
  }, [username, password]);

  return (
    <MyCard className="w-full max-w-5xl">
      <MyCard.Header
        title="Basic Auth Generator"
        helper="Generate a basic auth header for your HTTP requests."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
        <MyInput
          label="Username"
          placeholder="Username"
          value={username}
          onChange={setUsername}
        />

        <MyInput
          label="Password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
      </div>

      <MyTextarea label="Basic Auth" value={basicAuth} readOnly />

      <MyCopyButton value={basicAuth} type="button" className="mt-2" />
    </MyCard>
  );
};

BasicAuthGenerator.title = "Basic Auth Generator";
export default BasicAuthGenerator;
