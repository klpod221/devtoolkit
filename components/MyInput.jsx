import { TextInput, Tooltip } from "flowbite-react";

import { AiOutlineQuestionCircle } from "react-icons/ai";

const MyInput = ({
  type = "text",
  value,
  min,
  max,
  onChange = () => {},
  label,
  labelStyle,
  helper,
  ...props
}) => {
  const theme = {
    base: "flex",
    addon:
      "inline-flex items-center rounded-l-md border border-r-0 border-gray-200 bg-gray-200 px-3 text-sm text-gray-400 dark:border-gray-600 dark:bg-gray-600 dark:text-dark-text-secondary",
    field: {
      base: "relative w-full",
      icon: {
        base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
        svg: "h-5 w-5 text-gray-500 dark:text-dark-text-secondary",
      },
      rightIcon: {
        base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
        svg: "h-5 w-5 text-gray-500 dark:text-dark-text-secondary",
      },
      input: {
        base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
        sizes: {
          sm: "p-2 sm:text-xs",
          md: "p-2.5 text-sm",
          lg: "p-4 sm:text-base",
        },
        colors: {
          gray: "border-gray-200 bg-gray-50 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text",
          info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          failure:
            "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          warning:
            "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          success:
            "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
        },
        withRightIcon: {
          on: "pr-10",
          off: "",
        },
        withIcon: {
          on: "pl-10",
          off: "",
        },
        withAddon: {
          on: "rounded-r-lg",
          off: "rounded-lg",
        },
        withShadow: {
          on: "shadow-sm dark:shadow-sm-light",
          off: "",
        },
      },
    },
  };

  const onInputChange = (e) => {
    if (type === "number") {
      if (min && e.target.value < min) {
        onChange(min, e);
        return;
      } else if (max && e.target.value > max) {
        onChange(max, e);
        return;
      }
    }

    onChange(e.target.value, e);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        {label && (
          <label htmlFor={props.id} className={`text-base ${labelStyle}`}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </label>
        )}

        {helper && (
          <Tooltip content={helper}>
            <AiOutlineQuestionCircle className="text-gray-400 dark:text-dark-text-secondary ml-1" />
          </Tooltip>
        )}
      </div>

      <TextInput
        theme={theme}
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={onInputChange}
        {...props}
      />
    </div>
  );
};

export default MyInput;
