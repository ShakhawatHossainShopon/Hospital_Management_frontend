'use client';
import React from 'react';
import { TableDemo } from '@/components/Table';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/types/doctor.types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { DoctorTableSkeleton } from '@/components/skeletons/DoctorTableSkeleton';

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery<Doctor[]>({
    queryKey: ['get-doctor-143'],
    queryFn: async () => {
      const res = await APIKit.doctor.getDoctor();
      return res.data?.doctors;
    },
  });

  const id = params.customerId;

  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="text-sm">All Doctors</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${id}/doctor/add-doctor`)}
          variant={'outline'}
          className="text-xs py-1 px-4"
        >
          <Plus /> Add New Doctor
        </Button>
      </div>
      {isLoading ? <DoctorTableSkeleton /> : <TableDemo doctors={doctors} refetch={refetch} />}
    </div>
  );
};

export default Page;
