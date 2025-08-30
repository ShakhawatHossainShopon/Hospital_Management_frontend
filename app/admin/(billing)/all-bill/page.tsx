'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { DateOnly } from '@/components/DateOnly';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';

interface Bill {
  id: number;
  invoice_data: string;
  refer_id: number;
  doctor_id: number;
  patient_id: number;
  employee_id: number;
  payable_amount: number;
  total_amount: number;
  paid_amount: number;
  online_fee: number;
  discount: number;
  due_status: number;
  due_amount: number;
  note: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  firstname: string;
  lastname: string;
  mobile_phone: string;
}

interface BillResponse {
  message: string;
  data: Bill[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

const Page = () => {
  const [page, setPage] = React.useState(1);
  const { customerId } = useParams();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const headers = [
    'Patient',
    'Phone',
    'Bill Number',
    'Total Amount',
    'Discount',
    'Payable',
    'Paid',
    'Date',
    'Action',
  ];
  const { data, isLoading } = useQuery<BillResponse>({
    queryKey: ['get-Allbill', phone, from, to, filterDay, page],
    queryFn: async () => {
      const res = await APIKit.billing.AllBillAdmin(phone, from, to, filterDay, page);
      return res.data;
    },
  });
  if (isLoading) {
    <h1>Loading...</h1>;
  }
  console.log(data?.data);

  return (
    <div>
      <div className="mb-4 w-full">
        <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
          <h4 className="font-medium">All Bills</h4>
          <Button
            size="sm"
            onClick={() => router.push(`/${customerId}/billing`)}
            variant={'outline'}
            className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
          >
            <Plus /> Create Bill
          </Button>
        </div>
        <div className="flex gap-6 bg-white p-3 rounded-lg justify-between">
          <div className="w-1/4">
            <Input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-1 rounded"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full">
              <Input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border p-1 rounded"
              />
            </div>
            <div className="w-full">
              <Input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border p-1 rounded"
              />
            </div>
          </div>

          <div className="flex w-1/6 gap-4">
            <div className="w-full">
              <ReusableSelect
                value={filterDay}
                onChange={(e) => setFilterDay(e)}
                options={[
                  { value: 'day', label: 'Today' },
                  { value: 'month', label: 'Month' },
                  { value: 'week', label: 'Week' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 w-full flex justify-end rounded-sm px-4 bg-white text-[12px] font-medium">
        <p>
          Total Bills <span className="text-blue-800"> : {data?.total}</span>
        </p>
      </div>
      <ReusableTable
        headers={headers}
        data={data?.data}
        isLoading={isLoading}
        renderRow={(value: Bill, i) => (
          <TableRow key={i}>
            <TableCell className="text-blue-600 text-[12px] font-medium">
              {value?.firstname} {value?.lastname}
            </TableCell>
            <TableCell>{value?.mobile_phone}</TableCell>
            <TableCell>{value?.id}</TableCell>
            <TableCell>{value.total_amount} BDT</TableCell>
            <TableCell>{value.discount} BDT</TableCell>
            <TableCell>{value?.payable_amount}</TableCell>
            <TableCell>
              {value?.paid_amount} BDT <br />{' '}
              <span className="text-[10px] text-red-800">
                {value?.due_amount ? `due: ${value.due_amount} BDT` : ''}
              </span>
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
