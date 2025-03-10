"use client";

import { useEffect, useState } from "react";

const banners = [
  "https://www.apple.com/newsroom/images/2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/geo/tile/Apple-iPhone-16e-hero-GEO-250219-lp.jpg.landing-big_2x.jpg",
  "https://switch.com.ph/cdn/shop/files/NPI-iPhone-16e-Check-Back-Web-Banner-Desktop.jpg?v=1740749494&width=3600",
];

const Banner = () => {
  const [banner, setBanner] = useState("");
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <img
          src={banner}
          alt="recently launched product banner"
          className="banner-image"
        />
      )}
    </div>
  );
};

export default Banner;
