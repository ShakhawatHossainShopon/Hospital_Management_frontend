/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { DateOnly } from '@/components/DateOnly';
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
import React, { useEffect, useState } from 'react';
import StatBlock from '@/components/StatBlock';

const Page = () => {
  const headers = [
    'Patient',
    'Phone',
    'Bill Number',
    'Total Amount',
    'Discount',
    'Paid Amount',
    'Date',
    'Action',
  ];
  const [phone, setPhone] = useState('');
  const [debouncedPhone, setDebouncedPhone] = useState<string>();
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedPhone(phone);
    }, 300);
    return () => clearTimeout(timeout);
  }, [phone]);

  const { data, isLoading } = useQuery({
    queryKey: ['get-reports', page, debouncedPhone],
    queryFn: async () => {
      const res = await APIKit.billing.Reports(page, debouncedPhone);
      return res.data;
    },
  });
  if (isLoading) {
    <h1>loading</h1>;
  }
  console.log(data);

  return (
    <div>
      <div className="mb-6 flex items-center gap-6">
        <StatBlock title="Bill Count" count={data?.counts?.all} positive={true} />
        <StatBlock title="Paid Bill" count={data?.counts?.paid} positive={true} />
        <StatBlock title="Due Bill" count={data?.counts?.due} />
        <StatBlock title="Due Bill" count={data?.counts?.total_due_amount} anything="BDT" />
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
      <div className="py-2 gap-4 w-full flex justify-end rounded-sm px-4 bg-white text-[12px] font-medium">
        <p>
          Total Paid Amount :{' '}
          <span className="text-green-600">{data?.counts?.total_paid_amount} BDT</span>
        </p>
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
            <TableCell>
              <span className="text-green-600">{value?.paid_amount} BDT</span>
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
