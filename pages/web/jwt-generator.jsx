import React from "react";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";

const JWTGenerator = () => {
  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the payload and secret key" />

        
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated JWT" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

JWTGenerator.title = "JWT Generator";
export default JWTGenerator;
