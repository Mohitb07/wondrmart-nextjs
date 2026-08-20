"use client";

import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cloudinaryImage } from "@/services/cloudinary";

interface AdminProductImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function AdminProductImage({
  imageUrl,
  alt,
  className = "w-full h-full object-cover",
  width = 150,
  height = 150,
}: AdminProductImageProps) {
  if (!imageUrl) {
    return (
      <div className="w-full h-full bg-slate-800/40 flex items-center justify-center text-[10px] text-slate-400">
        No Image
      </div>
    );
  }

  const isExternalUrl =
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("data:");

  if (isExternalUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />
    );
  }

  try {
    const cldImg = cloudinaryImage({
      imageUrl,
      width,
      height,
    });

    return (
      <AdvancedImage
        cldImg={cldImg}
        alt={alt}
        className={className}
      />
    );
  } catch (err) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />
    );
  }
}
