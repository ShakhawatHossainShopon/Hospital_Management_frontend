/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { APIKit } from '@/common/helpers/APIKit';
import { Input } from '@/components/ui/input';
import { IoIosWarning } from 'react-icons/io';
import PatientBillingCard from '@/components/PatientBillingCard';

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [debouncedPhone, setDebouncedPhone] = useState<string>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedPhone(phoneNumber);
    }, 300);
    return () => clearTimeout(timeout);
  }, [phoneNumber]);

  const { data: patientData, isLoading: ispatientLoading } = useQuery({
    queryKey: ['get-patieents-1434', debouncedPhone],
    queryFn: async () => {
      try {
        const res = await APIKit.patient.getPatientByPhone(debouncedPhone);
        return res.data;
      } catch {
        return null;
      }
    },
    enabled: !!debouncedPhone,
    retry: false,
  });

  return (
    <div className="p-4 bg-white rounded-lg flex w-full gap-10">
      <div className="flex justify-between gap-6 w-full">
        <div className="space-y-6 w-full">
          <h3 className="p-2 font-medium rounded-lg bg-blue-300 text-black text-xs">
            Medical Chamber : New Pharma
          </h3>

          <div className="w-full mt-6">
            <Input
              label="Phone Number"
              required={true}
              value={phoneNumber || ''}
              placeholder="Enter Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value as string);
              }}
              type="number"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full">
          {ispatientLoading ? (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-600 p-2 animate-pulse rounded">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-300 rounded-full" />
                <div className="h-4 w-24 bg-blue-300 rounded" />
              </div>
              <div className="mt-2 h-3 w-60 bg-blue-200 rounded" />
            </div>
          ) : patientData ? (
            <PatientBillingCard data={patientData} />
          ) : debouncedPhone && !patientData ? (
            <div
              className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2"
              role="alert"
            >
              <div className="flex items-center gap-2">
                <IoIosWarning className="text-lg text-orange-800" />
                <p className="font-bold text-sm text-orange-800">Patient Not Found!</p>
              </div>
            </div>
          ) : (
            <div
              className="bg-blue-100 border-l-4 border-blue-500 text-orange-700 p-2"
              role="alert"
            >
              <div className="flex items-center gap-2">
                <IoIosWarning className="text-lg text-blue-600" />
                <p className="font-bold text-sm text-blue-600">Heads Up!</p>
              </div>

              <p className="capitalize text-xs text-blue-600 mt-1">
                Patient Registered with phone number will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
