'use client';

import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIKit } from '@/common/helpers/APIKit';
import { toast } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const formSchema = z.object({
  firstname: z.string().min(1, { message: 'firstname is required' }),
  lastname: z.string().min(1, { message: 'lastname is required' }),
  guardian_name: z.string().optional().nullable(),
  mobile_phone: z.string().min(1, { message: 'Mobile Phone is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  age: z.string().min(1, { message: 'Age is required' }),
  birth_date: z.string().optional().nullable(),
  height: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  blood_groupe: z.string().optional().nullable(),
  address_line: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
});

type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Fetch existing patient data
  const { data, isLoading } = useQuery({
    queryKey: ['get-patient', params?.id],
    queryFn: async () => {
      const res = await APIKit.patient.getPatientById(params?.id);
      return res.data?.patient;
    },
  });

  // React Hook Form setup with defaultValues filled after data fetch
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      guardian_name: '',
      mobile_phone: '',
      gender: '',
      age: '',
      birth_date: '',
      height: '',
      weight: '',
      blood_groupe: '',
      address_line: '',
      city: '',
      area: '',
      postal_code: '',
    },
  });

  // When data is loaded, reset form with default values
  useEffect(() => {
    if (data) {
      reset({
        firstname: data.firstname ?? '',
        lastname: data.lastname ?? '',
        guardian_name: data.guardian_name ?? '',
        mobile_phone: data.mobile_phone ?? '',
        gender: data.gender ?? '',
        age: data.age?.toString() ?? '',
        birth_date: data.birth_date ?? '',
        height: data.height ?? '',
        weight: data.weight ?? '',
        blood_groupe: data.blood_groupe ?? '',
        address_line: data.address_line ?? '',
        city: data.city ?? '',
        area: data.area ?? '',
        postal_code: data.postal_code ?? '',
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: FormData) => {
    console.log(formData);

    setLoading(true);
    APIKit.patient
      .updatePatient(formData, params?.id) // Make sure your APIKit has updatePatient method
      .then(() => {
        toast.success('Patient updated successfully');
        router.back();
      })
      .catch((err) => {
        if (err?.response?.status === 422 && err?.response?.data?.errors) {
          const messages = Object.values(err.response.data.errors).flat();
          messages.forEach((msg) => toast.error(String(msg)));
        } else {
          toast.error('Something went wrong');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLoading) return <h1>Loading patient data...</h1>;

  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="font-medium">Update Patient</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 bg-white rounded-lg">
        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Firstname"
              required
              placeholder="Enter Firstname"
              {...register('firstname')}
              error={errors.firstname?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Lastname"
              required
              placeholder="Enter Lastname"
              {...register('lastname')}
              error={errors.lastname?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Guardian Name"
              placeholder="Enter Guardian Name"
              {...register('guardian_name')}
              error={errors.guardian_name?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Mobile Phone"
              required
              placeholder="Enter Mobile Phone"
              {...register('mobile_phone')}
              error={errors.mobile_phone?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Gender"
              required
              placeholder="Enter Gender"
              {...register('gender')}
              error={errors.gender?.message}
            />
          </div>
          <div className="w-full">
            <Input
              type="number"
              label="Age"
              required
              placeholder="Enter Age"
              {...register('age')}
              error={errors.age?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              type="date"
              label="Birth Date"
              {...register('birth_date')}
              error={errors.birth_date?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Height"
              placeholder="Enter Height"
              {...register('height')}
              error={errors.height?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Weight"
              placeholder="Enter Weight"
              {...register('weight')}
              error={errors.weight?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Blood Groupe"
              placeholder="Enter Blood Groupe"
              {...register('blood_groupe')}
              error={errors.blood_groupe?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="City"
              placeholder="Enter City"
              {...register('city')}
              error={errors.city?.message}
            />
          </div>
        </div>

        <h1 className="py-2">Address</h1>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Area"
              placeholder="Enter Area"
              {...register('area')}
              error={errors.area?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Postal Code"
              placeholder="Enter Postal Code"
              {...register('postal_code')}
              error={errors.postal_code?.message}
            />
          </div>
        </div>

        <div className="w-full">
          <Textarea
            label="Address Line"
            placeholder="Enter Address Line"
            {...register('address_line')}
            error={errors.address_line?.message}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button disabled={loading} className="mt-3 text-xs" type="submit">
            {loading ? 'Updating...' : 'Update Patient'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
