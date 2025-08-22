'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { DateOnly } from '@/components/DateOnly';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
interface Service {
  id: number;
  service_name: string;
  unit_price: string;
  des: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
const Page = () => {
  const { customerId } = useParams();
  const router = useRouter();
  const headers = ['Service Name', 'Unit Price', 'Description', 'Date', 'Actions'];
  const { data, isLoading, refetch } = useQuery<Service[]>({
    queryKey: ['get-Allappointment-14a54'],
    queryFn: async () => {
      const res = await APIKit.services.AllServices();
      return res?.data;
    },
  });
  const deleteSlots = (id: number) => {
    APIKit.services
      .deleteService(id)
      .then(() => {
        toast.success('Service Deleted successfully');
        refetch();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      });
  };
  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-medium mb-6">All Services</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${customerId}/add-services`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <Plus className="mr-1" /> Add Services
        </Button>
      </div>
      <ReusableTable
        caption="A list of your All Appoinments"
        headers={headers}
        data={data}
        isLoading={isLoading}
        renderRow={(value) => (
          <TableRow key={value.id}>
            <TableCell>{value?.service_name}</TableCell>
            <TableCell>{value?.unit_price}</TableCell>
            <TableCell>{value?.des}</TableCell>
            <TableCell>
              <DateOnly isoDate={value?.created_at} />
            </TableCell>
            <TableCell>
              {' '}
              <button
                onClick={() => deleteSlots(value?.id)}
                className="text-xs text-red-700 cursor-pointer hover:underline"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

export default Page;
