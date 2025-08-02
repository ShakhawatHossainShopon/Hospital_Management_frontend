'use client';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIKit } from '@/common/helpers/APIKit';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';

const formSchema = z.object({
  firstname: z.string().min(1, { message: 'firstname is required' }),
  lastname: z.string().min(1, { message: 'firstname is required' }),
  guardian_name: z.string(),
  mobile_phone: z.string().min(1, { message: 'Mobile Phone is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  age: z.string().min(1, { message: 'Age is required' }),
  birth_date: z.string(),
  height: z.string().min(1, { message: 'Height is required' }),
  weight: z.string().min(1, { message: 'Weight is required' }),
  blood_groupe: z.string().min(1, { message: 'Blood Groupe is required' }),
  address_line: z.string(),
  city: z.string(),
  area: z.string(),
  postal_code: z.string(),
});

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: FormData) => {
    setLoading(true);
    APIKit.patient
      .addPatient(data)
      .then(() => {
        toast.success('Patient added successfully');
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
  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="font-medium">Add Patient</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 bg-white rounded-lg">
        <div className="md:flex gap-6 w-full">
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
          <div className="w-full">
            <Input
              label="guardian name"
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
              required={true}
              placeholder="Enter Mobile Phone"
              {...register('mobile_phone')}
              error={errors.mobile_phone?.message}
            />
          </div>
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
              placeholder="Height"
              {...register('height')}
              error={errors.height?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="weight"
              placeholder="Weight"
              {...register('weight')}
              error={errors.weight?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="blood groupe"
              placeholder="Enter Blood Groupe"
              {...register('blood_groupe')}
              error={errors.blood_groupe?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="city"
              required={true}
              placeholder="Enter city"
              {...register('city')}
              error={errors.city?.message}
            />
          </div>
        </div>
        <h1 className="py-2">Address</h1>
        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="area"
              required={true}
              placeholder="Enter Area"
              {...register('area')}
              error={errors.area?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="postal code'"
              required={true}
              placeholder="Enter Postal Code"
              {...register('postal_code')}
              error={errors.postal_code?.message}
            />
          </div>
        </div>
        <div className="w-full">
          <Textarea
            label="address line"
            placeholder="Enter Address Line"
            {...register('address_line')}
            error={errors.address_line?.message}
          />
        </div>
        <div className="flex w-full justify-end">
          <Button className="mt-3 text-xs" type="submit">
            Add Patient
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
