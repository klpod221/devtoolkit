import React from "react";
import JSZip from "jszip";
import { toast } from "react-toastify";

import compressImage from "@utils/compressImage";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyRangeSlider from "@components/MyRangeSlider";
import MyFileInput from "@components/MyFileInput";
import MyImage from "@components/MyImage";

import { FaArrowRight } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";

const ImageCompressor = () => {
  const [level, setLevel] = React.useState(7);

  const [images, setImages] = React.useState([]);
  const [returnImages, setReturnImages] = React.useState([]);

  const onFileChange = (files) => {
    let data = [];

    files.forEach((file) => {
      data.push({
        name: file.name,
        size: file.size,
        type: file.type,
        image: file,
      });
    });

    setImages(data);
  };

  const compressImages = () => {
    if (images.length === 0) {
      return;
    }

    setReturnImages([]);

    try {
      images.forEach((item) => {
        compressImage(item.image, level).then((blob) => {
          const output = {
            image: blob,
            name: item.name,
            originalSize: item.size,
            compressedSize: blob.size,
          };

          setReturnImages((prev) => [...prev, output]);
        });
      });

      toast.success("Images compressed successfully");
    } catch (error) {
      toast.error(error.message || "Failed to compress images");
      console.error(error);
    }
  };

  const downloadImage = (item) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(item.image);
    a.download = item.name;
    a.click();
  };

  const downloadAll = async () => {
    if (returnImages.length === 0) {
      return;
    }

    if (returnImages.length === 1) {
      downloadImage(returnImages[0]);
      return;
    }

    const zip = new JSZip();
    returnImages.forEach((item) => {
      zip.file(item.name, item.image, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = url;
    a.download = "images.zip";
    a.click();
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Image Compressor" helper="Compress your images">
          <MyButton onClick={() => compressImages()}>
            Compress
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyRangeSlider
          min={1}
          max={10}
          value={level}
          onChange={setLevel}
          label={"Compression Level"}
        />

        <MyFileInput onChange={onFileChange} multiple={true} placeholder="You can upload multiple images (jpg, jpeg, webp)" accept=".jpg,.jpeg,.webp" />

        <div className="flex flex-wrap mt-4 gap-2 overflow-y-auto">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg w-32 h-32"
            >
              <MyImage
                src={URL.createObjectURL(item.image)}
                alt="image"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Your compressed images">
          {returnImages.length > 0 && (
            <MyButton
              className="py-0"
              onClick={() => downloadAll()}
              color="success"
            >
              Download All
              <AiOutlineDownload className="ml-1 h-5 w-5" />
            </MyButton>
          )}
        </MyCard.Header>

        <div className="flex flex-wrap gap-2 overflow-y-auto">
          {returnImages.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative group overflow-hidden rounded-lg w-32 h-32">
                <MyImage
                  src={URL.createObjectURL(item.image)}
                  alt="image"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="text-center text-xs">
                New size: {Math.round(item.compressedSize / 1000)} KB <br />
                Saved: {Math.round((1 - item.compressedSize / item.originalSize) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ImageCompressor.title = "Image Compressor";
export default ImageCompressor;
