/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { useQuery } from '@tanstack/react-query';
import { APIKit } from '@/common/helpers/APIKit';
import { Input } from '@/components/ui/input';
import PatientCard from '@/components/patientCard';
import { IoIosWarning } from 'react-icons/io';
import { formatTo12Hour } from '@/lib/FormatTo12Hour';
const Page = () => {
  const [slot, setSlot] = useState();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [debouncedPhone, setDebouncedPhone] = useState<string>();
  const [doctorId, setDoctorId] = useState('');
  const [day, setDay] = useState<number | string>();
  const { data: doctorname, isLoading: isloadingDoctor } = useQuery({
    queryKey: ['getDoctorName-name-34'],
    queryFn: async () => {
      const res = await APIKit.doctor.getDoctorName();
      return {
        data: res.data,
        status: res.status,
      };
    },
  });
  const options = doctorname?.data?.doctors?.map((value: { id: string; name: string }) => {
    return { value: value?.id, label: value?.name };
  });

  const { data, isLoading: loadingSlot } = useQuery({
    queryKey: ['get-scedule-14a4', doctorId, day],
    queryFn: async () => {
      try {
        const res = await APIKit.Scedule.AllScedule(doctorId, day);
        return res.data?.slots;
      } catch (err: any) {
        if (err?.response?.status === 404) {
          return [];
        }
        throw err;
      }
    },
    enabled: !!doctorId && !!day,
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;

    if (dateValue) {
      const dateObj = new Date(dateValue);
      setDay(dateObj.getDay());
    } else {
      setDay(0);
    }
  };

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
  console.log(data);

  if (isloadingDoctor) {
    return <h1>loading</h1>;
  }
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex justify-between gap-6">
        <div className="space-y-6 w-full">
          <h3 className="p-2 font-medium rounded-lg bg-blue-300 text-black text-xs">
            Medical Chamber : New Pharma
          </h3>
          <div className="flex gap-6 w-full">
            <div className="w-full">
              <ReusableSelect
                label="Doctor"
                required={true}
                options={options}
                onChange={(val) => setDoctorId(val)}
              />
            </div>

            <div>
              <Input
                type="date"
                label="Date"
                required={true}
                placeholder="select date"
                onChange={handleDateChange}
              />
            </div>
          </div>
          {loadingSlot ? (
            <div className="h-8 w-full bg-gray-200 animate-pulse rounded-md" />
          ) : data?.length === 0 ? (
            <p className="text-xs text-red-500">No slots available for this date.</p>
          ) : (
            <div>
              <ReusableSelect
                label="Slot"
                required={true}
                options={
                  Array.isArray(data)
                    ? data
                        .filter((slot: any) => slot.is_booked == 0)
                        .map((slot: any) => ({
                          value: slot.id,
                          label: formatTo12Hour(slot.time.slice(0, -3)),
                        }))
                    : []
                }
                onChange={(selected: any) => setSlot(selected)}
              />
            </div>
          )}
          <div>
            <hr />

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
                disabled={!slot}
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
              <PatientCard doctorId={doctorId} slotId={slot} data={patientData} />
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
    </div>
  );
};

export default Page;
