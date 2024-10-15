"use client";

import React from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

export const AcmeLogo = () => (
  <div className="flex items-center">
    <Image className="" src={Logo} alt="wondrMart Logo" width={30} height={30} />
  </div>
);
