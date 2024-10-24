import React from "react";
import moment from "moment-timezone";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyDatepicker from "@components/MyDatepicker";
import MyInput from "@components/MyInput";
import MomentFormat from "@components/tools/MomentFormat";
import ObjectOutput from "@components/ObjectOutput";
import MyButton from "@components/MyButton";

const DateTimeConverter = () => {
  const [timezones, setTimezones] = React.useState([]);

  const [date, setDate] = React.useState(new Date());
  const [format, setFormat] = React.useState("YYYY-MM-DD HH:mm:ss");
  const [selectedTimezone, setSelectedTimezone] = React.useState(null);

  const [search, setSearch] = React.useState("");

  const [result, setResult] = React.useState({});

  React.useEffect(() => {
    const timezones = moment.tz.names();
    const localTimezone = moment.tz.guess();

    setSelectedTimezone(localTimezone);
    setTimezones(timezones);
  }, []);

  React.useEffect(() => {
    const result = {};
    let searchTimezone = timezones;

    if (search) {
      searchTimezone = timezones.filter((timezone) =>
        timezone.toLowerCase().includes(search.toLowerCase()),
      );
    }

    searchTimezone.forEach((timezone) => {
      const dateInTimezone = moment.tz(date, timezone);
      result[timezone] = dateInTimezone.format(format);
    });

    setResult(result);
  }, [date, format, timezones, search]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter the date and time to convert"
        >
          <MyButton onClick={() => setDate(new Date())}>Now</MyButton>
        </MyCard.Header>

        <MyDatepicker
          label="Date Time"
          value={date}
          onChange={setDate}
          type="datetime-local"
        />

        <MyInput
          label="Timezone"
          type="text"
          value={selectedTimezone}
          onChange={setSelectedTimezone}
          placeholder="Select timezone"
          list="timezones"
          autoComplete="off"
        />

        <datalist id="timezones" className="bg-white dark:bg-gray-800">
          {timezones.map((timezone, index) => (
            <option key={index} value={timezone} />
          ))}
        </datalist>

        <MyInput
          label="Format"
          type="text"
          value={format}
          onChange={setFormat}
          placeholder="Enter format"
          helper="You can write your own format following the moment.js format"
        />

        <span>moment.js format tokens:</span>
        <div className="overflow-y-auto h-full max-h-[700px]">
          <MomentFormat />
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Result will be shown here" />

        <MyInput
          type="text"
          value={search}
          onChange={setSearch}
          placeholder="Search timezone"
          list="timezones"
          autoComplete="off"
        />

        <div className="overflow-y-auto h-full max-h-[1000px]">
          <ObjectOutput object={result} />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DateTimeConverter.title = "Date Time Converter";
export default DateTimeConverter;
