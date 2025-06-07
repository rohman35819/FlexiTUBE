// lib/withAuth.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WithAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/login-basic');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isClient || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
