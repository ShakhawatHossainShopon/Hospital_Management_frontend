/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { ReusableTable } from '@/components/tables/ResusableTable';
import { TableCell, TableRow } from '@/components/ui/table';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { DateOnly } from '@/components/DateOnly';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { useEffect, useState } from 'react';
type Slot = {
  id: number;
  time: string; // e.g. "08:00:00"
  scedule_id: number;
  is_booked: number;
  time_indicator: string; // e.g. "AM"
  name: string;
  phone: string;
  type: string; // e.g. "Old", "new"
  patient_age: string;
  note: string | null;
  status: string; // e.g. "pending"
  appointment_id: number;
  patient_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type Patient = {
  id: number;
  firstname: string;
  lastname: string;
  guardian_name: string | null;
  mobile_phone: string;
  gender: string;
  type: string;
  age: number;
  birth_date: string | null;
  height: string | null;
  weight: string | null;
  blood_groupe: string | null;
  address_line: string | null;
  city: string | null;
  area: string | null;
  postal_code: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type PaymentRecord = {
  id: number;
  patient_id: number;
  doctor_id: number;
  payment_status: number;
  amount: number | null;
  due_status: number;
  due: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  patient: Patient;
  slot: Slot[];
};

export default function StatementTable() {
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
  const { data: doctorname, isLoading: isloadingDoctor } = useQuery({
    queryKey: ['getUser-name-34'],
    queryFn: async () => {
      const res = await APIKit.doctor.getDoctorName();
      return {
        data: res.data,
        status: res.status,
      };
    },
  });
  const options = doctorname?.data?.doctors?.map((value: { id: string; name: string }) => {
    return { value: value?.id, label: value?.name };
  });
  const [doctor, setDoctor] = useState<string | undefined>();
  const { data: appointments, isLoading } = useQuery<PaymentRecord[]>({
    queryKey: ['get-appointment-14a4', doctor],
    queryFn: async () => {
      const res = await APIKit.appoinment.GetAppoinmentById(doctor);
      return res?.data?.appointment;
    },
  });

  useEffect(() => {
    if (!doctor && doctorname?.data?.doctors?.length > 0) {
      setDoctor(doctorname?.data?.doctors[0]?.id);
    }
  }, [doctorname, doctor]);
  return (
    <>
      {isloadingDoctor && isloadingDoctor ? (
        'loading..'
      ) : (
        <div className="my-6 md:w-1/3">
          <ReusableSelect
            label="Select Doctor"
            onChange={(value: string) => setDoctor(value)}
            options={options}
          />
        </div>
      )}

      <ReusableTable
        caption="A list of your recent Slots."
        headers={headers}
        data={appointments}
        isLoading={isLoading}
        renderRow={(appoinemnts, i) => (
          <TableRow key={appoinemnts.id}>
            <TableCell>
              <DateOnly isoDate={appoinemnts?.created_at} />
            </TableCell>
            <TableCell className="text-blue-600 text-[12px] font-medium">
              <DateOnly isoDate={appoinemnts?.created_at} />
            </TableCell>
            <TableCell className="min-w-[100px] text-blue-600 font-medium">
              {appoinemnts?.patient?.firstname} {appoinemnts?.patient?.lastname}
            </TableCell>
            <TableCell>{appoinemnts?.slot[0]?.type}</TableCell>
            <TableCell>{appoinemnts?.slot[0]?.note}</TableCell>
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
            <TableCell className="min-w-[80px]">
              {(() => {
                switch (appoinemnts?.slot[0]?.status) {
                  case 'pending':
                    return (
                      <span className="bg-amber-300 px-2 py-1 rounded-md font-medium">pending</span>
                    );
                  case 'confirm':
                    return (
                      <span className="bg-green-300 px-2 py-1 rounded-md font-medium">confirm</span>
                    );
                  case 'complete':
                    return (
                      <span className="bg-blue-300 px-2 py-1 rounded-md font-medium">complete</span>
                    );
                  case 'visiting':
                    return (
                      <span className="bg-purple-300 px-2 py-1 rounded-md font-medium">
                        visiting
                      </span>
                    );
                  default:
                    return null;
                }
              })()}
            </TableCell>
          </TableRow>
        )}
      />
    </>
  );
}
