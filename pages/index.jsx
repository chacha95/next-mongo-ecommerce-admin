import { useSession, signIn, signOut } from 'next-auth/react';

import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex h-screen w-screen items-center bg-white">
        <div className="w-full text-center">
          <Button onClick={() => signIn('google')}>Sign With Google</Button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex-grow rounded-md px-4 py-1">
        <Button>logged in {session.user.email}</Button>
      </div>
    </Layout>
  );
}
