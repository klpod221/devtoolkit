import React from "react";
import JSZip from "jszip";
import { Button } from "flowbite-react";

import TwoColumn from "@components/TwoColumn";
import MyButton from "@/components/MyButton";
import MyCard from "@components/MyCard";
import MyImage from "@components/MyImage";
import MyFileInput from "@components/MyFileInput";

import { BsPlayFill } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";

const formatList = ["jpg", "png", "webp", "ico", "svg"];

const FormatConverter = () => {
  const [format, setFormat] = React.useState("jpg");

  const [images, setImages] = React.useState([]);
  const [imageNames, setImageNames] = React.useState([]);
  const [returnImages, setReturnImages] = React.useState([]);

  React.useEffect(() => {
    setReturnImages([]);
  }, [format]);

  const convertImages = () => {
    if (images.length === 0) {
      return;
    }

    setReturnImages([]);

    images.forEach((image) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          // if format is ico, resize image to 32x32 pixels
          if (format === "ico") {
            ctx.drawImage(img, 0, 0, 32, 32);
          }

          ctx.drawImage(img, 0, 0);

          const dataURL = canvas.toDataURL(`image/${format}`);
          setReturnImages((prev) => [...prev, dataURL]);
        };
      };
      reader.readAsDataURL(image);
    });
  };

  const onFileChange = (files) => {
    setImages(files);

    const names = files.map((file) => {
      const split = file.name.split(".");
      split.pop();
      return split.join(".");
    });
    setImageNames(names);
  };

  const onDownload = (image) => {
    const a = document.createElement("a");
    a.href = image;
    const imageName = imageNames[returnImages.indexOf(image)];
    a.download = imageName + "." + format;
    a.click();
  };

  const onDownloadAll = async () => {
    if (returnImages.length === 0) {
      return;
    }

    if (returnImages.length === 1) {
      onDownload(returnImages[0]);
      return;
    }

    const zip = new JSZip();
    returnImages.forEach((image, index) => {
      const imageName = imageNames[index];
      const base64 = image.split(",")[1];
      zip.file(`${imageName}.${format}`, base64, { base64: true });
    });

    // generate zip file
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    // download zip file
    const a = document.createElement("a");
    a.href = url;
    a.download = "images.zip";
    a.click();
  };

  return (
    <>
      <TwoColumn>
        <TwoColumn.LeftContent>
          <MyCard.Header title="Image Input">
            <MyButton size={"sm"} className="py-0" onClick={convertImages}>
              Convert
              <BsPlayFill className="h-5 w-5" />
            </MyButton>
          </MyCard.Header>

          <MyFileInput onChange={onFileChange} multiple={true} type="image" />
          <Button.Group>
            {formatList.map((f) => (
              <Button
                key={f}
                onClick={() => setFormat(f)}
                color={format === f ? "blue" : "gray"}
                size={"sm"}
              >
                {f}
              </Button>
            ))}
          </Button.Group>

          <div className="flex flex-wrap mt-4 gap-2">
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
        </TwoColumn.LeftContent>
        <TwoColumn.RightContent>
          <MyCard.Header title={`Format: ${format}`}>
            {returnImages.length > 0 && (
              <Button
                size={"sm"}
                className="py-0"
                onClick={() => onDownloadAll()}
                color="success"
              >
                Download All
                <AiOutlineDownload className="ml-1 h-5 w-5" />
              </Button>
            )}
          </MyCard.Header>

          <div className="flex flex-wrap gap-2">
            {returnImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg w-40 h-40"
              >
                <MyImage
                  src={image}
                  alt="image"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </TwoColumn.RightContent>
      </TwoColumn>
    </>
  );
};

FormatConverter.title = "Image Format Converter";
export default FormatConverter;
