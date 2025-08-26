'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import PatientCard from '@/components/patientCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IoIosWarning } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { MdEventAvailable } from 'react-icons/md';
const formSchema = z.object({
  mobile_phone: z.string().min(1),
  gender: z.string().min(1),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  age: z.string().min(1),
  note: z.string(),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [debouncedPhone, setDebouncedPhone] = useState<string>();
  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedPhone(phoneNumber);
    }, 300);
    return () => clearTimeout(timeout);
  }, [phoneNumber]);
  const { data, isLoading } = useQuery({
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
  const { id, slotId } = useParams() as { id: string; slotId: string };

  const onSubmit = (data: FormData) => {
    const payload = {
      firstname: data?.firstname,
      lastname: data?.lastname,
      mobile_phone: data?.mobile_phone,
      gender: data?.gender,
      age: data?.age,
      note: data?.note,
      doctor_id: id,
      slot_id: slotId,
    };

    setLoading(true);
    APIKit.appoinment
      .SaveAppoinment(payload)
      .then(() => {
        toast.success('Appoinment added successfully');
        router.back();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="text-lg font-medium">Add Appointment</h4>
      </div>
      <div className="flex w-full gap-16 bg-white p-4 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="gap-6 w-full ">
          <div className="w-full space-y-5">
            <div className="w-full">
              <Input
                label="Phone Number"
                required={true}
                value={phoneNumber || ''}
                placeholder="Enter Phone Number"
                {...register('mobile_phone')}
                error={errors.mobile_phone?.message}
                onChange={(e) => {
                  setPhoneNumber(e.target.value as string);
                }}
                type="number"
              />
            </div>
            <div className="md:flex gap-6 space-y-5 md:space-y-0">
              <div className="w-full">
                <Input
                  label="Firstname"
                  required={true}
                  placeholder="Enter Firstname"
                  {...register('firstname')}
                  error={errors.firstname?.message}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Lastname"
                  required={true}
                  placeholder="Enter Firstname"
                  {...register('lastname')}
                  error={errors.lastname?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Gender"
                  required={true}
                  placeholder="Enter Mobile Phone"
                  {...register('gender')}
                  error={errors.gender?.message}
                />
              </div>
              <div className="w-full">
                <Input
                  type="number"
                  label="Age"
                  required={true}
                  placeholder="Enter Age"
                  {...register('age')}
                  error={errors.age?.message}
                />
              </div>
            </div>
            <div className="w-full">
              <Textarea
                label="Note (optional)"
                placeholder="Enter Note"
                {...register('note')}
                error={errors.note?.message}
              />
            </div>
          </div>
          <Button isLoading={loading} disabled={data} className="mt-6 text-xs" type="submit">
            <MdEventAvailable /> Save Appointment
          </Button>
        </form>
        <div className="w-full">
          {isLoading ? (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-600 p-2 animate-pulse rounded">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-300 rounded-full" />
                <div className="h-4 w-24 bg-blue-300 rounded" />
              </div>
              <div className="mt-2 h-3 w-60 bg-blue-200 rounded" />
            </div>
          ) : data ? (
            <PatientCard doctorId={id} slotId={slotId} data={data} />
          ) : debouncedPhone && !data ? (
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
