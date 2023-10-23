"use client"

import { useState } from "react";

import { Button, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/SVG";
import NextLink from "next/link";

export default function SignInBody() {
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <Input
        isRequired
        isInvalid={false}
        variant="bordered"
        label="Email"
        placeholder="Enter your email"
        errorMessage=""
        value={value}
        onValueChange={setValue}
      />
      <Input
        isRequired
        isInvalid={false}
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        errorMessage=""
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
      <Button className="w-full font-bold" color="primary" variant="shadow">
        Sign In
      </Button>
      <span className="flex items-center gap-2 justify-center text-slate-600 max-sm:text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" as={NextLink} className="max-sm:text-sm">
          Sign Up
        </Link>
      </span>
    </>
  );
}
