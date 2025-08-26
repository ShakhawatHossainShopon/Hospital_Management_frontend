'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { APIKit } from '@/common/helpers/APIKit';
import { toast } from 'react-toastify';
interface IRefData {
  data: refs[];
  current_page: number;
  last_page: number;
  total: number;
}
interface refs {
  id: number;
  fullname: string;
  rf_code: string;
  phone: string;
  address: string;
  remarks: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
const Page = () => {
  const [page, setPage] = React.useState(1);
  const headers = ['Full Name', 'Rf Code', 'Phone', 'Address', 'Remarks', 'Actions'];
  const router = useRouter();
  const { customerId } = useParams();
  const { data, isLoading, refetch } = useQuery<IRefData>({
    queryKey: ['get-refererences-1a54', page],
    queryFn: async () => {
      const res = await APIKit.references.AllReferences(page);
      return res?.data?.ref;
    },
  });
  const deleteSlots = (id: number) => {
    APIKit.references
      .deleteReferences(id)
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
        <h4 className="font-medium mb-6">All References</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${customerId}/add-reference`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <Plus className="mr-1" /> Add References
        </Button>
      </div>
      <ReusableTable
        caption="A list of your All Appoinments"
        headers={headers}
        data={data?.data}
        isLoading={isLoading}
        renderRow={(value) => (
          <TableRow key={value.id}>
            <TableCell>{value?.fullname}</TableCell>
            <TableCell>{value?.rf_code}</TableCell>
            <TableCell>{value?.phone}</TableCell>
            <TableCell>{value?.address}</TableCell>
            <TableCell>{value?.remarks}</TableCell>
            <TableCell>
              <button
                onClick={() => deleteSlots(value?.id)}
                className="text-xs text-red-700 cursor-pointer hover:underline"
              >
                Delete
              </button>
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
