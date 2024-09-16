import React from "react";
import { toast } from "react-toastify";
import MyImage from "@components/MyImage";
import MyFileInput from "@components/MyFileInput";
import MyButton from "@components/MyButton";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";

const Base64ImageEncoder = () => {
  const [images, setImages] = React.useState([]);
  const [outputType, setOutputType] = React.useState("base64");
  const [output, setOutput] = React.useState({
    base64: "",
    dataUrl: "",
    imgTag: "",
  });

  const convertImages = () => {
    if (images.length === 0) {
      return;
    }

    setOutput({ base64: "", dataUrl: "", imgTag: "" });

    images.forEach((image) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const result = e.target.result;
        let base64 = result.split(",")[1];
        let dataUrl = result;
        let imgTag = `<img src="${dataUrl}" alt="image" />`;

        setOutput((prev) => ({
          base64: prev.base64 + base64,
          dataUrl: prev.dataUrl + dataUrl,
          imgTag: prev.imgTag + imgTag,
        }));
      };
      reader.readAsDataURL(image);
    });

    toast.success("Images converted successfully");
  };

  return (
    <>
      <div className="flex flex-wrap mb-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg w-40 h-40"
          >
            <MyImage
              src={URL.createObjectURL(image)}
              alt="image"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <MyFileInput onChange={setImages} multiple={false} type="image" />

      <div className="flex justify-center items-center space-x-4 my-2">
        <MyButton onClick={convertImages}>Convert</MyButton>
      </div>

      <div className="font-semibold text-gray-800 dark:text-dark-text flex items-center mb-2">
        <span>Output</span>
        <MySelect
          value={outputType}
          onChange={setOutputType}
          className="ml-2"
          sizing="sm"
        >
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
