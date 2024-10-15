"use client";

import {
  AdvancedImage,
  lazyload,
  responsive
} from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen/index";
import React from "react";

type ImageGalleryProps = {
  src: CloudinaryImage;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ src }) => {
  return (
    <AdvancedImage
      cldImg={src}
      plugins={[
        lazyload(),
        responsive(),
        // placeholder({ mode: "blur" }),
      ]}
    />
  );
};
export default ImageGallery;
