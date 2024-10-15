"use client";

import NotFoundSVG from "@/public/404.svg";
import Image from "next/image";

export default function NotFoundComponent() {
  return (
    <div className="flex justify-center flex-col items-center gap-unit-2xl">
      <Image
        src={NotFoundSVG}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "25%" }}
        alt="404"
      />
      <div className="flex items-center justify-center flex-col gap-6">
        <h2 className="text-primary text-xl uppercase">Oops! page not found</h2>
      </div>
    </div>
  );
}
