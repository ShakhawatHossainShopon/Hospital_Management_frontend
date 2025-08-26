/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import StatBlock from '@/components/StatBlock';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { DateOnly } from './../../../../components/DateOnly';

const Page = () => {
  const headers = ['ID', 'Name', 'Price', 'Date'];

  const { data, isLoading } = useQuery({
    queryKey: ['get-accounts'],
    queryFn: async () => {
      const res = await APIKit.accounts.dailyCash();
      return res?.data;
    },
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  console.log(data);
  return (
    <div>
      <div>
        {' '}
        <div className="mb-6 flex flex-wrap items-center gap-6">
          <StatBlock
            title="Total Paid Appoinments"
            count={data?.total_paid_appointments}
            positive={true}
          />
          <StatBlock title="All Paid Bills" count={data?.total_paid_bills} positive={true} />
          <StatBlock
            title="All Total Amount"
            count={data?.grand_total}
            anything="BDT"
            positive={true}
          />
          <StatBlock
            title="Expence Amount"
            count={data?.total_expenses}
            positive={true}
            anything="BDT"
          />
        </div>
      </div>

      <div>
        <ReusableTable
          caption="A list of your All Appoinments"
          headers={headers}
          data={data?.expenses_record}
          isLoading={isLoading}
          renderRow={(value: any) => (
            <TableRow key={value.expenses_record?.id}>
              <TableCell>{value?.id}</TableCell>
              <TableCell className="text-blue-600 text-[12px] font-medium">{value?.name}</TableCell>
              <TableCell>{value?.price}</TableCell>
              <TableCell>
                <DateOnly isoDate={value?.created_at} />
              </TableCell>
            </TableRow>
          )}
        />
      </div>
    </div>
  );
};

export default Page;
