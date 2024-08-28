"use client";

import { REGIONS_COUNTRIES } from "@/constants";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { isPinCodeValid, isMobileNumberValid } from "@/utils/addressFilters";
import { useFormik } from "formik";
import * as yup from "yup";
import { AddressFormData } from "@/types";

type BodyProps = {
  mode: string;
  addressId?: string;
  onSubmit?: (values: AddressFormData) => void;
  default: boolean;
  isProcessing?: boolean;
  isAddressLoading?: boolean;
  pincode: string;
  phone: string;
  full_name: string;
  city: string;
  state: string;
  flat_no: string;
  street: string;
};

export const addressValidationSchema = yup.object({
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  pinCode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Invalid Pincode"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Invalid mobile number"),
  name: yup.string().required("Name is required"),
  city: yup.string().required("City is required"),
  apartment: yup.string().required("Apartment is required"),
  area: yup.string().required("Area is required"),
  isDefault: yup.boolean(),
});

const regions =
  REGIONS_COUNTRIES.find((c) => c.countryShortCode === "IN")?.regions || [];

const Body: React.FC<BodyProps> = ({
  mode,
  onSubmit,
  isProcessing = false,
  isAddressLoading = false,
  state,
  pincode,
  phone,
  full_name,
  city,
  flat_no,
  street,
  default: isDefault,
}) => {
  const formik = useFormik({
    initialValues: {
      country: "IN",
      state: state || "",
      pinCode: pincode || "",
      mobile: phone || "",
      name: full_name || "",
      city: city || "",
      apartment: flat_no || "",
      area: street || "",
      isDefault: isDefault || false,
    },
    onSubmit: (values) => {
      onSubmit && onSubmit(values);
    },
    enableReinitialize: true,
    validationSchema: addressValidationSchema,
  });

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value.length, e.target.value);
    if (e.target.name === "mobile" && e.target.value.length > 10) return;
    if (e.target.name === "pinCode" && e.target.value.length > 6) return;
    if (
      e.target.name === "pinCode" &&
      e.target.value.length > 0 &&
      !isPinCodeValid(e.target.value)
    )
      return;
    if (
      e.target.name === "mobile" &&
      e.target.value.length > 0 &&
      !isMobileNumberValid(e.target.value)
    )
      return;

    formik.handleChange(e);
  };

  const handleDefaultAddress = (value: boolean) => {
    formik.setFieldValue("isDefault", value);
  };
  // Fix: Always showing the loading state
  if (isAddressLoading)
    return (
      <div className="text-3xl text-center">
        <Spinner label="Loading..." color="primary" />
      </div>
    );

  return (
    <>
      <form
        className="space-y-5 md:space-y-4"
        noValidate
        method="post"
        onSubmit={formik.handleSubmit}
      >
        <Select
          isRequired
          name="country"
          variant="bordered"
          label="Country/Region"
          placeholder="Select a country/region"
          defaultSelectedKeys={[formik.values.country]}
          // onChange={handleSelectionChange}
          isDisabled
        >
          {REGIONS_COUNTRIES.map((country) => (
            <SelectItem
              key={country.countryShortCode}
              value={country.countryName.toLowerCase()}
            >
              {country.countryName}
            </SelectItem>
          ))}
        </Select>
        <Input
          isInvalid={
            // (isError && Boolean(error.response?.data.message.username)) ||
            formik.touched.name && Boolean(formik.errors.name)
          }
          isRequired
          variant="bordered"
          value={formik.values.name}
          defaultValue={full_name}
          type="text"
          name="name"
          label="Full name (First and Last name)"
          placeholder="Enter your full name"
          onChange={handleChange}
          errorMessage={
            // (isError && error.response?.data.message.username) ||
            formik.touched.name && formik.errors.name
          }
        />
        <Input
          isRequired
          isInvalid={
            // (isError && Boolean(error.response?.data.message.phone)) ||
            formik.touched.mobile && Boolean(formik.errors.mobile)
          }
          variant="bordered"
          value={formik.values.mobile}
          name="mobile"
          label="Mobile number"
          placeholder="Enter your phone no."
          onChange={handleChange}
          errorMessage={
            // (isError && error.response?.data.message.phone) ||
            formik.touched.mobile && formik.errors.mobile
          }
        />
        <Input
          isRequired
          isInvalid={
            // (isError && Boolean(error.response?.data.message.address)) ||
            formik.touched.pinCode && Boolean(formik.errors.pinCode)
          }
          variant="bordered"
          value={formik.values.pinCode}
          type="text"
          name="pinCode"
          label="Pincode"
          placeholder="6 digits PIN code"
          onChange={handleChange}
          errorMessage={
            // (isError && error.response?.data.message.address) ||
            formik.touched.pinCode && formik.errors.pinCode
          }
        />
        <Input
          isRequired
          isInvalid={
            // (isError && Boolean(error.response?.data.message.address)) ||
            formik.touched.apartment && Boolean(formik.errors.apartment)
          }
          //   onChange={formik.handleChange}
          variant="bordered"
          value={formik.values.apartment}
          type="text"
          name="apartment"
          label="Flat, House no., Building, Company, Apartment"
          placeholder=" "
          onChange={handleChange}
          errorMessage={
            // (isError && error.response?.data.message.address) ||
            formik.touched.apartment && formik.errors.apartment
          }
        />
        <Input
          isRequired
          isInvalid={
            // (isError && Boolean(error.response?.data.message.address)) ||
            formik.touched.area && Boolean(formik.errors.area)
          }
          //   onChange={formik.handleChange}
          variant="bordered"
          value={formik.values.area}
          type="text"
          name="area"
          label="Area, Street, Sector, Village"
          placeholder=" "
          onChange={handleChange}
          errorMessage={
            // (isError && error.response?.data.message.address) ||
            formik.touched.area && formik.errors.area
          }
        />
        <Input
          isRequired
          isInvalid={
            // (isError && Boolean(error.response?.data.message.address)) ||
            formik.touched.city && Boolean(formik.errors.city)
          }
          variant="bordered"
          value={formik.values.city}
          type="text"
          name="city"
          label="Town/City"
          placeholder=" "
          onChange={handleChange}
          errorMessage={
            // (isError && error.response?.data.message.address) ||
            formik.touched.city && formik.errors.city
          }
        />
        <Select
          isInvalid={
            // (isError && Boolean(error.response?.data.message.address)) ||
            formik.touched.state && Boolean(formik.errors.state)
          }
          errorMessage={
            // (isError && error.response?.data.message.address) ||
            formik.touched.state && formik.errors.state
          }
          isRequired
          variant="bordered"
          label="State"
          name="state"
          placeholder="Choose a state"
          onChange={handleSelectionChange}
          selectedKeys={[formik.values.state]}
        >
          {regions.map((region) => (
            <SelectItem
              key={region.shortCode || region.name}
              value={region.name.toLowerCase()}
            >
              {region.name}
            </SelectItem>
          ))}
        </Select>
        <Checkbox
          isInvalid={
            // (isError && Boolean(error.response?.data.message.address)) ||
            formik.touched.isDefault && Boolean(formik.errors.isDefault)
          }
          name="isDefault"
          isSelected={formik.values.isDefault}
          onValueChange={handleDefaultAddress}
        >
          Make this my default address
        </Checkbox>
        <Button
          isLoading={isProcessing}
          type="submit"
          isDisabled={
            !formik.isValid ||
            formik.isSubmitting ||
            formik.values.pinCode === "" ||
            formik.values.mobile === "" ||
            formik.values.name === "" ||
            formik.values.city === "" ||
            formik.values.apartment === "" ||
            formik.values.area === "" ||
            formik.values.state === "" ||
            formik.values.country === "" ||
            isAddressLoading ||
            isProcessing
          }
          className="w-full font-bold"
          color="primary"
          variant="shadow"
        >
          {mode === "create" ? "Add" : "Edit"} Address
        </Button>
      </form>
    </>
  );
};
export default Body;
