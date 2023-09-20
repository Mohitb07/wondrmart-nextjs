import { useState } from "react";

import { Button, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/SVG";
import NextLink from "next/link";

export default function SignUpBody() {
  const [value, setValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <>
      <Input
        isInvalid={false}
        isRequired
        variant="bordered"
        type="text"
        label="Username"
        placeholder="Enter your username"
        errorMessage=""
        onError={() => {
          console.log("error");
        }}
      />
      <Input
        isRequired
        isInvalid={false}
        variant="bordered"
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={value}
        onValueChange={setValue}
        errorMessage=""
        onError={() => {
          console.log("error");
        }}
      />
      <Input
        isInvalid={false}
        isRequired
        variant="bordered"
        type="tel"
        label="Phone No"
        placeholder="Enter your phone no."
        errorMessage=""
        onError={() => {
          console.log("error");
        }}
      />
      <Input
        isInvalid={false}
        isRequired
        variant="bordered"
        type="tel"
        label="Address"
        placeholder="Enter your delivery address"
        errorMessage=""
        onError={() => {
          console.log("error");
        }}
      />
      <Input
       isInvalid={false}
       isRequired
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isPasswordVisible ? "text" : "password"}
      />
      <Input
        isInvalid={false}
        isRequired
        label="Confirm Password"
        variant="bordered"
        placeholder="Confirm your password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isConfirmPasswordVisible ? "text" : "password"}
      />
      <Button className="w-full font-bold" color="primary" variant="shadow">
        Sign Up
      </Button>
      <span className="flex items-center gap-2 justify-center text-slate-600 max-sm:text-sm">
        Already have an account?{" "}
        <Link href="/auth/signin" as={NextLink} className="max-sm:text-sm">
          Sign In
        </Link>
      </span>
    </>
  );
}
