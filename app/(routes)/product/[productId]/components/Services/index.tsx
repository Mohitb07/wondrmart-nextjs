import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaAward } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosReturnLeft } from "react-icons/io";

const ProductServices = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <TbTruckDelivery className="text-3xl text-primary" />
        <span className="text-xs text-center">Free Delivery</span>
      </div>
      <div className="flex flex-col items-center">
        <FaAward className="text-3xl text-primary" />
        <span className="text-xs text-center">Quality Assured</span>
      </div>
      <div className="flex flex-col items-center">
        <MdOutlineSecurity className="text-3xl text-primary" />
        <span className="text-xs text-center">1 Year Warranty</span>
      </div>
      <div className="flex flex-col items-center">
        <IoIosReturnLeft className="text-3xl text-primary" />
        <span className="text-xs text-center">7 Day Return</span>
      </div>
    </>
  );
};
export default ProductServices;
