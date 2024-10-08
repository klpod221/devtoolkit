import React from "react";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyDatepicker from "@components/MyDatepicker";

import { FaArrowRight } from "react-icons/fa";

const DateTimeConverter = () => {
  const [timestamp, setTimestamp] = React.useState(Date.now());

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the Unix Timestamp">
          <MyButton onClick={() => setTimestamp(Date.now())}>
            Now
          </MyButton>

          <MyButton>
            Convert
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyDatepicker
          label="Unix Timestamp"
          value={timestamp}
          onChange={setTimestamp}
          type="datetime-local"
          format="x"
        />
      </TwoColumn.Left>
      <TwoColumn.Right></TwoColumn.Right>
    </TwoColumn>
  );
};

DateTimeConverter.title = "Date-time Converter";
export default DateTimeConverter;
