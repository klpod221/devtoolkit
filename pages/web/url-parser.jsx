import React from "react";

import MyButton from "@components/MyButton";
import MyCard from "@components/MyCard";
import TwoColumnComponent from "@components/TwoColumnComponent";

import { FaArrowRight } from "react-icons/fa";

const UrlParser = () => {
  return (
    <TwoColumnComponent>
      <TwoColumnComponent.LeftContent>
        <MyCard.Header title="Input" helper="Enter the URL to parse">
          <MyButton>Parse</MyButton>
        </MyCard.Header>
      </TwoColumnComponent.LeftContent>
      <TwoColumnComponent.RightContent></TwoColumnComponent.RightContent>
    </TwoColumnComponent>
  );
};

export default UrlParser;
