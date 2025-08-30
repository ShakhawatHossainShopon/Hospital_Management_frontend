/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { DateOnly } from '@/components/DateOnly';
import StatBlock from '@/components/StatBlock';
import { ReusableTable } from '@/components/tables/ResusableTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';

import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const headers = [
    'Patient',
    'Phone',
    'Bill Number',
    'Total Amount',
    'Discount',
    'Paid Amount',
    'Due',
    'Date',
    'Action',
  ];
  const [page, setPage] = React.useState(1);
  const [phone, setPhone] = useState('');
  const [debouncedPhone, setDebouncedPhone] = useState<string>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedPhone(phone);
    }, 300);
    return () => clearTimeout(timeout);
  }, [phone]);

  const { data, isLoading } = useQuery({
    queryKey: ['get-Due-bills', page, debouncedPhone],
    queryFn: async () => {
      const res = await APIKit.billing.AllDuesAdmin(page, debouncedPhone);
      return res.data;
    },
  });
  if (isLoading) {
    <h1>Loading...</h1>;
  }
  console.log(data);
  return (
    <div className="mb-4 w-full">
      <div className="mb-6 flex items-center gap-6">
        <StatBlock title="Due Bill Count" count={data?.total} />
        <StatBlock title="Due Bill" count={data?.total_due_amount} anything="BDT" />
      </div>
      <div className="flex gap-6 bg-white p-3 rounded-lg justify-between">
        <div className="w-1/4">
          <Input
            type="text"
            placeholder="Serach By Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-1 rounded"
          />
        </div>
      </div>

      <ReusableTable
        headers={headers}
        data={data?.data}
        isLoading={isLoading}
        renderRow={(value: any, i) => (
          <TableRow key={i}>
            <TableCell className="text-blue-600 text-[12px] font-medium">
              {value?.firstname} {value?.lastname}
            </TableCell>
            <TableCell>{value?.mobile_phone}</TableCell>
            <TableCell>{value?.id}</TableCell>
            <TableCell>{value.total_amount} BDT</TableCell>
            <TableCell>{value.discount} BDT</TableCell>
            <TableCell>{value?.paid_amount}</TableCell>
            <TableCell>
              <span className="text-red-800">{value.due_amount} BDT</span>
            </TableCell>
            <TableCell className="min-w-[80px]">
              <DateOnly isoDate={value?.created_at} />
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer flex items-center gap-2 px-4 py-1.5 border-[2px] border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-50 transition">
                    Actions
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-xs" align="end">
                  <DropdownMenuItem className="text-xs font-bold text-green-600">
                    Pay Bill
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs font-bold text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        )}
        pagination={data}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default Page;
