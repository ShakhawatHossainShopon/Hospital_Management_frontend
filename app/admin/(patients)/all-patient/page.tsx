'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { UserPlus } from 'lucide-react';
import { PatientTable } from '../_components/PatientTable';
import { useParams, useRouter } from 'next/navigation';
import { PatientTableSkeleton } from '@/components/skeletons/PatientTableSkeleton';

const Page = () => {
  const router = useRouter();
  const { customerId } = useParams();
  const {
    data: patients,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['get-patients-1434'],
    queryFn: async () => {
      const res = await APIKit.patient.getpatientadmin();
      return res.data?.patients;
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className="font-medium">All Patients</h4>
      </div>
      {isLoading ? (
        <PatientTableSkeleton />
      ) : (
        <PatientTable refetch={refetch} patients={patients} />
      )}
    </div>
  );
};

export default Page;
