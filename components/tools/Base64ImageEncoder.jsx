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
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [outputType, setOutputType] = React.useState("base64");
  const [output, setOutput] = React.useState({
    base64: "",
    dataUrl: "",
    imgTag: "",
  });

  React.useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const convertImages = () => {
    if (!image) {
      toast.error("Please select an image first");
      return;
    }

    setOutput({ base64: "", dataUrl: "", imgTag: "" });

    imageToBase64(image)
      .then((result) => {
        const base64 = result.split(",")[1] || "";
        const dataUrl = result;
        const imgTag = `<img src="${dataUrl}" alt="image" />`;

        setOutput({
          base64,
          dataUrl,
          imgTag,
        });
        toast.success("Image converted successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to convert image");
      });
  };

  return (
    <>
      <div className="flex flex-wrap mb-4 space-x-2">
        {previewUrl && (
          <div className="relative group overflow-hidden rounded-lg w-32 h-32">
            <MyImageViewer src={previewUrl} />
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
