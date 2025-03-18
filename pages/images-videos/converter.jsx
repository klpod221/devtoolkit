import React from "react";
import JSZip from "jszip";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";

import convertImageFormat from "@utils/convertImageFormat";

import TwoColumn from "@components/TwoColumn";
import MyButton from "@/components/MyButton";
import MyCard from "@components/MyCard";
import MyFileInput from "@components/MyFileInput";
import MyImageViewer from "@components/MyImageViewer";

import { FaArrowRight } from "react-icons/fa";
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

  const convertImages = async () => {
    if (images.length === 0) {
      return;
    }

    setReturnImages([]);

    try {
      images.forEach((image) => {
        convertImageFormat(image, format).then((dataURL) => {
          setReturnImages((prev) => [...prev, dataURL]);
        });
      });

      toast.success("Images converted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to convert images");
      console.error(error);
    }
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
        <TwoColumn.Left>
          <MyCard.Header title="Image Input" helper="Select images to convert">
            <MyButton className="py-0" onClick={convertImages}>
              Convert
              <FaArrowRight className="ml-2" />
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

          <MyImageViewer
            images={images.map((image) => URL.createObjectURL(image))}
          />
        </TwoColumn.Left>
        <TwoColumn.Right>
          <MyCard.Header
            title={`Format: ${format}`}
            helper="Converted images will be displayed here"
          >
            {returnImages.length > 0 && (
              <MyButton
                size={"sm"}
                className="py-0"
                onClick={() => onDownloadAll()}
              >
                Download All
                <AiOutlineDownload className="ml-1 h-5 w-5" />
              </MyButton>
            )}
          </MyCard.Header>

          <div className="flex flex-wrap gap-2 overflow-y-auto">
            <MyImageViewer images={returnImages} />
          </div>
        </TwoColumn.Right>
      </TwoColumn>
    </>
  );
};

FormatConverter.title = "Image Format Converter";
export default FormatConverter;
