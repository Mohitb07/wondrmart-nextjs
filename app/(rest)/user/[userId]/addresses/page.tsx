import { getAddresses } from "@/actions/getAddresses";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import StyledCard from "./components/Card";

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
  const addresses = (await getAddresses(userId)) || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <StyledCard isFooterVisible className="h-[262px]">
        <Link
          href="/user/[userId]/addresses/[mode]"
          as={`/user/${userId}/addresses/create`}
        >
          <div className="flex flex-col justify-center items-center gap-2 text-4xl p-10">
            <FaPlus />
            <span className="text-xl">Add address</span>
          </div>
        </Link>
      </StyledCard>

      {addresses.map((address) => (
        <StyledCard
          userId={userId}
          key={address.address_id}
          city={address.city}
          country={address.country}
          state={address.state}
          area={address.street}
          apartment={address.flat_no}
          mobile={address.phone}
          isDefault={address.default}
          addressId={address.address_id}
        />
      ))}
    </div>
  );
}
