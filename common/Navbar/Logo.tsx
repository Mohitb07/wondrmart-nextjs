"use client";

import React from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

export const BrandLogo = () => (
  <div className="flex items-center">
    <Image 
     src={Logo} 
     alt="return to home page" 
     width={30} 
     height={30} 
     />
  </div>
);
