"use client";

import DesktopBanner from "@/public/images/banner-desktop.png";
import MobileBanner from "@/public/images/banner-mobile.jpg";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const [smallerBanner, largeBanner] = [MobileBanner, DesktopBanner];

const Banner = () => {
  const [banner, setBanner] = useState<StaticImageData | null>(null); // Use null instead of undefined
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function handleResize() {
      const isSmaller = window.innerWidth < 768;
      setBanner(isSmaller ? smallerBanner : largeBanner);
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
