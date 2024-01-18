import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-white p-2 px-4 rounded-lg"
            onClick={() => signIn("google")}
          >
            Sign With Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 ">
      logged in {session.user.email}
    </div>
  );
}
