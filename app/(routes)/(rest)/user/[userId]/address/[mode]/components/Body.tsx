"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";

type BodyProps = {
    mode: string;
};

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal",
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

const Body: React.FC<BodyProps> = ({mode}) => {
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
          variant="bordered"
          label="Country/Region"
          placeholder="Select an animal"
          defaultSelectedKeys={["cat"]}
          //   className="max-w-xs"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
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
          type="tel"
          name="phone"
          label="Mobile number"
          placeholder="Enter your phone no."
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
          type="number"
          name="pincode"
          label="Pincode"
          placeholder="6 digits PIN code"
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
          placeholder="Choose a state"
        //   defaultSelectedKeys={["cat"]}
          //   className="max-w-xs"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
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
