import Addresses from "./Addresses";

export const metadata = {
  title: "Your Addresses",
  description: "Edit addresses for orders",
};

export default async function AddressPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  return <Addresses userId={userId} />;
}
