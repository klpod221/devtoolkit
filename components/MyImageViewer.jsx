"use client";

import React from "react";
import Image from "next/image";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgRotate from "lightgallery/plugins/rotate";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-rotate.css";

const MyImageViewer = ({ images = null, src = null }) => {
  if (!images && !src) {
    return null;
  }

  if (src) {
    images = [
      {
        src: src,
        thumbnail: src,
        alt: "image",
      },
    ];
  }

  if (!Array.isArray(images)) {
    images = [images];
  }

  images = images.map((image) => {
    if (typeof image === "string") {
      return {
        src: image,
        thumbnail: image,
        alt: "image",
      };
    }
    return {
      src: image.src,
      thumbnail: image.thumbnail || image.src,
      alt: image.alt || "image",
    };
  });

  return (
    <LightGallery speed={500} plugins={[lgZoom, lgThumbnail, lgRotate]}>
      {images.map((image, index) => (
        <a key={index} href={image.src} className="group w-fit h-fit block">
          <Image
            src={image.thumbnail || image.src}
            alt={image.alt}
            width={200}
            height={200}
            className="w-32 h-32 rounded-md object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 border-2 border-gray-200 dark:border-gray-700"
          />
        </a>
      ))}
    </LightGallery>
  );
};

export default MyImageViewer;
