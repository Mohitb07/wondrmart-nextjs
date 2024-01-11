import Container from "@/common/Container";
import Body from "./components/Body";

export const metadata = {
  title: "Your Addresses",
  description: "Edit addresses for orders",
};

export default function AddressModePage({
  params,
}: {
  params: { mode: string };
}) {
  const { mode } = params;

  return (
    <Container>
      <main className="p-6 space-y-5">
        <h1 className="text-4xl font-bold">Your Address</h1>
        <p className="text-lg">
          {mode === "create" ? "Add" : "Edit"} your address
        </p>
        <div className="flex justify-center items-center min-w-[20rem] md:min-w-[60rem] w-full">
          {mode === "create" && (
            <div className="w-[500px]">
              <Body mode="create" />
            </div>
          )}
          {mode === "edit" && (
            <div className="w-[500px]">
              <Body mode="edit" />
            </div>
          )}
        </div>
      </main>
    </Container>
  );
}
