/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { DateOnly } from '@/components/DateOnly';
import StatBlock from '@/components/StatBlock';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { TableCell, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const Page = () => {
  const headers = ['Appt Date', 'Amount Paid', 'payment status'];
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: doctorname, isLoading: isloadingDoctor } = useQuery({
    queryKey: ['getDoctorName-name-34'],
    queryFn: async () => {
      const res = await APIKit.admin.doctor.getDoctorName();
      return {
        data: res.data,
        status: res.status,
      };
    },
  });
  const options = doctorname?.data?.doctors?.map((value: { id: string; name: string }) => {
    return { value: value?.id, label: value?.name };
  });
  const { data, isLoading } = useQuery({
    queryKey: ['appointment-cash', doctorId, date],
    queryFn: async () => {
      if (!doctorId) return null;
      const res = await APIKit.accounts.AdminAppoinmentCash(doctorId, date);
      return res?.data;
    },
    enabled: !!doctorId && !!date,
  });
  if (isloadingDoctor) {
    return <h1>loading</h1>;
  }
  console.log(data?.appointments);

  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-medium mb-5">Appoinment Cash</h4>
      </div>
      <div className="md:w-1/6 mb-6">
        <StatBlock
          title="All Total Amount"
          count={data?.total_appointments_amount}
          anything="BDT"
          positive={true}
        />
      </div>

      <div className="flex gap-4 bg-white p-4 rounded-sm">
        <div className="w-xs">
          <ReusableSelect
            label="Doctor"
            required={true}
            options={options}
            onChange={(val) => setDoctorId(val)}
          />
        </div>
        <Input
          label="Select Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>
      <div className="w-full flex justify-end bg-white pb-2 px-4 rounded-b-sm">
        <p className="text-sm">
          Total Bills{' '}
          <span className="text-blue-800 text-sm"> : {data?.appointments_count || 0}</span>
        </p>
      </div>

      <div className="mt-4">
        <ReusableTable
          caption="A list of your All Appoinments"
          headers={headers}
          data={data?.appointments}
          isLoading={isLoading}
          renderRow={(appoinemnts: any, i) => (
            <TableRow key={appoinemnts.id}>
              <TableCell>
                <DateOnly isoDate={appoinemnts?.created_at} />
              </TableCell>

              <TableCell>
                {appoinemnts?.amount ? (
                  <span>{appoinemnts?.amount} BDT</span>
                ) : (
                  <span className="text-red-800 py-1 px-2 rounded-lg">Not Paid</span>
                )}
              </TableCell>
              <TableCell>
                {appoinemnts?.payment_status ? (
                  <span className="bg-green-400 py-1 px-2 rounded-lg">Paid</span>
                ) : (
                  <span className="text-red-800 text-xs font-medium py-1 px-2 rounded-lg">
                    Not Paid
                  </span>
                )}
              </TableCell>
            </TableRow>
          )}
        />
      </div>
    </div>
  );
};

export default Page;
