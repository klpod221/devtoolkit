import React from "react";

import Base64ImageEncoder from "@components/tools/Base64ImageEncoder";
import Base64ImageDecoder from "@components/tools/Base64ImageDecoder";
import MyTabs from "@components/MyTabs";

const Base64Image = () => {
  return (
    <MyTabs>
      <MyTabs.Tab title="Encoder">
        <Base64ImageEncoder />
      </MyTabs.Tab>
      <MyTabs.Tab title="Decoder">
        <Base64ImageDecoder />
      </MyTabs.Tab>
    </MyTabs>
  );
};

Base64Image.title = "Base64 Image";
export default Base64Image;
