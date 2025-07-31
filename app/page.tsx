import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {
  const cookieStore = await cookies(); // <-- await here
  const tokenFromCookie = cookieStore.get('accessToken');
  const userIdFromCookie = cookieStore.get('userid');

  if (!tokenFromCookie) {
    redirect(`/login`);
  } else {
    redirect(`/${userIdFromCookie?.value}`);
  }

  return null;
};

export default Page;
