import { AddressModes } from "@/types";
import AddressMode from "./AddressMode";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Your Addresses",
  description: "Edit addresses for orders",
};

export default function AddressModePage({
  params,
}: {
  params: { mode: AddressModes };
}) {
  const { mode } = params;
  if (mode !== "create" && mode !== "edit") {
    notFound();
  }

  return <AddressMode mode={mode} />;
}
