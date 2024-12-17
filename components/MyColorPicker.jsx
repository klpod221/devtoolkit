import React from "react";
import Color from "color";
import _ from "lodash";
import { ChromePicker } from "react-color";

const MyColorPicker = ({
  value,
  onChange,
  showInput = true,
  label,
  labelStyle,
  ...props
}) => {
  const colorInput = React.useRef();

  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
  const [color, setColor] = React.useState();

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const onInputChange = (value) => {
    if (value) {
      handleChange(value);
    }
  };

  const handleChange = React.useMemo(
    () =>
      _.debounce((colorPicker, isUpdateInput = false) => {
        try {
          let color = Color("#000000");

          if (typeof colorPicker === "string") {
            if (colorPicker.length > 7 && colorPicker[0] === "#") {
              color = Color(colorPicker.slice(0, 7)).alpha(
                parseInt(colorPicker.slice(7), 16) / 255,
              );
            } else {
              color = Color(colorPicker);
            }
          } else {
            color = Color(colorPicker.hex).alpha(colorPicker.rgb.a);
          }

          if (isUpdateInput) {
            colorInput.current.value =
              color.alpha() === 1 ? color.hex() : color.hexa();
          }

          setColor(color);
          onChange(color.alpha() === 1 ? color.hex() : color.hexa());
        } catch (e) {}
      }, 10),
    [onChange],
  );

  React.useEffect(() => {
    if (value) {
      handleChange(value, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <input
              ref={colorInput}
              type="text"
              onChange={(e) => onInputChange(e.target.value)}
              className="block ml-2 border disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text p-2.5 text-sm rounded-lg"
            />
          )}
        </div>
      </div>
      {displayColorPicker ? (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={handleClose} />
          <ChromePicker
            color={{
              r: color ? color.red() : 0,
              g: color ? color.green() : 0,
              b: color ? color.blue() : 0,
              a: color ? color.alpha() : 1,
            }}
            onChange={(color) => handleChange(color, true)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MyColorPicker;
