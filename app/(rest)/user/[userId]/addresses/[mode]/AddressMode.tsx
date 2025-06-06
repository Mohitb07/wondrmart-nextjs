"use client";

import useCreateAddress from "@/hooks/useCreateAddress";
import { AddressModes } from "@/types";
import Body from "./components/Body";
import useUpdateAddress from "@/hooks/useUpdateAddress";
import useGetAddress from "@/hooks/useGetAddress";
import { useEffect, useLayoutEffect } from "react";
import { notFound } from "next/navigation";

type AddressModeProps = {
  mode: AddressModes;
};

const AddressMode = ({ mode }: AddressModeProps) => {
  const { mutate: createAddress, isLoading: isCreateAddressProcessing } =
    useCreateAddress();
  const { mutate: updateAddress, isLoading: isUpdateAddressProcessing } =
    useUpdateAddress();
  const {
    handleAddress,
    addressId,
    data,
    isInitialLoading: isAddressLoading,
    isError,
    error,
  } = useGetAddress(mode);

  const onSubmit =
    mode === "create"
      ? createAddress
      : mode === "edit"
      ? updateAddress
      : () => {};

  const isLoading =
    mode === "create"
      ? isCreateAddressProcessing
      : mode === "edit"
      ? isUpdateAddressProcessing
      : false;

  if (isError) {
    if (error.response?.status === 404) {
      notFound();
    } else {
      throw error;
    }
  }

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (mode === "edit") {
      handleAddress(params.get("id") || "");
    }
  }, [addressId, handleAddress, mode]);

  return (
    <div className="flex justify-center items-center min-w-[20rem] md:min-w-[60rem] w-full">
      <div className="w-[500px]">
        <Body
          mode={mode}
          onSubmit={onSubmit}
          isAddressLoading={isAddressLoading}
          isProcessing={isLoading}
          default={data?.default || false}
          city={data?.city || ""}
          state={data?.state || ""}
          pincode={data?.pincode || ""}
          phone={data?.phone || ""}
          full_name={data?.full_name || ""}
          flat_no={data?.flat_no || ""}
          street={data?.street || ""}
        />
      </div>
    </div>
  );
};
export default AddressMode;
