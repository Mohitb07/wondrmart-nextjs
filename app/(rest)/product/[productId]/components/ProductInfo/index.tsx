"use client";

import { Divider } from "@nextui-org/react";
import React from "react";
import { sanitize } from "isomorphic-dompurify";
import CTA from "../CTA";
import ProductServices from "../Services";

type ProductInfo = {
  productName: string;
  price: string;
  description: string;
};

const ProductInfo: React.FC<ProductInfo> = ({
  productName,
  price,
  description,
}) => {
  const formattedDescription = sanitize(description);
  return (
    <>
      <h1 className="text-lg md:text-2xl font-bold">{productName}</h1>
      <Divider />
      <p className="text-2xl font-semibold">{price}</p>
      <div className="lg:hidden">
        <Divider className="mb-3" />
        <div className="flex items-center justify-center gap-7">
          <ProductServices />
        </div>
        <Divider className="my-3" />
        <CTA />
      </div>
      <Divider />
      <h2 className="text-lg font-bold">Features</h2>
      {/* <ul className="text-sm list-disc ml-3 leading-6">
        <li>
          <p>
            Adaptive Transparency lets outside sounds in while reducing loud
            environmental noise
          </p>
        </li>
        <li>
          <p>Active Noise Cancellation reduces unwanted background noise</p>
        </li>
        <li>
          <p>
            Personalised Spatial Audio with dynamic head tracking places sound
            all around you
          </p>
        </li>
      </ul> */}
      <div
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
        className="text-slate-400 text-base ml-4 leading-relaxed"
      ></div>
    </>
  );
};
export default ProductInfo;
