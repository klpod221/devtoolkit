import React from "react";
import NextLink from "next/link";
import plantumlEncoder from "plantuml-encoder";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";
import MyCodeEditor from "@components/MyCodeEditor";
import MyImage from "@components/MyImage";

const PlantUMLEditor = () => {
  const [code, setCode] = React.useState(`@startuml
Alice -> Bob: Hello
Bob -> Alice: Hi
@enduml
`);
  const [error, setError] = React.useState('');
  const [output, setOutput] = React.useState('');

  React.useEffect(() => {
    const encoded = plantumlEncoder.encode(code);
    setOutput(`https://www.plantuml.com/plantuml/png/${encoded}`);
  }, [code]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter PlantUML code here" />

        <MyCodeEditor language="plantuml" value={code} onChange={setCode} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated PlantUML diagram" />

        <div className="flex flex-col w-fit h-fit">
          <MyImage
            src={output}
            alt="Generated PlantUML diagram"
            imageClass="w-full h-full"
          />
          {error && (
            <div className="text-red-500 text-sm mt-2">
              Error: {error.message}
            </div>
          )}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

PlantUMLEditor.title = "PlantUML Editor";
export default PlantUMLEditor;
