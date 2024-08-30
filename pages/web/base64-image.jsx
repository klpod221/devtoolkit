import React from "react";
import MyButton from "@components/MyButton";
import MyTabs from "@components/MyTabs";
import MyTab from "@components/MyTab";
import { toast } from "react-toastify";

const Base64Image = () => {
  return (
    <MyTabs>
      <MyTab title="Encoder">
        
      </MyTab>
      <MyTab title="Decoder">Decoder</MyTab>
    </MyTabs>
  );
};

Base64Image.title = "Base64 Image";
export default Base64Image;
