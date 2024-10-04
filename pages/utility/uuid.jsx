import React from "react";
import { toast } from "react-toastify";

import uuidGenerator from "@utils/uuidGenerator";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MySelect from "@components/MySelect";
import MyInput from "@components/MyInput";

import { FaArrowRight } from "react-icons/fa";
import MyRangeSlider from "@components/MyRangeSlider";
import MyCodeEditor from "@components/MyCodeEditor";

const versionOptions = [
  { value: 1, label: "Version 1" },
  { value: 3, label: "Version 3" },
  { value: 4, label: "Version 4" },
  { value: 5, label: "Version 5" },
  { value: 6, label: "Version 6" },
  { value: 7, label: "Version 7" },
];

const UUIDGenerator = () => {
  const [version, setVersion] = React.useState(4);
  const [options, setOptions] = React.useState({
    quantity: 1,
    namespace: "",
    name: "",
  });
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [uuids, setUUIDs] = React.useState([]);

  React.useEffect(() => {
    if (version === 3 || version === 5) {
      setShowAdvanced(true);
    } else {
      setShowAdvanced(false);
    }
  }, [version]);

  const generateUUID = () => {
    try {
      if (showAdvanced && !options.namespace) {
        throw new Error("Namespace is required for Version 3 and 5");
      }

      if (showAdvanced && !options.name) {
        throw new Error("Name is required for Version 3 and 5");
      }

      const uuids = uuidGenerator(version, options);
      setUUIDs(uuids);

      toast.success("UUID generated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to generate UUID");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter optional for UUID generation"
        >
          <MyButton onClick={() => generateUUID()}>
            Generate <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MySelect
          label="Version"
          sizing="md"
          value={version}
          onChange={(value) => setVersion(Number(value))}
        >
          {versionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </MySelect>

        <MyRangeSlider
          label="Quantity"
          value={options.quantity}
          onChange={(value) => setOptions({ ...options, quantity: value })}
          max={1000}
          min={1}
        />

        {showAdvanced && (
          <>
            <MyInput
              label="Namespace"
              helper="Must be a valid UUID in the format 00000000-0000-0000-0000-000000000000"
              value={options.namespace}
              onChange={(value) => setOptions({ ...options, namespace: value })}
            />

            <MyInput
              label="Name"
              helper="Can be any string"
              value={options.name}
              onChange={(value) => setOptions({ ...options, name: value })}
            />
          </>
        )}
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated UUIDs" />

        <MyCodeEditor
          language="text"
          value={uuids.join("\n")}
          options={{ readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

UUIDGenerator.title = "UUID Generator";
export default UUIDGenerator;
