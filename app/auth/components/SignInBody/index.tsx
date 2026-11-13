"use client";

import { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/SVG";
import NextLink from "next/link";
import { HiOutlineExclamationCircle } from "react-icons/hi";
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
  const { isLoading: isLoggingIn, mutate, isError, error, reset } = useLogin();

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
      reset();
    }
  };

  const isUnverified =
    error?.response?.status === 403 ||
    error?.response?.data?.message?.toLowerCase().includes("verify") ||
    error?.response?.data?.errors?.[0]?.message?.toLowerCase().includes("verify");

  const generalErrorMessage =
    !isUnverified && isError
      ? error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        "Sign in failed. Please check your credentials."
      : null;

  return (
    <>
      <form
        className="space-y-5 md:space-y-4"
        noValidate
        method="post"
        onSubmit={formik.handleSubmit}
      >
        {isError && isUnverified && (
          <div className="p-4 rounded-xl bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 text-warning-900 dark:text-warning-200 space-y-3 text-sm">
            <div className="flex items-start gap-2.5">
              <HiOutlineExclamationCircle className="w-5 h-5 text-warning-600 dark:text-warning-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Email Verification Required</p>
                <p className="text-xs text-default-600 dark:text-default-400 mt-0.5">
                  {error?.response?.data?.message ||
                    error?.response?.data?.errors?.[0]?.message ||
                    "Please verify your email address to log in."}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                color="warning"
                variant="flat"
                as={NextLink}
                href={`/auth/verify-otp?email=${encodeURIComponent(
                  formik.values.email
                )}`}
                className="font-semibold text-xs"
              >
                Verify Email Now →
              </Button>
            </div>
          </div>
        )}

        {generalErrorMessage && (
          <div className="p-3 rounded-xl bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger text-xs font-medium">
            {generalErrorMessage}
          </div>
        )}

        <Input
          isRequired
          classNames={{ input: "text-base" }}
          isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          value={formik.values.email}
          onChange={handleChange}
          variant="bordered"
          label="Email"
          name="email"
          placeholder="Enter your email"
          errorMessage={formik.touched.email && formik.errors.email}
        />
        <Input
          isRequired
          classNames={{ input: "text-base" }}
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          value={formik.values.password}
          onChange={handleChange}
          label="Password"
          variant="bordered"
          name="password"
          placeholder="Enter your password"
          errorMessage={formik.touched.password && formik.errors.password}
          endContent={
            <button
              className="focus:outline-none"
              aria-label="Toggle password visibility"
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
        <span className="flex items-center gap-2 justify-center text-slate-400 max-sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" as={NextLink} className="max-sm:text-sm">
            Sign Up
          </Link>
        </span>
      </form>
    </>
  );
}
