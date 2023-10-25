"use client";

import { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/SVG";
import NextLink from "next/link";
import useRegister from "@/hooks/useRegister";
import { useFormik } from "formik";
import { SignUpFormData } from "@/types";
import * as yup from "yup";

export const registerValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long or more"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Password must be 8 characters long or more"),
});

export default function SignUpBody() {
  const { mutate, isLoading, isError, error } = useRegister();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const formik = useFormik<SignUpFormData>({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => mutate(values),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (isError) {
      const errorMessage = error.response?.data.message;
      if (errorMessage && errorMessage[e.target.name]) {
        error.response!.data.message[e.target.name] = "";
      }
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
          isInvalid={
            (isError && Boolean(error.response?.data.message.username)) ||
            (formik.touched.username && Boolean(formik.errors.username))
          }
          isRequired
          value={formik.values.username}
          onChange={formik.handleChange}
          variant="bordered"
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          errorMessage={
            (isError && error.response?.data.message.username) ||
            (formik.touched.username && formik.errors.username)
          }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          isInvalid={
            (isError && Boolean(error.response?.data.message.email)) ||
            (formik.touched.email && Boolean(formik.errors.email))
          }
          onChange={handleChange}
          variant="bordered"
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          errorMessage={
            (isError && error.response?.data.message.email) ||
            (formik.touched.email && formik.errors.email)
          }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          isInvalid={
            (isError && Boolean(error.response?.data.message.phone)) ||
            (formik.touched.phone && Boolean(formik.errors.phone))
          }
          onChange={formik.handleChange}
          variant="bordered"
          type="tel"
          name="phone"
          label="Phone No"
          placeholder="Enter your phone no."
          errorMessage={
            (isError && error.response?.data.message.phone) ||
            (formik.touched.phone && formik.errors.phone)
          }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          isInvalid={
            (isError && Boolean(error.response?.data.message.address)) ||
            (formik.touched.address && Boolean(formik.errors.address))
          }
          onChange={formik.handleChange}
          variant="bordered"
          type="tel"
          name="address"
          label="Address"
          placeholder="Enter your delivery address"
          errorMessage={
            (isError && error.response?.data.message.address) ||
            (formik.touched.address && formik.errors.address)
          }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          isInvalid={
            (isError && Boolean(error.response?.data.message.password)) ||
            (formik.touched.password && Boolean(formik.errors.password))
          }
          onChange={formik.handleChange}
          name="password"
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          errorMessage={
            (isError && error.response?.data.message.password) ||
            (formik.touched.password && formik.errors.password)
          }
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
          isInvalid={formik.touched.confirmPassword && Boolean(formik.errors.password)}
          onChange={formik.handleChange}
          isRequired
          label="Confirm Password"
          name="confirmPassword"
          variant="bordered"
          placeholder="Confirm your password"
          errorMessage={
            formik.touched.confirmPassword ? formik.errors.confirmPassword : ""
          }
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
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full font-bold"
          color="primary"
          variant="shadow"
        >
          Sign Up
        </Button>
      </form>
      <span className="flex items-center gap-2 justify-center text-slate-600 max-sm:text-sm">
        Already have an account?{" "}
        <Link href="/auth/signin" as={NextLink} className="max-sm:text-sm">
          Sign In
        </Link>
      </span>
    </>
  );
}
