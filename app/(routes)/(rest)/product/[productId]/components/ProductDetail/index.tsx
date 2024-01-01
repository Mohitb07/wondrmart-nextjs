"use client";

import { Divider } from "@nextui-org/react";
import React from "react";
import CTA from "../CTA";
import ProductServices from "../Services";

type ProductDetailProps = {};

const ProductDetail: React.FC<ProductDetailProps> = () => {
  return (
    <>
      <h1 className="text-base md:text-2xl font-bold">
        Apple AirPods Pro (2nd Generation)
      </h1>
      <Divider />
      <p className="text-2xl font-semibold">18,999</p>
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
      <ul className="text-sm list-disc ml-3 leading-6">
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
      </ul>
    </>
  );
};
export default ProductDetail;
