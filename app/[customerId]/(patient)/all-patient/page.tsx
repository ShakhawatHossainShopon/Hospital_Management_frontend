'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import React from 'react';
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
      const res = await APIKit.patient.getPatient();
      return res.data?.patients;
    },
  });

  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="text-sm">All Patients</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${customerId}/add-patient`)}
          variant={'outline'}
          className="text-xs py-1 px-4"
        >
          <Plus /> Add New Patient
        </Button>
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
