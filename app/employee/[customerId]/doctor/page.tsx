'use client';
import React from 'react';
import { TableDemo } from '@/components/Table';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/types/doctor.types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DoctorTableSkeleton } from '@/components/skeletons/DoctorTableSkeleton';
import { UserPlus } from 'lucide-react';

const Page = () => {
  const router = useRouter();
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

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className="font-medium">All Doctors</h4>
        <Button
          size="sm"
          onClick={() => router.push(`doctor/add-doctor`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <UserPlus /> Add Doctor
        </Button>
      </div>
      {isLoading ? <DoctorTableSkeleton /> : <TableDemo doctors={doctors} refetch={refetch} />}
    </div>
  );
};

export default Page;
