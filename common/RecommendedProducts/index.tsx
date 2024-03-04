"use client";

import ProductCard from "@/app/(rest)/components/ProductCard";
import React, { WheelEvent, useEffect, useRef, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

type RecommendedProductsProps = {
  userId: string;
};

const PRODUCT_LIST = [
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 1",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 2 fadffffffffffffffffffffffffffffffff ",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 3",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 4",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 5",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 6",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 7",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 8",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 9",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 10",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 11",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 12",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 13",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 14",
    price: "200",
  },
  {
    id: "123",
    image_url: "fasfd",
    name: "watch se 15",
    price: "200",
  },
];

const RecommendedProducts: React.FC<RecommendedProductsProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [isForwardButtonVisible, setIsForwardButtonVisible] = useState(true);

  useEffect(() => {
    function checkScroll() {
      if (containerRef.current) {
        const { scrollLeft } = containerRef.current;
        const scrollPosition = containerRef.current.scrollLeft;
        const maxScroll =
          containerRef.current.scrollWidth - containerRef.current.clientWidth;
        if (scrollPosition < maxScroll) {
          setIsForwardButtonVisible(true);
        } else {
          setIsForwardButtonVisible(false);
        }
        if (scrollLeft > 0) {
          setIsBackButtonVisible(true);
        } else {
          setIsBackButtonVisible(false);
        }
      }
    }

    containerRef.current &&
      containerRef.current.addEventListener("scroll", checkScroll);

    return () => {
      containerRef.current &&
        containerRef.current.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleBackButtonClick = () => {
    if (containerRef.current) {
      const item = containerRef.current.querySelector(".card");
      const previousItem = item as HTMLElement;
      if (previousItem) {
        const newPos =
          containerRef.current.scrollLeft -
          previousItem.offsetWidth -
          previousItem.offsetLeft;
        containerRef.current.scrollTo({
          top: 0,
          left: newPos,
          behavior: "smooth",
        });
      }
    }
  };

  const handleForwardButtonClick = () => {
    if (containerRef.current) {
      const item = containerRef.current.querySelector(".card");
      const currentElement = item as HTMLElement;
      const nextItem = currentElement.nextElementSibling as HTMLElement;
      if (nextItem) {
        const newPos =
          containerRef.current.scrollLeft +
          currentElement.offsetWidth +
          nextItem.offsetLeft;
        containerRef.current.scrollTo({
          top: 0,
          left: newPos,
          behavior: "smooth",
        });
      }
    }
  };

  // HAVE TO FIX THIS
  const handleScroll = (event: WheelEvent) => {
    const container = event.target as HTMLDivElement;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // const handleScroll = (event: WheelEvent) => {
  //   const container = event.target as HTMLDivElement;
  //   const scrollAmount = event.deltaY;
  //   const maxScroll =
  //     container.scrollWidth - container.clientWidth;
  //   const newScrollLeft = container.scrollLeft + scrollAmount;

  //   if (newScrollLeft < 0) {
  //     container.scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   } else if (newScrollLeft > maxScroll) {
  //     container.scrollTo({
  //       top: 0,
  //       left: maxScroll,
  //       behavior: "smooth",
  //     });
  //   } else {
  //     container.scrollTo({
  //       top: 0,
  //       left: newScrollLeft,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl">You might like</h2>
      <div className="relative px-1 overflow-hidden">
        <div
          className="flex items-center gap-5 overflow-x-scroll transition-all scrollbar-hide ease-in-out duration-300"
          ref={containerRef}
          onWheel={handleScroll}
        >
          {isBackButtonVisible && (
            <div className="absolute left-3 top-1/2 z-50 hidden md:block transition-opacity ease-in-out duration-300 bg-slate-700 rounded-full p-2">
              <MdOutlineArrowBackIos
                onClick={handleBackButtonClick}
                className="text-gray-200 text-3xl hover:cursor-pointer "
              />
            </div>
          )}
          {isForwardButtonVisible && (
            <div className="absolute right-3 top-1/2 z-50 hidden md:block transition-opacity ease-in-out duration-300 bg-slate-700 rounded-full p-2">
              <MdOutlineArrowForwardIos
                onClick={handleForwardButtonClick}
                className="text-gray-200 text-3xl hover:cursor-pointer"
              />
            </div>
          )}
          {PRODUCT_LIST.map((product) => (
            <ProductCard
              isLoading={false}
              key={product.id}
              productId={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image_url={product.image_url}
              isInCartLoading={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default RecommendedProducts;
