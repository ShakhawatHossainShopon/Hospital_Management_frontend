/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { DateOnly } from '@/components/DateOnly';
import StatBlock from '@/components/StatBlock';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const headers = ['Service Name', 'Unit Price', 'Description', 'Date', 'Actions'];
  const { customerId } = useParams();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['get-services'],
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
      <div className="md:w-1/6 my-6">
        <StatBlock
          title="Expences Amount"
          count={data?.total_expenses}
          anything="BDT"
          positive={true}
        />
      </div>

      <div className="flex justify-between">
        <h4 className="font-medium mb-6">Daily Expenses</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${customerId}/add-expence`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <Plus className="mr-1" /> Add Expences
        </Button>
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
