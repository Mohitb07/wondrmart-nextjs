"use client";

import useCreateAddress from "@/hooks/useCreateAddress";
import useGetAddress from "@/hooks/useGetAddress";
import useUpdateAddress from "@/hooks/useUpdateAddress";
import { AddressModes } from "@/types";
import { notFound } from "next/navigation";
import { useLayoutEffect } from "react";
import Body from "./components/Body";

type AddressModeProps = {
  mode: AddressModes;
};

const AddressMode = ({ mode }: AddressModeProps) => {
  let {
    mutate: createAddress,
    isLoading: isCreateAddressProcessing,
    isError: isErrorCreating,
    error: createError,
  } = useCreateAddress();
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

  const resetServerError = () => {
    if (createError) {
      createError.response!.data.errors[0].message = "";
      createError.response!.data.errors[0].property = "";
    }
  };

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
          isErrorCreating={isErrorCreating}
          createError={createError}
          resetServerError={resetServerError}
        />
      </div>
    </div>
  );
};
export default AddressMode;
