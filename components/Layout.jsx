import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

import Nav from '@/components/nav';
import { AdminLogoIcon, HamburgerIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return <Button onClick={() => signIn('google')}>Login with Google</Button>;
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block items-center p-4 md:hidden">
        <Button onClick={() => setShowNav(true)}>
          <HamburgerIcon />
        </Button>

        <div className="mr-6 flex grow justify-center">
          <AdminLogoIcon />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
