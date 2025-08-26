'use client';
import React from 'react';
import { SceduleSlotTable } from './_components/SceduleSlotTable';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { CalendarCheck } from 'lucide-react';

const Page = () => {
  const { customerId } = useParams();
  const { id } = useParams();
  const router = useRouter();
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="p-4 flex w-full bg-gray-100 rounded-lg mb-4 justify-between items-center">
        <h4 className="text-lg font-medium">All Scedules</h4>
        <Button
          size="sm"
          onClick={() => router.push(`/employee/${customerId}/doctor/${id}/manage-schedule`)}
          variant={'outline'}
          className="text-xs py-1 px-4 border-indigo-600 text-indigo-600"
        >
          <CalendarCheck className="mr-1" /> Manage Schedules
        </Button>
      </div>
      <SceduleSlotTable />
    </div>
  );
};

export default Page;
