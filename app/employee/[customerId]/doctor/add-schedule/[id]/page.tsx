/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';
const options = [
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];
const format = [
  { value: 'PM', label: 'AM' },
  { value: 'AM', label: 'PM' },
];

const formSchema = z.object({
  day: z.string().min(1, { message: 'Title is required' }),
  startTime: z.string().min(1, { message: 'Start Time is required' }),
  time_indicator: z.string().min(1, { message: 'Time Indicator is required' }),
  capacity: z.coerce.number().min(1, { message: 'Capacity is required' }),
  duration: z.coerce.number().min(1, { message: 'Suration is required' }),
});

const Page = () => {
  const { id } = useParams();
  type FormData = z.output<typeof formSchema>;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(loading);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
  });
  const onSubmit = (data: FormData) => {
    console.log(data);

    const paylaod = {
      day: data?.day,
      startTime: data?.startTime,
      capacity: data?.capacity,
      duration: data?.duration,
      time_indicator: data?.time_indicator,
      doctor_id: id,
    };
    setLoading(true);
    APIKit.Scedule.addScedule(paylaod)
      .then(() => {
        toast.success('Doctor added successfully');
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
      <div className="flex justify-center items-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 p-6 md:w-2/3 bg-white rounded-lg"
        >
          <div className="pb-4 flex w-full justify-between items-center ">
            <h4 className="font-medium ">Add Scedule</h4>
          </div>
          <div className="md:flex gap-6 w-full">
            <div className="w-full">
              <Controller
                name="day"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ReusableSelect
                    label="Selete Day"
                    required={true}
                    options={options}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Selete Day"
                    error={errors.day?.message}
                  />
                )}
              />
            </div>

            <div className="w-full">
              <Input
                label="start time"
                required={true}
                placeholder="09:00"
                {...register('startTime')}
                error={errors.startTime?.message}
              />
            </div>
            <div className="w-full">
              <Controller
                name="time_indicator"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ReusableSelect
                    label="Title"
                    required={true}
                    options={format}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Title"
                    error={errors.time_indicator?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="md:flex gap-6 w-full">
            <div className="w-full">
              <Input
                type="number"
                label="Patient capacity"
                required={true}
                placeholder="20"
                {...register('capacity')}
                error={errors.capacity?.message}
              />
            </div>
            <div className="w-full">
              <Input
                type="number"
                label="per duration (in minutes)"
                required={true}
                placeholder="20"
                {...register('duration')}
                error={errors.duration?.message}
              />
            </div>
          </div>
          <Button isLoading={loading} className="mt-1 text-xs " type="submit">
            Add Scedule
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
