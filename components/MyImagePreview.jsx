import React from "react";
import Image from "next/image";

import { AiOutlineClose } from "react-icons/ai";

const MyImagePreview = ({ isShow, setIsShow, image }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
        isShow ? "" : "hidden"
      }`}
    >
      <div className="relative image-preview">
        <Image src={image} layout="fill" objectFit="contain" alt="image" />

        <button
          className="absolute top-0 right-0 p-2 bg-black bg-opacity-50 text-white rounded-bl-lg"
          onClick={() => setIsShow(false)}
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MyImagePreview;
