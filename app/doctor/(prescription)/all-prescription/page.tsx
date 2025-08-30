/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

const Page = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const headers = ['Patient Name', 'Appointment ID', 'Phone', 'Type', 'Note', 'Actions'];
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-prescription', page, date],
    queryFn: async () => {
      const res = await APIKit.prescription.getAllPrescription(page, date);
      return res?.data?.prescriptions; // use 'prescriptions' key from API
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-medium mb-6">All Prescriptions</h4>
      </div>
      <div className="flex gap-4 bg-white p-4 rounded-sm">
        <Input
          label="Select Date"
          type="date"
          value={date}
          required={true}
          onChange={(e) => {
            setDate(e.target.value);
            refetch();
          }}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <ReusableTable
        caption="A list of all your appointments with prescriptions"
        headers={headers}
        data={data?.data}
        isLoading={isLoading}
        renderRow={(value: any) => {
          const patientName = `${value.patient?.firstname || '-'} ${value.patient?.lastname || '-'}`;
          const phone = value.patient?.mobile_phone || '-';
          const type = value.patient?.type || '-';
          const note =
            JSON.parse(value.prescriptions)
              ?.map((p: any) => p.medicine_name)
              .join(', ') || '-';

          return (
            <TableRow key={value.id}>
              <TableCell>{patientName}</TableCell>
              <TableCell>{value.appointment?.id || '-'}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{note}</TableCell>
              <TableCell>
                <button className="text-xs text-blue-700 font-semibold cursor-pointer hover:underline">
                  Print
                </button>
              </TableCell>
            </TableRow>
          );
        }}
        pagination={data}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default Page;
