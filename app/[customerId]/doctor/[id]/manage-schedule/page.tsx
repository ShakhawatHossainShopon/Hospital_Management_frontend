'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { SceduleTable } from './../_components/SceduleTable';

const Page = () => {
  const { customerId } = useParams();
  const { id } = useParams();
  const router = useRouter();
  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="text-lg font-medium">All Scedules</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${customerId}/doctor/add-schedule/${id}`)}
          variant={'outline'}
          className="text-xs py-1 px-4"
        >
          <Plus /> Add Schedules
        </Button>
      </div>
      <SceduleTable />
    </div>
  );
};

export default Page;
