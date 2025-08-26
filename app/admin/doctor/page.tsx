'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { DoctorTableSkeleton } from '@/components/skeletons/DoctorTableSkeleton';
import { TableDemo } from '@/components/Table';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Page = () => {
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['get-doctor-143'],
    queryFn: async () => {
      const res = await APIKit.admin.doctor.getDoctor();
      return res.data?.doctors;
    },
  });
  console.log(doctors);

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className="font-medium">All Doctors</h4>
      </div>
      {isLoading ? <DoctorTableSkeleton /> : <TableDemo doctors={doctors} refetch={refetch} />}
    </div>
  );
};

export default Page;
