'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import z from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { APIKit } from '@/common/helpers/APIKit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  fullname: z.string().min(1),
  rf_code: z.string().min(1),
  phone: z.coerce.number().min(1),
  address: z.string().min(1),
  remarks: z.string().min(1),
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
    APIKit.references
      .AddReferences(data)
      .then(() => {
        toast.success('Reference added successfully');
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
      <div>
        <div className="pb-4 flex pl-2 w-full justify-between items-center ">
          <h4 className="font-medium ">Add References</h4>
        </div>
        <div className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-6 w-full bg-white rounded-lg"
          >
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="full name"
                  required={true}
                  placeholder="Enter Full Name"
                  {...register('fullname')}
                  error={errors.fullname?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="rf code"
                  required={true}
                  placeholder="Enter RF Code"
                  {...register('rf_code')}
                  error={errors.rf_code?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  type="number"
                  label="Phone Number"
                  required={true}
                  placeholder="Enter Your Phone"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>
            </div>
            <div className="w-full">
              <Textarea
                label="Address"
                placeholder="Enter Your Phone"
                {...register('address')}
                error={errors.address?.message}
              />
            </div>
            <div className="w-full">
              <Textarea
                label="Remarks"
                placeholder="Enter Your Phone"
                {...register('remarks')}
                error={errors.remarks?.message}
              />
            </div>

            <Button isLoading={loading} className="mt-1 text-xs " type="submit">
              Add References
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
