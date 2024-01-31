import Container from "@/common/Container";
import { FaPlus } from "react-icons/fa6";
import StyledCard from "./components/Card";
import Link from "next/link";
import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";

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
  return (
    <Container>
      <main className="p-6 space-y-5">
        <h1 className="text-4xl font-bold">Your Addresses</h1>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* <div className="p-20 w-full border rounded-lg border-dashed border-white md:min-w-[300px] md:max-w-[380px]">
            <Link
              href="/user/[userId]/address/[mode]"
              as={`/user/${userId}/address/create`}
            >
              <div className="flex flex-col justify-center items-center gap-2 text-4xl">
                <FaPlus />
                <span className="text-xl">Add address</span>
              </div>
            </Link>
          </div> */}
          <StyledCard>
            <Link
              href="/user/[userId]/address/[mode]"
              as={`/user/${userId}/address/create`}
            >
              <div className="flex flex-col justify-center items-center gap-2 text-4xl p-10">
                <FaPlus />
                <span className="text-xl">Add address</span>
              </div>
            </Link>
          </StyledCard>
          <StyledCard userId={userId} isDefault />
          <StyledCard userId={userId} />
          <StyledCard userId={userId} />
          <StyledCard userId={userId} />
          <StyledCard userId={userId} />
          <StyledCard userId={userId} />
        </div>
      </main>
    </Container>
  );
}
