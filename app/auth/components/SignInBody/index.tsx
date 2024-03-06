"use client";

import { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/SVG";
import NextLink from "next/link";
import useLogin from "@/hooks/useLogin";
import { SignInFormData } from "@/types";
import { useFormik } from "formik";
import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long or more"),
});

export default function SignInBody() {
  const [isVisible, setIsVisible] = useState(false);
  const { isLoading: isLoggingIn, mutate, isError, error } = useLogin();
  
  const formik = useFormik<SignInFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => mutate(values),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (isError) {
      error.response!.data.message = "";
    }
  };

  return (
    <>
      <form
        className="space-y-5 md:space-y-4"
        noValidate
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <Input
          isRequired
          isInvalid={
            (isError && Boolean(error.response?.data.message)) ||
            (formik.touched.email && Boolean(formik.errors.email))
          }
          value={formik.values.email}
          onChange={handleChange}
          variant="bordered"
          label="Email"
          name="email"
          placeholder="Enter your email"
          errorMessage={
            (isError && error.response?.data.message) ||
            (formik.touched.email && formik.errors.email)
          }
        />
        <Input
          isRequired
          isInvalid={
            (isError && Boolean(error.response?.data.message)) ||
            (formik.touched.password && Boolean(formik.errors.password))
          }
          value={formik.values.password}
          onChange={handleChange}
          label="Password"
          variant="bordered"
          name="password"
          placeholder="Enter your password"
          errorMessage={
            (isError && error.response?.data.message) ||
            (formik.touched.password && formik.errors.password)
          }
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
        <Button
          isLoading={isLoggingIn}
          type="submit"
          className="w-full font-bold"
          color="primary"
          variant="shadow"
        >
          Sign In
        </Button>
        <span className="flex items-center gap-2 justify-center text-slate-600 max-sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" as={NextLink} className="max-sm:text-sm">
            Sign Up
          </Link>
        </span>
      </form>
    </>
  );
}
