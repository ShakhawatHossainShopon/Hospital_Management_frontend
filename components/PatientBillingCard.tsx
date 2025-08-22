'use client';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
}
const PatientBillingCard = ({ data }: InputProps) => {
  const { customerId } = useParams();
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
        <Link href={`/${customerId}/create-bill/${data?.id}`}>
          <Button size="sm" variant={'outline'} className="text-xs py-1 px-4">
            <Plus /> Create Bill
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PatientBillingCard;
