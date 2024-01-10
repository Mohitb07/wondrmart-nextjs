import Container from "@/common/Container";
import { FaPlus } from "react-icons/fa6";
import StyledCard from "./components/Card";

export const metadata = {
  title: "Your Address",
  description: "Edit addresses for orders",
};

export default async function AddressPage() {
  return (
    <Container>
      <main className="p-6 space-y-5">
        <h1 className="text-4xl font-bold">Your Address</h1>
        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-20 w-full border rounded-lg border-dashed border-white md:min-w-[300px] md:max-w-[380px]">
            <div className="flex flex-col justify-center items-center gap-2 text-4xl">
              <FaPlus />
              <span className="text-xl">Add address</span>
            </div>
          </div>
          <StyledCard/>
          <StyledCard/>
          <StyledCard/>
          <StyledCard/>
          <StyledCard/>
          <StyledCard/>
        </div>
      </main>
    </Container>
  );
}
