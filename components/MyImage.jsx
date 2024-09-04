import React from "react";
import NextImage from "next/image";

const MyImage = ({ src, alt, className, type = "square" }) => {
  return (
    <div className={`relative ${className}`}>
      <NextImage src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
}

export default MyImage;
