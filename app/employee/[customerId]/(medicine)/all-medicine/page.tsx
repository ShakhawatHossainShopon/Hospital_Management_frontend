/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const headers = [
    'ID',
    'Medicine Name',
    'Category Name',
    'Slug',
    'Generic Name',
    'Strength',
    'Manufacturer Name',
    'Unit',
    'Unit Size',
    'Price',
  ];
  const router = useRouter();
  const { customerId } = useParams();
  const [page, setPage] = useState(1);
  const [medicineName, setMedicineName] = useState('');
  const [medicineNameDebounce, setMedicineNameDebounce] = useState<string>();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMedicineNameDebounce(medicineName);
    }, 300);
    return () => clearTimeout(timeout);
  }, [medicineName]);

  const { data, isLoading } = useQuery({
    queryKey: ['get-refererences-1a54', medicineNameDebounce, page],
    queryFn: async () => {
      const res = await APIKit.medicine.allMedicine(medicineNameDebounce, page);
      return res?.data?.data;
    },
  });
  return (
    <div>
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className="font-medium">All Medicine</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/employee/${customerId}/add-medicine`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <Plus /> Add Medicine
        </Button>
      </div>
      <div className="flex gap-6 bg-white p-3 rounded-lg justify-between">
        <div className="w-1/4">
          <Input
            type="text"
            placeholder="Serach By Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="border p-1 rounded"
          />
        </div>
      </div>

      <ReusableTable
        headers={headers}
        data={data?.medicines}
        isLoading={isLoading}
        renderRow={(value: any, i) => (
          <TableRow key={i}>
            <TableCell>{value?.id}</TableCell>
            <TableCell>{value?.medicine_name}</TableCell>
            <TableCell>{value?.category_name}</TableCell>
            <TableCell>{value?.slug}</TableCell>
            <TableCell>{value?.generic_name}</TableCell>
            <TableCell>{value?.strength}</TableCell>
            <TableCell>{value?.manufacturer_name}</TableCell>
            <TableCell>{value?.unit}</TableCell>
            <TableCell>{value?.unit_size}</TableCell>
            <TableCell>{value?.price}</TableCell>
          </TableRow>
        )}
        pagination={data}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default Page;
