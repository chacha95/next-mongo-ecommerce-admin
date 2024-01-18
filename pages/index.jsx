import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-white w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button className="btn-primary" onClick={() => signIn("google")}>
            Sign With Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex-grow px-4 rounded-md py-1">
        <button className="btn-primary">logged in {session.user.email}</button>
      </div>
    </Layout>
  );
}
