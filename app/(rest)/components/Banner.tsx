"use client";

import Banner1 from "@/public/images/iphone-banner-1.jpg";
import Banner2 from "@/public/images/iphone-banner-2.webp";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const banners = [Banner1, Banner2];

const Banner = () => {
  const [banner, setBanner] = useState<StaticImageData | null>(null); // Use null instead of undefined
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handleResize() {
      const isSmaller = window.innerWidth < 768;
      setBanner(isSmaller ? banners[0] : banners[1]);
      setIsLoading(false);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="banner-container">
      {isLoading
        ? null
        : banner && ( // Ensure banner is not null before rendering Image
            <Image
              src={banner}
              width={0}
              height={0}
              decoding="async"
              priority={true}
              alt="recently launched product banner"
              className="banner-image"
            />
          )}
    </div>
  );
};

export default Banner;
