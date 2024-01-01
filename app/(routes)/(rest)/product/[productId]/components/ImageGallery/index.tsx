import Image from "next/image";
import React from "react";

type ImageGalleryProps = {};

const ImageGallery: React.FC<ImageGalleryProps> = () => {
  return (
    <Image
      className="rounded-lg"
      src="https://m.media-amazon.com/images/I/61SUj2aKoEL._SX679_.jpg"
      alt="product image"
      width={500}
      height={500}
      layout="responsive"
      priority
    />
  );
};
export default ImageGallery;
