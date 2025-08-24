/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { DateOnly } from '@/components/DateOnly';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'react-toastify';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-employee'],
    queryFn: async () => {
      const res = await APIKit.employees.allEmployees();
      return res?.data;
    },
  });
  if (isLoading) {
    <h1>loading</h1>;
  }
  const headers = ['Name', 'Position', 'Email', 'ID', 'Date', 'Action'];

  const deleteEmployee = (id: any) => {
    APIKit.employees
      .DeleteEmployee(id)
      .then(() => {
        toast.success('Employee Deleted successfully');
        refetch();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  };

  return (
    <div>
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className="font-medium">All Employees</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${params.customerId}/add-employees`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <Plus /> Add Employee
        </Button>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <ReusableTable
          caption="A list of your All Diagnost and test"
          headers={headers}
          data={data}
          isLoading={isLoading}
          renderRow={(value: any, i) => (
            <TableRow key={i}>
              <TableCell>{value?.name ?? 'N/A'}</TableCell>
              <TableCell className="text-blue-600 text-[12px] font-medium">
                {value?.position ?? 'N/A'}
              </TableCell>
              <TableCell>{value?.email ?? 'N/A'}</TableCell>
              <TableCell>{value?.id ?? 'N/A'}</TableCell>
              <TableCell>
                <DateOnly isoDate={value?.created_at} />
              </TableCell>

              <TableCell className="max-w-[100px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="cursor-pointer flex items-center gap-2 px-4 py-1.5 border-[2px] border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-50 transition">
                      Actions
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-xs" align="end">
                    {/* <DropdownMenuItem className="text-xs font-bold text-yellow-500">
                      Update Doctor
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={() => deleteEmployee(value?.id)}
                      className="text-xs font-bold text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )}
        />
      </div>
    </div>
  );
};

export default Page;
