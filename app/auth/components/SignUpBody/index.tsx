"use client";

import { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/SVG";
import NextLink from "next/link";
import useRegister from "@/hooks/useRegister";
import { useFormik } from "formik";
import { CustomError, SignUpFormData } from "@/types";
import * as yup from "yup";

export const registerValidationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be 8 characters long or more"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Password must be 8 characters long or more"),
});

type SignUpFields = "username" | "email" | "password";
type SignUpFieldsErrors = { message: string; property: SignUpFields }[];

const hasErrorForProperties = (
  errors: CustomError,
  properties: SignUpFields[]
) => {
  return properties.some((property) =>
    errors.response?.data.errors.find((err) => err.property === property)
  );
};

const getErrorMessageForProperty = (
  errors: CustomError,
  property: SignUpFields
) => {
  const error = errors.response?.data.errors.find(
    (err) => err.property === property
  );
  return error ? error.message : null;
};

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
      password: "",
      confirmPassword: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => mutate(values),
  });

  const updateErrors = (errors: SignUpFieldsErrors, field: string) => {
    return errors.filter((err) => err.property !== field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);

    if (isError && error.response) {
      let errors = error.response.data.errors;
      if (errors) {
        // Update the errors array by removing the specific field's error
        errors = updateErrors(errors, e.target.name);
        error.response.data.errors = errors;

        // Clear Formik's validation error state for the specific field
        formik.setFieldError(e.target.name, "");

        console.log("Updated errors:", errors);
      }
    }
  };

  console.log("formik error", formik.errors, formik.touched);

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
            (isError && hasErrorForProperties(error, ["username"])) ||
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
            (isError && getErrorMessageForProperty(error, "username")) ||
            (formik.touched.username && formik.errors.username)
          }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          isInvalid={
            (isError && hasErrorForProperties(error, ["email"])) ||
            (formik.touched.email && Boolean(formik.errors.email))
          }
          onChange={handleChange}
          variant="bordered"
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          errorMessage={
            (isError && getErrorMessageForProperty(error, "email")) ||
            (formik.touched.email && formik.errors.email)
          }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          isInvalid={
            (isError && hasErrorForProperties(error, ["password"])) ||
            (formik.touched.password && Boolean(formik.errors.password))
          }
          onChange={formik.handleChange}
          name="password"
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          errorMessage={
            (isError && getErrorMessageForProperty(error, "password")) ||
            (formik.touched.password && formik.errors.password)
          }
          endContent={
            <button
              aria-label="Toggle password visibility"
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
          isInvalid={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
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
              aria-label="Toggle password visibility"
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
      <span className="flex items-center gap-2 justify-center text-slate-400 max-sm:text-sm">
        Already have an account?{" "}
        <Link href="/auth/signin" as={NextLink} className="max-sm:text-sm">
          Sign In
        </Link>
      </span>
    </>
  );
}
