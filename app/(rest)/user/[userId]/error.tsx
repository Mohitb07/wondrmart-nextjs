"use client"; // Error boundaries must be Client Components

import errorSVG from "@/public/astronaut.svg";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center flex-col items-center gap-unit-2xl mt-unit-xl md:mt-unit-2xl">
      <div className="flex items-center justify-center flex-col gap-6">
        <Image
          src={errorSVG}
          width={0}
          height={0}
          className="w-1/2 h-1/2 md:w-[300px] md:h-[300px]"
          // sizes="100vw"
          // style={{ width: "auto", height: "auto" }}
          priority
          alt="Something went wrong"
        />
        <h2 className="text-primary text-sm md:text-xl uppercase">
          Oops! something went wrong
        </h2>
        <Button
          startContent={<FaArrowRotateLeft />}
          onClick={() => {
            router.refresh();
            startTransition(reset);
          }}
          variant="bordered"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
