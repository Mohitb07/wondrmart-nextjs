"use client";

import { REGIONS_COUNTRIES } from "@/constants";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { isPinCodeValid, isMobileNumberValid } from "@/utils/addressFilters";

type BodyProps = {
  mode: string;
  addressId?: string;
};

const Body: React.FC<BodyProps> = ({ mode, addressId = "" }) => {
  const [address, setAddress] = useState({
    country: "IN",
    state: "",
    pinCode: "",
    mobile: "",
  });

  const regions =
    REGIONS_COUNTRIES.find((c) => c.countryShortCode === address.country)
      ?.regions || [];

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
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

    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form
        className="space-y-5 md:space-y-4"
        noValidate
        method="post"
        // onSubmit={formik.handleSubmit}
      >
        <Select
          isRequired
          name="country"
          variant="bordered"
          label="Country/Region"
          placeholder="Select a country/region"
          defaultSelectedKeys={[address.country]}
          onChange={handleSelectionChange}
          //   className="max-w-xs"
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
          //   isInvalid={
          //     (isError && Boolean(error.response?.data.message.username)) ||
          //     (formik.touched.username && Boolean(formik.errors.username))
          //   }
          isRequired
          //   value={formik.values.username}
          //   onChange={formik.handleChange}
          variant="bordered"
          type="text"
          name="name"
          label="Full name (First and Last name)"
          placeholder="Enter your full name"
          //   errorMessage={
          //     (isError && error.response?.data.message.username) ||
          //     (formik.touched.username && formik.errors.username)
          //   }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          //   isInvalid={
          //     (isError && Boolean(error.response?.data.message.phone)) ||
          //     (formik.touched.phone && Boolean(formik.errors.phone))
          //   }
          //   onChange={formik.handleChange}
          variant="bordered"
          value={address.mobile}
          name="mobile"
          label="Mobile number"
          placeholder="Enter your phone no."
          onChange={handleChange}
          //   errorMessage={
          //     (isError && error.response?.data.message.phone) ||
          //     (formik.touched.phone && formik.errors.phone)
          //   }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          //   isInvalid={
          //     (isError && Boolean(error.response?.data.message.address)) ||
          //     (formik.touched.address && Boolean(formik.errors.address))
          //   }
          //   onChange={formik.handleChange}
          variant="bordered"
          value={address.pinCode}
          type="text"
          name="pinCode"
          label="Pincode"
          placeholder="6 digits PIN code"
          onChange={handleChange}
          //   errorMessage={
          //     (isError && error.response?.data.message.address) ||
          //     (formik.touched.address && formik.errors.address)
          //   }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          //   isInvalid={
          //     (isError && Boolean(error.response?.data.message.address)) ||
          //     (formik.touched.address && Boolean(formik.errors.address))
          //   }
          //   onChange={formik.handleChange}
          variant="bordered"
          type="number"
          name="apartment"
          label="Flat, House no., Building, Company, Apartment"
          placeholder=" "
          //   errorMessage={
          //     (isError && error.response?.data.message.address) ||
          //     (formik.touched.address && formik.errors.address)
          //   }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          //   isInvalid={
          //     (isError && Boolean(error.response?.data.message.address)) ||
          //     (formik.touched.address && Boolean(formik.errors.address))
          //   }
          //   onChange={formik.handleChange}
          variant="bordered"
          type="text"
          name="area"
          label="Area, Street, Sector, Village"
          placeholder=" "
          //   errorMessage={
          //     (isError && error.response?.data.message.address) ||
          //     (formik.touched.address && formik.errors.address)
          //   }
          onError={() => {
            console.log("error");
          }}
        />
        <Input
          isRequired
          //   isInvalid={
          //     (isError && Boolean(error.response?.data.message.address)) ||
          //     (formik.touched.address && Boolean(formik.errors.address))
          //   }
          //   onChange={formik.handleChange}
          variant="bordered"
          type="text"
          name="city"
          label="Town/City"
          placeholder=" "
          //   errorMessage={
          //     (isError && error.response?.data.message.address) ||
          //     (formik.touched.address && formik.errors.address)
          //   }
          onError={() => {
            console.log("error");
          }}
        />
        <Select
          isRequired
          variant="bordered"
          label="State"
          name="state"
          placeholder="Choose a state"
          onChange={handleSelectionChange}
          //   className="max-w-xs"
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
        <Button
          //   isLoading={isLoading}
          type="submit"
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
