import React from "react";
import { types, extensions } from "mime-types";

import MyCard from "@components/MyCard";
import MySelect from "@components/MySelect";

const MIMETypes = () => {
  const [selectedType, setSelectedType] = React.useState("");
  const [outputType, setOutputType] = React.useState([]);

  const [selectedExtension, setSelectedExtension] = React.useState("");
  const [outputExtension, setOutputExtension] = React.useState("");

  React.useEffect(() => {
    console.log("MIME Types", types);
    console.log("Extensions", extensions);
  }, []);

  React.useEffect(() => {
    if (selectedType) {
      setOutputType(extensions[selectedType] || []);
    }
  }, [selectedType]);

  React.useEffect(() => {
    if (selectedExtension) {
      setOutputExtension(types[selectedExtension] || "");
    }
  }, [selectedExtension]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-2">
        <MyCard className="w-full">
          <MyCard.Header
            title={"MIME type to extension"}
            helper={"Know which file extensions are associated to a mime-type"}
          />

          <MySelect
            label="MIME Type"
            value={selectedType}
            onChange={setSelectedType}
            sizing="md"
          >
            <option value="" disabled>
              Select a MIME type
            </option>
            {Object.keys(extensions).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </MySelect>

          {outputType.length > 0 && (
            <div className="mt-4">
              <h3 className="">
                Extensions of files with the <kbd>{selectedType}</kbd> MIME
                type:
              </h3>
              <div className="flex flex-wrap gap-2">
                {outputType.map((ext) => (
                  <kbd key={ext}>.{ext}</kbd>
                ))}
              </div>
            </div>
          )}
        </MyCard>
        <MyCard className="w-full">
          <MyCard.Header
            title={"Extension to MIME type"}
            helper={"Know which mime-type is associated to a file extension"}
          />

          <MySelect
            label="Extension"
            value={selectedExtension}
            onChange={setSelectedExtension}
            sizing="md"
          >
            <option value="" disabled>
              Select an extension
            </option>
            {Object.keys(types).map((ext) => (
              <option key={ext} value={ext}>
                .{ext}
              </option>
            ))}
          </MySelect>

          {outputExtension && (
            <div className="mt-4">
              <h3 className="">
                The <kbd>.{selectedExtension}</kbd> file extension is associated
                with the following MIME type:
              </h3>
              <kbd>{outputExtension}</kbd>
            </div>
          )}
        </MyCard>
      </div>

      <MyCard className="w-full">
        <div className="overflow-x-auto">
          <table>
            <thead className="sticky top-0 bg-white dark:bg-dark">
              <tr>
                <th className="px-4 py-2">MIME Type</th>
                <th className="px-4 py-2">Extensions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(extensions).map((type) => (
                <tr key={type}>
                  <td className="border px-4 py-2">{type}</td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      {extensions[type].map((ext) => (
                        <kbd key={ext}>.{ext}</kbd>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MyCard>
    </div>
  );
};

MIMETypes.title = "MIME Types";
export default MIMETypes;
