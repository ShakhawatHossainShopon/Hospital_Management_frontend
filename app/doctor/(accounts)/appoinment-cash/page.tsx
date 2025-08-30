'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { APIKit } from '@/common/helpers/APIKit';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import StatBlock from '@/components/StatBlock';

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
    queryKey: ['get-statements', page, date],
    queryFn: async () => {
      const res = await APIKit.prescription.getAllAptCash(date, page);
      return res?.data;
    },
  });
  console.log(data);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">All Appointments</h4>
        <div className="flex gap-4">
          <Input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              refetch();
            }}
            className="border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-6">
        <StatBlock
          anything="BDT"
          title="Total Appoinments Counts"
          count={data?.total_appoinments || 0}
          positive={true}
        />
        <StatBlock
          anything="BDT"
          title="All Paid Bills"
          count={data?.total_amount || 0}
          positive={true}
        />
      </div>

      <ReusableTable
        caption="A list of all your appointments"
        headers={headers}
        data={data?.appointments?.data}
        isLoading={isLoading}
        renderRow={(value: any) => {
          const apptDate = new Date(value.created_at).toLocaleDateString();
          const apptTime = value.slot?.[0]?.time || '-';
          const patientName = `${value.patient?.firstname || '-'} ${value.patient?.lastname || '-'}`;
          const type = value.patient?.type || '-';
          const note = value.slot?.[0]?.note || '-';
          const amountPaid = value.amount !== null ? value.amount : '-';
          const paymentStatus = value.payment_status === 1 ? 'Paid' : 'Pending';
          const status = value.slot?.[0]?.status || '-';

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
        pagination={data?.appointments}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Page;
