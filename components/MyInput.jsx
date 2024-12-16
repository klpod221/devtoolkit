import { Tooltip } from "flowbite-react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

/**
 * MyInput component
 * @param {string} type - The type of the input field (text, number, password, etc)
 * @param {string} value - The value of the input field
 * @param {number} min - The minimum value of the input field
 * @param {number} max - The maximum value of the input field
 * @param {function} onChange - The function to call when the input value changes
 * @param {string} label - The label of the input field
 * @param {string} labelStyle - The style of the label
 * @param {string} helper - The helper text to display
 * @param {JSX.Element} action - The action to display on the right side of the input field
 * @param {object} icon - The icon to display on the left side of the input field
 * @returns
 */
const MyInput = ({
  type = "text",
  value,
  min,
  max,
  onChange = () => {},
  label,
  labelStyle,
  helper,
  additional,
  className,
  icon: Icon,
  ...props
}) => {
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
      {label && (
        <div className="flex items-center">
          <label htmlFor={props.id} className={`text-base ${labelStyle}`}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </label>

          {helper && (
            <Tooltip content={helper}>
              <AiOutlineQuestionCircle className="text-gray-400 dark:text-dark-text-secondary ml-1" />
            </Tooltip>
          )}
        </div>
      )}

      <div className="relative w-full border border-gray-200 bg-gray-50 dark:bg-dark-secondary dark:border-gray-600 dark:placeholder-dark-text-secondary rounded-lg flex justify-between items-center focus-within:border-gray-400">
        {Icon && (
          <div className="flex items-center justify-center pl-2 pr-1">
            <Icon className="text-gray-400 dark:text-dark-text-secondary w-6 h-6" />
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onInputChange}
          className={`block w-full disabled:cursor-not-allowed disabled:opacity-50 bg-transparent text-gray-900 dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text py-2.5 text-sm outline-none focus:ring-0 dark:text-dark-text border-none ${Icon ? "pl-0" : "pl-2.5"} pr-1 ${className}`}
          {...props}
        />

        <div className="flex items-center justify-between px-1 space-x-1">
          {!label && helper && (
            <Tooltip content={helper}>
              <AiOutlineQuestionCircle className="text-gray-400 dark:text-dark-text-secondary" />
            </Tooltip>
          )}

          {additional}
        </div>
      </div>
    </div>
  );
};

export default MyInput;
