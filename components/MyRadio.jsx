import React from "react";

const MyRadio = ({ label, id, ...props }) => {
  const [radioId, setRadioId] = React.useState(id);

  React.useEffect(() => {
    if (!radioId) {
      setRadioId(Math.random().toString(36).substring(7));
    }
  }, [radioId]);

  return (
    <div className="flex items-center">
      <input
        type="radio"
        className="border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        id={radioId}
        {...props}
      />
      <label className="ml-1" htmlFor={radioId}>
        {label}
      </label>
    </div>
  );
};

export default MyRadio;
