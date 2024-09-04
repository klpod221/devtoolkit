import React from "react";
import MyImage from "@components/MyImage";
import MyTabs from "@components/MyTabs";
import MyTab from "@components/MyTab";
import { toast } from "react-toastify";

const Base64Image = () => {
  return (
    <MyTabs>
      <MyTab title="Encoder">
        <MyImage src="/logo.webp" alt="logo" />
      </MyTab>
      <MyTab title="Decoder">Decoder</MyTab>
    </MyTabs>
  );
};

Base64Image.title = "Base64 Image";
export default Base64Image;
