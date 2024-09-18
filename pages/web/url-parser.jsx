import React from "react";

import MyButton from "@components/MyButton";
import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";

import { FaArrowRight } from "react-icons/fa";
import MyInput from "@components/MyInput";

const UrlParser = () => {
  return (
    <TwoColumn>
      <TwoColumn.LeftContent>
        <MyCard.Header title="Input" helper="Enter the URL to parse">
          <MyButton size="sm">
            Parse <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyInput
          id="url"
          label="URL"
          placeholder="https://example.com"
          type="text"
          required
        />
      </TwoColumn.LeftContent>
      <TwoColumn.RightContent>
        <MyCard.Header title="Output" helper="Parsed URL will be shown here" />
      </TwoColumn.RightContent>
    </TwoColumn>
  );
};

export default UrlParser;
