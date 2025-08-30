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
  service_name: z.string().min(1),
  unit_price: z.coerce.number().min(1),
  des: z.string().min(1),
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
    APIKit.services
      .AddServices(data)
      .then(() => {
        toast.success('Service added successfully');
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
          <h4 className="font-medium ">Add Services</h4>
        </div>
        <div className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-6 w-full bg-white rounded-lg"
          >
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="service name"
                  required={true}
                  placeholder="Enter Service Name"
                  {...register('service_name')}
                  error={errors.service_name?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  type="number"
                  label="Unit Price"
                  required={true}
                  placeholder="Enter Price"
                  {...register('unit_price')}
                  error={errors.unit_price?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Textarea
                  label="description"
                  required={true}
                  placeholder="Enter Your Description"
                  {...register('des')}
                  error={errors.des?.message}
                />
              </div>
            </div>

            <Button isLoading={loading} className="mt-1 text-xs " type="submit">
              Add Services
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
