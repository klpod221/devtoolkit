import React from "react";

import HTTP_STATUS_CODES from "@constants/http_status_codes";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";

import { AiOutlineSearch } from "react-icons/ai";

const HTTPStatusCode = () => {
  const [keyword, setKeyword] = React.useState("");
  const [codes, setCodes] = React.useState(HTTP_STATUS_CODES);

  React.useEffect(() => {
    if (keyword) {
      const filteredCodes = HTTP_STATUS_CODES.map((section) => {
        const codes = section.codes.filter((code) => {
          return (
            code.code.toString().includes(keyword) ||
            code.message.toLowerCase().includes(keyword.toLowerCase()) ||
            code.description.toLowerCase().includes(keyword.toLowerCase())
          );
        });

        return {
          title: section.title,
          codes,
        };
      });

      setCodes(filteredCodes);
    } else {
      setCodes(HTTP_STATUS_CODES);
    }
  }, [keyword]);

  return (
    <MyCard className="w-full max-h-[90vh] overflow-hidden">
      <MyInput
        type="search"
        placeholder="Search HTTP status code"
        icon={AiOutlineSearch}
        value={keyword}
        onChange={setKeyword}
        id="search-input"
      />

      <div className="overflow-y-auto">
        {codes.map((codeSections) => {
          return (
            <div key={codeSections.title}>
              <h2 className="text-xl font-bold mt-2">{codeSections.title}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {codeSections.codes.map((code) => {
                  return (
                    <div
                      key={code.code}
                      className="p-4 border border-gray-200 rounded-md"
                    >
                      <div className="text-lg font-bold">
                        {code.code} - {code.message}
                      </div>
                      <div className="text-sm text-gray-600">
                        {code.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MyCard>
  );
};

HTTPStatusCode.title = "HTTP status code";
export default HTTPStatusCode;
