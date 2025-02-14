import React from "react";

import MyCard from "@components/MyCard";

const TokenGenerator = () => {
  return (
    <MyCard className="w-full max-w-5xl">
      <MyCard.Header title="Token Generator" helper="Generate a random token" />
    </MyCard>
  );
};

TokenGenerator.title = "Token Generator";
export default TokenGenerator;
