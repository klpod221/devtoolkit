import React from "react";
import Color from "color";
import { ChromePicker } from "react-color";

import MyInput from "./MyInput";

const MyColorPicker = ({
  value,
  onChange,
  showInput = true,
  label,
  labelStyle,
  ...props
}) => {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  const [color, setColor] = React.useState();

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = React.useMemo(
    () => (colorPicker) => {
      let color = Color("#000000");

      if (typeof colorPicker === "string") {
        if (colorPicker.length > 7 && colorPicker[0] === "#") {
          color = Color(colorPicker.slice(0, 7)).alpha(
            parseInt(colorPicker.slice(7), 16) / 255
          );
        } else {
          color = Color(colorPicker);
        }
      } else {
        color = Color(colorPicker.hex).alpha(colorPicker.rgb.a);
      }

      setColor(color);
      onChange(color.alpha() === 1 ? color.hex() : color.hexa());
    },
    [onChange]
  );

  React.useEffect(() => {
    handleChange(value);
  }, [value, handleChange]);

  return (
    <div>
      <div className="flex flex-col">
        {label && (
          <label htmlFor={props.id} className={`text-base ${labelStyle}`}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </label>
        )}

        <div className="flex items-center">
          <div
            className="w-10 h-10 p-1 rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 cursor-pointer dark:border-dark-secondary dark:bg-dark dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text"
            onClick={handleClick}
          >
            <div
              className="w-full h-full rounded-md"
              style={{
                backgroundColor: color ? color.string() : "transparent",
              }}
            />
          </div>

          {showInput && (
            <MyInput onChange={handleChange} className="ml-2" value={value} />
          )}
        </div>
      </div>
      {displayColorPicker ? (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={handleClose} />
          <ChromePicker
            color={{
              r: color.red(),
              g: color.green(),
              b: color.blue(),
              a: color.alpha(),
            }}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MyColorPicker;
