import SignUpBody from "../components/SignUpBody";

export const metadata = {
  title: "wondrMart | Log In",
  description: "Log in to your wondrMart account",
};

export default function SignUp() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="px-4  py-16 sm:px-6 lg:px-8 space-y-5 min-w-[20rem] md:min-w-[30rem]">
        <h1 className="text-4xl font-bold text-center">Sign Up</h1>
        <SignUpBody />
      </div>
    </div>
  );
}
