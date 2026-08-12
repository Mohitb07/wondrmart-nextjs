import DesktopBanner from "@/public/images/banner-desktop.png";
import MobileBanner from "@/public/images/banner-mobile.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="banner-container">
      <Image
        src={MobileBanner}
        alt="recently launched product banner"
        className="banner-image block md:hidden"
        priority
        sizes="100vw"
      />
      <Image
        src={DesktopBanner}
        alt="recently launched product banner"
        className="banner-image hidden md:block"
        priority
        sizes="100vw"
      />
    </div>
  );
};

export default Banner;
