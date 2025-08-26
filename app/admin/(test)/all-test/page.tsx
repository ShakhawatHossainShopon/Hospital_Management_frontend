/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { MdScience } from 'react-icons/md';
import { toast } from 'react-toastify';
type Groupe = {
  id: number;
  name: string;
  des: string;
  user_id: number;
  created_at: string; // or Date if parsed
  updated_at: string; // or Date if parsed
};

type Item = {
  id: number;
  item_name: string;
  code: string | null;
  groupe_id: number;
  unit_price: string;
  max_discound: number | null;
  des: string;
  user_id: number;
  created_at: string; // or Date
  updated_at: string; // or Date
  groupe: Groupe;
};

const headers = ['Name', 'Code', 'Groupe', 'Description', 'Unit Price', 'Discount', 'Action'];
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.customerId;
  const { data, isLoading, refetch } = useQuery<Item[]>({
    queryKey: ['get-Allappointment-14a54'],
    queryFn: async () => {
      try {
        const res = await APIKit.Test.getTests();
        return res?.data?.test;
      } catch (err: any) {
        if (err?.response?.status === 404) {
          return [];
        }
        throw err;
      }
    },
  });
  const deleteTest = (id: number) => {
    APIKit.Test.DeleteTest(id)
      .then(() => {
        toast.success('Test Deleted successfully');
        refetch();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  };

  return (
    <div>
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className="font-medium">All Test</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${id}/add-test`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <MdScience /> Add Diagnostic Tests
        </Button>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <ReusableTable
          caption="A list of your All Diagnost and test"
          headers={headers}
          data={data}
          isLoading={isLoading}
          renderRow={(tests, i) => (
            <TableRow>
              <TableCell>{tests?.item_name ?? 'N/A'}</TableCell>
              <TableCell className="text-blue-600 text-[12px] font-medium">
                {tests?.code ?? 'N/A'}
              </TableCell>
              <TableCell>{tests?.groupe?.name ?? 'N/A'}</TableCell>
              <TableCell>{tests?.des ?? 'N/A'}</TableCell>
              <TableCell>{tests?.unit_price ? `${tests.unit_price} BDT` : 'N/A'}</TableCell>
              <TableCell>
                {tests?.max_discound !== undefined && tests?.max_discound !== null
                  ? tests.max_discound
                  : 'N/A'}
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
                      onClick={() => deleteTest(tests?.id)}
                      className="text-xs font-bold text-red-600"
                    >
                      Delete Test
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
