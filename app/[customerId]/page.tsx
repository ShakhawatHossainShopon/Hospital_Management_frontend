'use client';

import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
export default function Page() {
  const userIdFromCookie = Cookies.get('userid');
  const params = useParams();
  if (params.customerId !== userIdFromCookie) {
    return <h1>Unauthorized - 404 Not Found</h1>;
  }
  return <h1>hello dashboard</h1>;
}
