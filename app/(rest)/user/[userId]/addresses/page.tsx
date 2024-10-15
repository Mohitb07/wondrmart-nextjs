import { getAddresses } from "@/actions/getAddresses";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import StyledCard from "./components/Card";
import { Address } from "@/types";

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
  
  let addresses: Address[] = [];
  try {
    addresses = await getAddresses(userId);
  } catch (error) {
    throw error;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <StyledCard isFooterVisible className="h-[220px] md:h-[262px] relative">
        <Link
          href="/user/[userId]/addresses/[mode]"
          as={`/user/${userId}/addresses/create`}
        >
          <div className="flex flex-col justify-center items-center gap-2 text-4xl p-10 top-0 left-0 right-0 bottom-0 absolute">
            <FaPlus />
            <span className="text-lg md:text-xl">Add address</span>
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
