import React from "react";

const MyCheckbox = ({ label, id, ...props }) => {
  const [checkboxId, setCheckboxId] = React.useState(id);

  React.useEffect(() => {
    if (!checkboxId) {
      setCheckboxId(Math.random().toString(36).substring(7));
    }
  }, [checkboxId]);

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="border-gray-300 rounded text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        id={checkboxId}
        {...props}
      />
      <label className="ml-2" htmlFor={checkboxId}>
        {label}
      </label>
    </div>
  );
};

export default MyCheckbox;
