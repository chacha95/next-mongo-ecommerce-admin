import { useSession, signIn, signOut } from "next-auth/react";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-white w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <Button onClick={() => signIn("google")}>Sign With Google</Button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex-grow px-4 rounded-md py-1">
        <Button>logged in {session.user.email}</Button>
      </div>
    </Layout>
  );
}
