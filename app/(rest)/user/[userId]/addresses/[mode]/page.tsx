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
  );
}
