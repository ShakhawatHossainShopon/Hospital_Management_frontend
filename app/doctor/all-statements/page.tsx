'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { APIKit } from '@/common/helpers/APIKit';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const Page = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [page, setPage] = useState(1);

  const headers = [
    'Appt Date',
    'Appt Time',
    'Patient Name',
    'type',
    'Note',
    'Amount Paid',
    'payment status',
    'Status',
  ];
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-prescription', page, date],
    queryFn: async () => {
      const res = await APIKit.prescription.getAllStatement(page, date);
      return res?.data?.appointments; // adapt to your API key
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-medium mb-6">All Statements</h4>
      </div>

      <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-sm mb-4">
        <Input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            refetch();
          }}
          className="border px-3 py-2 rounded-md"
        />
        <div className="text-sm">total: {data?.total}</div>
      </div>

      <ReusableTable
        caption="A list of all your appointments"
        headers={headers}
        data={data?.data}
        isLoading={isLoading}
        renderRow={(value: any) => {
          const apptDate = new Date(value.created_at).toLocaleDateString(); // Appt Date
          const apptTime = value.slot?.[0]?.time || '-'; // Appt Time
          const patientName = `${value.patient?.firstname || '-'} ${value.patient?.lastname || '-'}`; // Patient Name
          const type = value.patient?.type || '-'; // Type
          const note = value.slot?.[0]?.note || '-'; // Note
          const amountPaid = value.amount !== null ? value.amount : '-'; // Amount Paid
          const paymentStatus = value.payment_status === 1 ? 'Paid' : 'Pending'; // Payment Status
          const status = value.slot?.[0]?.status || '-'; // Status

          return (
            <TableRow key={value.id}>
              <TableCell>{apptDate}</TableCell>
              <TableCell>{apptTime}</TableCell>
              <TableCell>{patientName}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{note}</TableCell>
              <TableCell>{amountPaid}</TableCell>
              <TableCell>{paymentStatus}</TableCell>
              <TableCell>{status}</TableCell>
            </TableRow>
          );
        }}
      />
    </div>
  );
};

export default Page;
