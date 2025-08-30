/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const headers = ['Patient Name', 'Appointment ID', 'Phone', 'Type', 'Note', 'Actions'];
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['get-prescription'],
    queryFn: async () => {
      const res = await APIKit.prescription.allPrescription(page);
      return res?.data?.appoinments;
    },
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-medium mb-6">All Prescriptions</h4>
      </div>
      <ReusableTable
        caption="A list of your All Appoinments"
        headers={headers}
        data={data?.data}
        isLoading={isLoading}
        renderRow={(value: any) => (
          <TableRow key={value.id}>
            <TableCell>{value?.name}</TableCell>
            <TableCell>{value?.appointment_id}</TableCell>
            <TableCell>{value?.phone}</TableCell>
            <TableCell>{value?.type}</TableCell>
            <TableCell>{value?.note || '-'}</TableCell>
            <TableCell>
              <Link href={`/doctor/add-prescription/${value?.appointment_id}/${value?.patient_id}`}>
                <button className="text-xs text-red-700 cursor-pointer hover:underline">
                  Create Prescription
                </button>
              </Link>
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
