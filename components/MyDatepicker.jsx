import React from "react";
import moment from "moment";

import { FaCalendarAlt } from "react-icons/fa";

const MyDatepicker = ({ value, onChange, label, type = "date", format }) => {
  const [dateFormat, setDateFormat] = React.useState(format);

  const dateInputRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const showPicker = () => {
    dateInputRef.current.showPicker();
  };

  const onDateChange = (value) => {
    const date = moment(value).format(dateFormat);

    inputRef.current.value = date;
    onChange(date);
  };

  const onInputChange = (value) => {
    const date = moment(value, dateFormat);

    if (date.isValid()) {
      switch (type) {
        case "date":
          dateInputRef.current.value = date.format("YYYY-MM-DD");
          break;
        case "time":
          dateInputRef.current.value = date.format("HH:mm:ss");
          break;
        case "datetime-local":
          dateInputRef.current.value = date.format("YYYY-MM-DD HH:mm:ss");
          break;
        default:
          dateInputRef.current.value = date.format("YYYY-MM-DD");
          break;
      }

      onChange(date.format(dateFormat));
    }
  };

  React.useEffect(() => {
    let newDateFormat = format;

    if (!format) {
      switch (type) {
        case "date":
          newDateFormat = "YYYY-MM-DD";
          break;
        case "time":
          newDateFormat = "HH:mm:ss";
          break;
        case "datetime-local":
          newDateFormat = "YYYY-MM-DD HH:mm:ss";
          break;
        default:
          newDateFormat = "YYYY-MM-DD";
          break;
      }
    }

    setDateFormat(newDateFormat);

    if (value) {
      const date = moment(value, newDateFormat);

      if (date.isValid()) {
        inputRef.current.value = date.format(newDateFormat);
      }
    }
  }, [type, format, value, dateFormat]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {label && (
          <label className={`text-base`}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </label>
        )}
      </div>

      <div className="relative w-full border rounded-lg border-gray-200 dark:border-dark-secondary overflow-hidden">
        <input
          type={type}
          ref={dateInputRef}
          onClick={showPicker}
          className="absolute bottom-0 left-0 w-0 h-0 p-0 opacity-0"
          step={type === "datetime-local" ? 1 : undefined}
          onChange={(e) => onDateChange(e.target.value)}
        />

        <input
          type="text"
          ref={inputRef}
          className="block w-full border-none disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 focus:ring-cyan-500 dark:bg-dark dark:placeholder-dark-text-secondary dark:focus:text-dark-text p-2.5 text-sm pr-8"
          onChange={(e) => onInputChange(e.target.value)}
        />

        <button
          type="button"
          onClick={showPicker}
          className="absolute right-0 top-0 bottom-0 px-2 flex items-center justify-center text-gray-400"
        >
          <FaCalendarAlt className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MyDatepicker;
