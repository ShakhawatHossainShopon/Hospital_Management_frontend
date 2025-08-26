/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';
const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
});
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  type FormData = z.output<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
  });
  const onSubmit = (data: FormData) => {
    setLoading(true);
    APIKit.accounts
      .Addexpences(data)
      .then(() => {
        toast.success('Expence added successfully');
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
    <div className="w-full flex justify-center">
      <div className="w-1/2">
        <div className="pb-4 flex pl-2 w-full justify-between items-center ">
          <h4 className="font-medium ">Add Expences</h4>
        </div>
        <div className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-6 w-full bg-white rounded-lg"
          >
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Full Name"
                  required={true}
                  placeholder="Enter Expense Name"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  type="number"
                  label="Position"
                  required={true}
                  placeholder="Enter Price"
                  {...register('price')}
                  error={errors.price?.message}
                />
              </div>
            </div>

            <Button isLoading={loading} className="mt-1 text-xs " type="submit">
              Add Expense
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
