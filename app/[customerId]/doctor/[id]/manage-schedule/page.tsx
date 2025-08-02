'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { SceduleTable } from './../_components/SceduleTable';
import { CalendarClock } from 'lucide-react';

const Page = () => {
  const { customerId } = useParams();
  const { id } = useParams();
  const router = useRouter();
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className=" font-medium">All Scedules</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/${customerId}/doctor/add-schedule/${id}`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <CalendarClock className="mr-1" /> Add Schedules
        </Button>
      </div>
      <SceduleTable />
    </div>
  );
};

export default Page;
