import React from "react";
import MyImage from "@components/MyImage";
import MyTabs from "@components/MyTabs";
import MyTab from "@components/MyTab";
import MyFileInput from "@components/MyFileInput";

const Base64Image = () => {
  const [images, setImages] = React.useState([]);

  const onChange = (files) => {
    console.log(files);
  }

  return (
    <MyTabs>
      <MyTab title="Encoder">
        <MyFileInput onChange={onChange} />
      </MyTab>
      <MyTab title="Decoder">Decoder</MyTab>
    </MyTabs>
  );
};

Base64Image.title = "Base64 Image";
export default Base64Image;
