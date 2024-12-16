import React from "react";
import jwt from "jwt-simple";
import _ from "lodash";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyCodeEditor from "@components/MyCodeEditor";
import MyTextarea from "@components/MyTextarea";

const JWTGenerator = () => {
  const [key, setKey] = React.useState("klpod221");
  const [algorithm, setAlgorithm] = React.useState("HS256");
  const [payload, setPayload] = React.useState(`{
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
}`);

  const [error, setError] = React.useState(null);

  const [output, setOutput] = React.useState(null);

  const handlePayloadChange = (value) => {
    try {
      JSON.parse(value);
      setPayload(value);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const createJWT = React.useMemo(
    () =>
      _.debounce(() => {
        try {
          if (error) {
            return;
          }

          const token = jwt.encode(JSON.parse(payload), key, algorithm);

          setOutput(token);
        } catch (e) {
          setOutput(e.message);
        }
      }, 200),
    [payload, key, algorithm, error],
  );

  React.useEffect(() => {
    createJWT();
  }, [createJWT]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Payload">
          <div className="text-xs text-red-500 dark:text-red-400">{error}</div>
        </MyCard.Header>

        <MyCodeEditor
          value={payload}
          onChange={handlePayloadChange}
          language="json"
          options={{
            minimap: { enabled: false },
          }}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="JWT Generator"
          helper="Generate JWT using the payload and secret key"
        />

        <MyInput
          label="Secret Key"
          value={key}
          onChange={setKey}
          placeholder="Insert your secret key"
          additional={
            <div className="text-sm text-gray-400 dark:text-dark-text-secondary">
              {key.length}
            </div>
          }
        />

        <MySelect
          label="Algorithm"
          sizing="md"
          value={algorithm}
          onChange={setAlgorithm}
        >
          <option value="HS256">HS256</option>
          <option value="HS384">HS384</option>
          <option value="HS512">HS512</option>
          <option value="RS256">RS256</option>
        </MySelect>

        <MyTextarea
          label="Generated JWT"
          value={output}
          onChange={setOutput}
          placeholder="Generated JWT will appear here"
          rows={10}
          readOnly
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

JWTGenerator.title = "JWT Generator";
export default JWTGenerator;
