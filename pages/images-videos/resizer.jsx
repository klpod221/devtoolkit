import React from "react";
import { toast } from "react-toastify";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyFileInput from "@components/MyFileInput";
import MyInput from "@components/MyInput";
import MyCheckbox from "@components/MyCheckbox";
import MyImageViewer from "@components/MyImageViewer";

import { FaArrowRight } from "react-icons/fa";

const ImageResizer = () => {
  const [image, setImage] = React.useState(null);
  const [inputUrl, setInputUrl] = React.useState(null);
  const [outputImage, setOutputImage] = React.useState(null);
  const [outputUrl, setOutputUrl] = React.useState(null);

  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [aspectRatio, setAspectRatio] = React.useState(null);
  const [keepAspectRatio, setKeepAspectRatio] = React.useState(true);

  React.useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setInputUrl(url);

      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width > 0 && img.height > 0 ? img.width / img.height : 1);
      };
      img.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setInputUrl(null);
      setWidth("");
      setHeight("");
      setAspectRatio(null);
    }
  }, [image]);

  React.useEffect(() => {
    if (outputImage) {
      const url = URL.createObjectURL(outputImage);
      setOutputUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setOutputUrl(null);
    }
  }, [outputImage]);

  const onChangeWidth = (val) => {
    setWidth(val);
    const num = Number(val);
    if (keepAspectRatio && aspectRatio && num > 0) {
      setHeight(Math.round(num / aspectRatio));
    }
  };

  const onChangeHeight = (val) => {
    setHeight(val);
    const num = Number(val);
    if (keepAspectRatio && aspectRatio && num > 0) {
      setWidth(Math.round(num * aspectRatio));
    }
  };

  const resizeImage = () => {
    if (!image || !inputUrl) {
      toast.error("Please select an image.");
      return;
    }

    const targetW = Number(width);
    const targetH = Number(height);

    if (!targetW || !targetH || targetW <= 0 || targetH <= 0) {
      toast.error("Please enter valid width and height.");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.onload = () => {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.drawImage(img, 0, 0, targetW, targetH);
        canvas.toBlob((blob) => {
          if (blob) {
            setOutputImage(blob);
            toast.success("Image resized successfully.");
          } else {
            toast.error("Failed to generate image blob.");
          }
        }, image.type || "image/png");
      };
      img.onerror = () => {
        toast.error("Failed to load source image.");
      };
      img.src = inputUrl;
    } catch (error) {
      toast.error(error.message || "Failed to resize image.");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter your image here">
          <MyButton onClick={resizeImage}>
            Resize
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyFileInput
          type="image"
          multiple={false}
          onChange={setImage}
        />

        <div className="flex flex-wrap mb-4 space-x-2">
          {inputUrl && (
            <div className="relative group overflow-hidden rounded-lg w-32 h-32">
              <MyImageViewer src={inputUrl} alt="source" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap mb-4 space-x-2 w-full">
          <MyInput
            label="Width (px)"
            placeholder="Width"
            type="number"
            value={width}
            onChange={onChangeWidth}
          />
          <MyInput
            label="Height (px)"
            placeholder="Height"
            type="number"
            value={height}
            onChange={onChangeHeight}
          />
        </div>

        <MyCheckbox
          label="Keep aspect ratio"
          checked={keepAspectRatio}
          onChange={(e) => setKeepAspectRatio(e.target.checked)}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Your resized image">
          {width && height && (
            <span className="text-sm text-gray-500">
              {width} x {height}
            </span>
          )}
        </MyCard.Header>

        <div className="flex flex-wrap mb-4 space-x-2">
          {outputUrl && (
            <MyImageViewer
              src={outputUrl}
              alt="resized"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ImageResizer.title = "Image Resizer";
export default ImageResizer;
