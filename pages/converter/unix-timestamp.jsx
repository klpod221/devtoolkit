import React from "react";
import moment from "moment-timezone";

import TwoColumn from "@components/TwoColumn";
import ObjectOutput from "@components/ObjectOutput";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyDatepicker from "@components/MyDatepicker";

const UnixTimestampConverter = () => {
  const [timestamp, setTimestamp] = React.useState(Date.now());
  const [output, setOutput] = React.useState({
    utc: "",
    local: "",
    dayOfYear: "",
    weekOfYear: "",
    dayOfWeek: "",
    dayOfMonth: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    second: "",
    millisecond: "",
  });

  React.useEffect(() => {
    const rawNum = Number(timestamp);
    // If it's a 10-digit number (seconds), convert to milliseconds
    const ms =
      Number.isFinite(rawNum) && String(Math.floor(Math.abs(rawNum))).length <= 10
        ? rawNum * 1000
        : rawNum;

    const date = moment(ms);
    if (!date.isValid()) {
      return;
    }

    setOutput({
      utc: date.clone().utc().format(),
      local: date.clone().local().format(),
      dayOfYear: date.dayOfYear(),
      weekOfYear: date.week(),
      dayOfWeek: date.day(),
      dayOfMonth: date.date(),
      month: date.month() + 1,
      year: date.year(),
      hour: date.hours(),
      minute: date.minutes(),
      second: date.seconds(),
      millisecond: date.milliseconds(),
    });
  }, [timestamp]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the Unix Timestamp">
          <MyButton onClick={() => setTimestamp(Date.now())}>Now</MyButton>
        </MyCard.Header>

        <MyDatepicker
          label="Unix Timestamp"
          value={timestamp}
          onChange={setTimestamp}
          type="datetime-local"
          format="x"
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Converted Date and Time" />

        <div className="overflow-y-auto">
          <ObjectOutput data={output} />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

UnixTimestampConverter.title = "Unix Timestamp Converter";
export default UnixTimestampConverter;
