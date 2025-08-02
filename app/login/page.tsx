import { LoginForm } from '@/components/login-form';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
  const cookieStore = await cookies(); // <-- await here
  const tokenFromCookie = cookieStore.get('accessToken');
  const userIdFromCookie = cookieStore.get('userid');

  if (tokenFromCookie) {
    redirect(`/${userIdFromCookie?.value}`);
  } else {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    );
  }
};
export default Page;
