import React from "react";
import NextImage from "next/image";
import TwoColumnLayout from "@/components/layouts/TwoColumnLayout";
import JSZip from "jszip";
import { Button, FileInput, Label } from "flowbite-react";
import { AiOutlineCloudUpload, AiOutlineEye } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineDownload } from "react-icons/ai";

const formatList = ["jpg", "png", "webp", "bmp", "svg"];

const FormatConverter = () => {
  const [format, setFormat] = React.useState("jpg");

  const [images, setImages] = React.useState([]);
  const [imageNames, setImageNames] = React.useState([]);
  const [returnImages, setReturnImages] = React.useState([]);

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

          ctx.drawImage(img, 0, 0);

          const dataURL = canvas.toDataURL(`image/${format}`);
          setReturnImages((prev) => [...prev, dataURL]);
        };
      };
      reader.readAsDataURL(image);
    });
  };

  const onFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files).filter((file) =>
      file.type.includes("image")
    );
    setImages(fileArray);

    const names = fileArray.map((file) => {
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
    // add all images to zip file if there are images
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

  const leftContent = (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Image Input
        </div>

        <Button size={"sm"} className="py-0" onClick={convertImages}>
          Convert
          <BsPlayFill className="h-5 w-5" />
        </Button>
      </div>

      <Label
        htmlFor="dropzone-file"
        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <AiOutlineCloudUpload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You can upload multiple images (jpg, png, svg, etc.)
          </p>
        </div>
        <FileInput
          className="hidden"
          multiple
          id="dropzone-file"
          accept="image/*"
          onChange={onFileChange}
        />
      </Label>
      <Button.Group>
        {formatList.map((f) => (
          <Button
            key={f}
            onClick={() => setFormat(f)}
            className={`border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 enabled:hover:bg-blue-500 enabled:hover:text-white ${
              format === f ? "bg-blue-500 text-white" : ""
            }`}
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
            <NextImage
              src={URL.createObjectURL(image)}
              width={150}
              height={150}
              alt="image"
              className="object-cover w-full h-full"
            />

            <button className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 items-center justify-center flex -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
              <AiOutlineEye className="text-white h-8 w-8" />
            </button>
          </div>
        ))}
      </div>
    </>
  );

  const rightContent = (
    <>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Format: {format}
        </div>

        {/* Download All */}
        <div className="flex">
          <Button
            size={"sm"}
            className="py-0"
            onClick={() => onDownloadAll()}
            color="success"
          >
            Download All
            <AiOutlineDownload className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {returnImages.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg w-40 h-40"
          >
            <NextImage
              src={image}
              width={150}
              height={150}
              alt="image"
              className="object-cover w-full h-full"
            />

            <button
              className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 items-center justify-center flex -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              onClick={() => onDownload(image)}
            >
              <AiOutlineDownload className="text-white h-8 w-8" />
            </button>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <TwoColumnLayout leftContent={leftContent} rightContent={rightContent} />
  );
};

export default FormatConverter;
