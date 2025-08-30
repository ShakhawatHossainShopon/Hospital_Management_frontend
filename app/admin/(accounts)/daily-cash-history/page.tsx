/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { DateOnly } from '@/components/DateOnly';
import StatBlock from '@/components/StatBlock';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const Page = () => {
  const headers = ['ID', 'Name', 'Price', 'Date'];
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { data, isLoading } = useQuery({
    queryKey: ['appointment-cash', date],
    queryFn: async () => {
      const res = await APIKit.accounts.AdminDailyCashHistory(date);
      return res?.data;
    },
    enabled: !!date,
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  console.log(data);

  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-medium mb-5">Daily Cash History</h4>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <div>
          <StatBlock
            title="Total Expenses"
            count={data?.total_expenses}
            anything="BDT"
            positive={true}
          />
        </div>
        <div>
          <StatBlock
            title="Total Amount"
            count={data?.grand_total}
            anything="BDT"
            positive={data?.grand_total > 0 ? true : false}
          />
        </div>
        <div>
          <StatBlock
            title="Total Paid Appt"
            count={data?.total_paid_appointments}
            positive={data?.total_paid_appointments > 0 ? true : false}
          />
        </div>
        <div>
          <StatBlock
            title="Total Paid Bills"
            count={data?.total_paid_bills}
            positive={data?.total_paid_bills > 0 ? true : false}
          />
        </div>
      </div>

      <div className="flex gap-4 bg-white p-4 rounded-sm">
        <Input
          label="Select Date"
          type="date"
          value={date}
          required={true}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="w-full flex justify-end bg-white pb-2 px-4 rounded-b-sm">
        <p className="text-sm">
          Total Expense
          <span className="text-blue-800 text-sm"> : {data?.expenses_record?.length || 0}</span>
        </p>
      </div>
      <div className="mt-4">
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
