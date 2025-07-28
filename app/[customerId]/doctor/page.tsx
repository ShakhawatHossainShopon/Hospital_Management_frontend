'use client';
import React from 'react';
import { TableDemo } from '@/components/Table';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/types/doctor.types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const Page = () => {
  const { data: doctors, isLoading } = useQuery<Doctor[]>({
    queryKey: [''],
    queryFn: async () => {
      const res = await APIKit.doctor.getDoctor();
      return res.data?.doctors;
    },
  });
  if (isLoading) {
    return <h1>loading..</h1>;
  }

  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="text-sm">All Doctors</h4>
        <Button size="sm" variant={'outline'} className="text-xs py-1 px-4">
          <Plus /> Add New Doctor
        </Button>
      </div>
      <TableDemo doctors={doctors} />
    </div>
  );
};

export default Page;
