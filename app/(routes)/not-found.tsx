"use client"

import Image from "next/image";
import Link from "next/link";
import NotFoundSVG from "../../public/404.svg";
import { Button } from "@nextui-org/react";

export default function NotFound() {
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
        <Button variant="bordered" as={Link} href="/">
          Go back home
        </Button>
      </div>
    </div>
  );
}
