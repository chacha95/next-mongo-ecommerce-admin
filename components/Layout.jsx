import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

import Nav from "@/components/nav";
import { AdminLogo, HamburgerIcon } from "@/components/icons";
import { Button } from "@/components/ui";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return <Button onClick={() => signIn("google")}>Login with Google</Button>;
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden flex items-center p-4">
        <Button onClick={() => setShowNav(true)}>
          <HamburgerIcon />
        </Button>

        <div className="flex grow justify-center mr-6">
          <AdminLogo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
