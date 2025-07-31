'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const userIdFromCookie = Cookies.get('userid');

  useEffect(() => {
    if (params.customerId !== userIdFromCookie) {
      router.push(`/${userIdFromCookie}`);
    }
  }, [params.customerId, userIdFromCookie, router]);

  // Optionally, show loading state while redirecting
  if (params.customerId !== userIdFromCookie) {
    return <h1>Loading...</h1>;
  }

  return <h1>hello dashboard</h1>;
}
