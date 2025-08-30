'use client';
import { APIKit } from '@/common/helpers/APIKit';
import StatBlock from '@/components/StatBlock';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-accounts'],
    queryFn: async () => {
      const res = await APIKit.accounts.AdminallAccounts();
      return res?.data;
    },
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  console.log(data);

  return (
    <div>
      <div className="mb-6 flex items-center gap-6">
        <StatBlock
          title="Total Bill Counts"
          anything="BDT"
          count={data?.total_paid_bills}
          positive={true}
        />
        <StatBlock
          anything="BDT"
          title="All Paid Bills"
          count={data?.total_paid_appointments}
          positive={true}
        />
        <StatBlock
          anything="BDT"
          title="All Total Amount"
          count={data?.grand_total}
          positive={true}
        />
      </div>
    </div>
  );
};

export default Page;
