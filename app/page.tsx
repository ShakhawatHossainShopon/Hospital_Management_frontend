'use client';
import React, { useEffect } from 'react';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      const res = await APIKit.user.getUser();
      return {
        data: res.data,
        status: res.status,
      };
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (data?.data?.user?.id) {
        router.push(`/${data.data.user.id}`);
      } else {
        router.push('login');
      }
    }
  }, [data, isLoading, router]);

  return (
    <h1>
      <div className="min-h-screen flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div className="flex justify-center">
            <div
              className="animate-spin inline-block size-16 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </h1>
  );
};

export default Page;
