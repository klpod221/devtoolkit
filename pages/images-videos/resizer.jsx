import React from "react";
import { toast } from "react-toastify";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyFileInput from "@components/MyFileInput";
import MyImage from "@components/MyImage";
import MyInput from "@components/MyInput";
import MySwitch from "@components/MySwitch";

import { FaArrowRight } from "react-icons/fa";

const ImageResizer = () => {
  const [image, setImage] = React.useState(null);
  const [outputImage, setOutputImage] = React.useState(null);

  const [width, setWidth] = React.useState(null);
  const [height, setHeight] = React.useState(null);
  const [aspectRatio, setAspectRatio] = React.useState(null);
  const [keepAspectRatio, setKeepAspectRatio] = React.useState(true);

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
          setAspectRatio(img.width / img.height);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const onChangeWidth = (value) => {
    setWidth(value);
    if (keepAspectRatio) {
      setHeight(Math.round(value / aspectRatio));
    } else {
      setAspectRatio(value / height);
    }
  };

  const onChangeHeight = (value) => {
    setHeight(value);
    if (keepAspectRatio) {
      setWidth(Math.round(value * aspectRatio));
    } else {
      setAspectRatio(width / value);
    }
  };

  const resizeImage = () => {
    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    if (!width || !height) {
      toast.error("Please enter width and height.");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          setOutputImage(blob);
        });
      };
      img.src = URL.createObjectURL(image);

      toast.success("Image resized successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to resize image.");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter your image here">
          <MyButton onClick={() => resizeImage()}>
            Resize
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyFileInput
          type="image"
          multiple={false}
          onChange={setImage}
          size="small"
        />

        <div className="flex flex-wrap mb-4 space-x-2">
          {image && (
            <div className="relative group overflow-hidden rounded-lg w-32 h-32">
              <MyImage
                src={URL.createObjectURL(image)}
                alt="image"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap mb-4 space-x-2 w-full">
          <MyInput
            label="Width <small class='text-gray-500'>(px)</small>"
            placeholder="Width"
            type="number"
            value={width}
            onChange={onChangeWidth}
          />
          <MyInput
            label="Height <small class='text-gray-500'>(px)</small>"
            placeholder="Height"
            type="number"
            value={height}
            onChange={onChangeHeight}
          />
        </div>

        <MySwitch
          label="Keep aspect ratio"
          checked={keepAspectRatio}
          onChange={setKeepAspectRatio}
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
          {outputImage && (
            <div className="relative group overflow-hidden rounded-lg w-32 h-32">
              <MyImage
                src={URL.createObjectURL(outputImage)}
                alt="image"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ImageResizer.title = "Image Resizer";
export default ImageResizer;
