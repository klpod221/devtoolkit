import React from "react";
import Image from "next/legacy/image";

import { AiOutlineClose } from "react-icons/ai";

const MyImagePreview = ({ isShow, setIsShow, image }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-screen h-screen ${
        isShow ? "" : "hidden"
      }`}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={() => setIsShow(false)}
      ></div>

      {image && (
        <Image
          src={image}
          layout="fill"
          objectFit="contain"
          alt="image"
          className={`!w-auto !h-auto !max-w-full !max-h-full !fixed !top-1/2 !left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300`}
        />
      )}

      <button
        className="absolute top-3 right-3 p-2 text-white bg-black bg-opacity-50 rounded-full"
        onClick={() => setIsShow(false)}
      >
        <AiOutlineClose className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MyImagePreview;
