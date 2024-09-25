import React from "react";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";
import MySelect from "@components/MySelect";

const sortOptions = ["Ascending", "Descending", "Reverse", "Random"];

const ListSorterRandomizer = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const [sortOption, setSortOption] = React.useState("Ascending");

  React.useEffect(() => {
    const list = input
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);

    let sortedList = [];
    switch (sortOption) {
      case "Ascending":
        sortedList = list.sort();
        break;
      case "Descending":
        sortedList = list.sort((a, b) => (a > b ? -1 : 1));
        break;
      case "Reverse":
        sortedList = list.reverse();
        break;
      case "Random":
        sortedList = list.sort(() => Math.random() - 0.5);
        break;
      default:
        sortedList = list;
        break;
    }

    setOutput(sortedList.join("\n"));
  }, [input, sortOption]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter your list here" />

        <MyCodeEditor language="text" value={input} onChange={setInput} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Sorted/Randomized list">
          <MySelect value={sortOption} onChange={setSortOption}>
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </MySelect>
        </MyCard.Header>

        <MyCodeEditor
          language="text"
          value={output}
          options={{ minimap: { enabled: false }, readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ListSorterRandomizer.title = "List Sorter/Randomizer";
export default ListSorterRandomizer;
