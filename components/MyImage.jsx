import React from "react";
import NextImage from "next/image";
import {
  AiOutlineEye,
  AiOutlineDownload,
  AiOutlineClose,
} from "react-icons/ai";

const MyImage = ({ src, alt, className, preview = true, download = true }) => {
  const [canPreview, setCanPreview] = React.useState(preview);
  const [canDownload, setCanDownload] = React.useState(download);
  const [isShowPreview, setIsShowPreview] = React.useState(false);

  let styleClass = className || "";

  const onDownload = () => {
    try {
      const a = document.createElement("a");
      a.href = src;
      a.download = alt;
      a.click();
    } catch (error) {
      console.error("Error on download image", error);
    }
  };

  return (
    <>
      <div
        className={`relative min-w-20 min-h-20 overflow-hidden group ${styleClass}`}
      >
        <NextImage
          src={src}
          alt={alt}
          width={500}
          height={500}
          className={`object-cover w-full h-full rounded-lg`}
          onError={(e) => {
            e.target.src = "/images/placeholder.png";
            e.target.srcset = "/images/placeholder.png";
            setCanPreview(false);
            setCanDownload(false);
          }}
        />

        <div className="absolute top-1 right-1 hidden justify-center items-center group-hover:flex gap-1 animate-fade-in">
          {canDownload && (
            <button className="bg-black bg-opacity-50 text-white rounded-lg p-1" onClick={onDownload}>
              <AiOutlineDownload className="h-6 w-6" />
            </button>
          )}

          {canPreview && (
            <button
              className="bg-black bg-opacity-50 text-white rounded-lg p-1"
              onClick={() => setIsShowPreview(!isShowPreview)}
            >
              <AiOutlineEye className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {isShowPreview && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <NextImage
            src={src}
            alt={alt}
            width={1500}
            height={1500}
            className="object-contain animate-zoom-in p-5"
          />

          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 -z-10 animate-fade-in"
            onClick={() => setIsShowPreview(false)}
          ></div>

          <div className="fixed top-5 right-5 flex gap-1 animate-fade-in">
            {canDownload && (
              <button className="bg-black bg-opacity-50 text-white rounded-lg p-1" onClick={onDownload}>
                <AiOutlineDownload className="h-6 w-6" />
              </button>
            )}

            <button
              className="bg-black bg-opacity-50 text-white rounded-lg p-1"
              onClick={() => setIsShowPreview(false)}
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyImage;
