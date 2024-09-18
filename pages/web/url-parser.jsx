import React from "react";

import MyButton from "@components/MyButton";
import MyCard from "@components/MyCard";
import TwoColumnLayout from "@components/TwoColumnLayout";

import { FaArrowRight } from "react-icons/fa";
import MyInput from "@components/MyInput";

const UrlParser = () => {
  return (
    <TwoColumnLayout>
      <TwoColumnLayout.LeftContent>
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
      </TwoColumnLayout.LeftContent>
      <TwoColumnLayout.RightContent>
        <MyCard.Header title="Output" helper="Parsed URL will be shown here" />
      </TwoColumnLayout.RightContent>
    </TwoColumnLayout>
  );
};

export default UrlParser;
