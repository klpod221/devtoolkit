import React from "react";
import { toast } from "react-toastify";

import imageToBase64 from "@utils/imageToBase64";

import MyFileInput from "@components/MyFileInput";
import MyButton from "@components/MyButton";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import MyImageViewer from "@components/MyImageViewer";

const Base64ImageEncoder = () => {
  const [image, setImage] = React.useState(null);
  const [outputType, setOutputType] = React.useState("base64");
  const [output, setOutput] = React.useState({
    base64: "",
    dataUrl: "",
    imgTag: "",
  });

  const convertImages = () => {
    if (image.length === 0) {
      return;
    }

    setOutput({ base64: "", dataUrl: "", imgTag: "" });

    imageToBase64(image).then((result) => {
      let base64 = result.split(",")[1];
      let dataUrl = result;
      let imgTag = `<img src="${dataUrl}" alt="image" />`;

      setOutput((prev) => ({
        base64: prev.base64 + base64,
        dataUrl: prev.dataUrl + dataUrl,
        imgTag: prev.imgTag + imgTag,
      }));
    });

    toast.success("Images converted successfully");
  };

  return (
    <>
      <div className="flex flex-wrap mb-4 space-x-2">
        {image && (
          <div className="relative group overflow-hidden rounded-lg w-32 h-32">
            <MyImageViewer src={URL.createObjectURL(image)} />
          </div>
        )}
      </div>

      <MyFileInput onChange={setImage} multiple={false} type="image" />

      <div className="flex justify-center items-center space-x-4 my-2">
        <MyButton onClick={convertImages}>Convert</MyButton>
      </div>

      <div className="flex items-center mb-2">
        <span>Output</span>
        <MySelect value={outputType} onChange={setOutputType} className="ml-2">
          <option value="base64">Base64</option>
          <option value="dataUrl">Data URL</option>
          <option value="imgTag">Image Tag</option>
        </MySelect>
      </div>

      <div className="h-24">
        <MyTextarea value={output[outputType]} rows={4} readOnly />
      </div>
    </>
  );
};

export default Base64ImageEncoder;
