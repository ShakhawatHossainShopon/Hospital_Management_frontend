'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { APIKit } from '@/common/helpers/APIKit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface Patient {
  firstname: string;
  lastname: string;
  guardian_name?: string;
  mobile_phone: string;
  gender: string;
  age: number;
  birth_date?: string;
  height?: string;
  weight?: string;
  blood_groupe?: string;
  address_line?: string;
  city?: string;
  area?: string;
  postal_code?: string;
  created_at?: string;
  updated_at?: string;
  id: number;
}

interface InputProps {
  data: Patient;
  slotId?: string;
  doctorId?: string;
}

const PatientCard = ({ data, doctorId, slotId }: InputProps) => {
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const router = useRouter();
  const createAppoinment = () => {
    const payload = {
      patient_id: Number(data?.id),
      doctor_id: Number(doctorId),
      slot_id: Number(slotId),
    };
    setLoading(true);
    APIKit.appoinment
      .AddAppoinment(payload)
      .then(() => {
        toast.success('Appoinment added successfully');
        router.back();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setLoading(false); // ✅ End loading
      });
  };
  return (
    <div>
      <div className="flex justify-between items-center w-full rounded-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center">
          <p className="w-56">
            <strong className="block font-medium text-orange-700">
              {data?.firstname} {data?.lastname}
            </strong>
            {data?.mobile_phone && (
              <span className="text-xs text-orange-700">{data?.mobile_phone}</span>
            )}
          </p>
        </div>
        <Button
          size="sm"
          onClick={createAppoinment}
          variant={'outline'}
          className="text-xs py-1 px-4"
        >
          <Plus /> Create Appointment
        </Button>
      </div>

      <div className="mt-2 flex flex-col items-start rounded-md border border-gray-100 bg-white px-4 pt-3 pb-6 shadow-sm">
        <strong className="block font-medium text-sm">Patient Details</strong>

        <div className="mt-2 text-xs font-medium text-gray-700 space-y-1">
          <div>
            <strong>Age:</strong> {data?.age}
          </div>
          <div>
            <strong>Gender:</strong> {data?.gender}
          </div>
          {data?.birth_date && (
            <div>
              <strong>Birth Date:</strong> {new Date(data?.birth_date).toLocaleDateString()}
            </div>
          )}
          {data?.height && (
            <div>
              <strong>Height:</strong> {data?.height} ft
            </div>
          )}
          {data?.weight && (
            <div>
              <strong>Weight:</strong> {data?.weight} kg
            </div>
          )}
          {data?.blood_groupe && (
            <div>
              <strong>Blood Group:</strong> {data?.blood_groupe}
            </div>
          )}
          {(data?.address_line || data?.area || data?.city || data?.postal_code) && (
            <div>
              <strong>Address:</strong>{' '}
              {[data?.address_line, data?.area, data?.city, data?.postal_code]
                .filter(Boolean)
                .join(', ')}
            </div>
          )}
          {data?.guardian_name && (
            <div>
              <strong>Guardian:</strong> {data?.guardian_name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
