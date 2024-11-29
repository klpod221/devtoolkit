import React from "react";
import { RangeSlider } from "flowbite-react";

const MyRangeSlider = ({
  value,
  onChange = () => {},
  label,
  className,
  min,
  max,
  ...props
}) => {
  const theme = {
    root: {
      base: "flex",
    },
    field: {
      base: "relative w-full",
      input: {
        base: "w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-dark-secondary",
        sizes: {
          sm: "h-1",
          md: "h-2",
          lg: "h-3",
        },
      },
    },
  };

  const onRangeChange = (e) => {
    const value = parseInt(e.target.value);

    if (value < min) {
      onChange(min);
      return;
    }

    if (value > max) {
      onChange(max);
      return;
    }

    onChange(value);
  };

  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}

      <div className="flex items-center gap-2">
        <RangeSlider
          theme={theme}
          value={value}
          onChange={onRangeChange}
          className={`w-full ${className}`}
          min={min}
          max={max}
          {...props}
        />
        <input
          type="number"
          value={value}
          onChange={onRangeChange}
          className="block border disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text text-sm rounded-lg"
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};

export default MyRangeSlider;
