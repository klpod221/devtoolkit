import React from "react";

import Base64ImageEncoder from "@components/tools/Base64ImageEncoder";
import Base64ImageDecoder from "@components/tools/Base64ImageDecoder";
import MyTabs from "@components/MyTabs";
import MyTab from "@components/MyTab";

const Base64Image = () => {
  return (
    <MyTabs>
      <MyTab title="Encoder">
        <Base64ImageEncoder />
      </MyTab>
      <MyTab title="Decoder">
        <Base64ImageDecoder />
      </MyTab>
    </MyTabs>
  );
};

Base64Image.title = "Base64 Image";
export default Base64Image;
