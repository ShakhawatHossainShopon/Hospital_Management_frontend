'use client';
import { APIKit } from '@/common/helpers/APIKit';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';
const formSchema = z.object({
  medicine_name: z.string().min(1),
  category_name: z.string().min(1),
  slug: z.string().min(1),
  generic_name: z.string().min(1),
  strength: z.string().min(1),
  manufacturer_name: z.string().min(1),
  unit: z.string().min(1),
  unit_size: z.string().min(1),
  price: z.coerce.number().min(1),
});
const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    APIKit.medicine
      .AddMedicine(data)
      .then(() => {
        toast.success('Medicine added successfully');
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
          <h4 className="font-medium ">Add Medicine</h4>
        </div>
        <div className="flex justify-center items-center w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 p-6 w-full bg-white rounded-lg"
          >
            {/* Medicine Name */}
            <div className="w-full">
              <Input
                label="Medicine Name"
                required
                placeholder="Enter Full Medicine Name"
                {...register('medicine_name')}
                error={errors.medicine_name?.message}
              />
            </div>

            {/* Category & Slug */}
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Category"
                  required
                  placeholder="Enter Category Name"
                  {...register('category_name')}
                  error={errors.category_name?.message}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Slug"
                  required
                  placeholder="Enter Slug"
                  {...register('slug')}
                  error={errors.slug?.message}
                />
              </div>
            </div>

            {/* Generic & Strength */}
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Generic Name"
                  required
                  placeholder="Enter Generic Name"
                  {...register('generic_name')}
                  error={errors.generic_name?.message}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Strength"
                  required
                  placeholder="Enter Strength (e.g. 500mg)"
                  {...register('strength')}
                  error={errors.strength?.message}
                />
              </div>
            </div>

            {/* Manufacturer & Unit */}
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Manufacturer"
                  required
                  placeholder="Enter Manufacturer Name"
                  {...register('manufacturer_name')}
                  error={errors.manufacturer_name?.message}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Unit"
                  required
                  placeholder="Enter Unit (e.g. box, strip)"
                  {...register('unit')}
                  error={errors.unit?.message}
                />
              </div>
            </div>

            {/* Unit Size & Price */}
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Unit Size"
                  required
                  placeholder="Enter Unit Size"
                  {...register('unit_size')}
                  error={errors.unit_size?.message}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Price"
                  type="number"
                  required
                  placeholder="Enter Price"
                  {...register('price')}
                  error={errors.price?.message}
                />
              </div>
            </div>

            <Button isLoading={loading} className="mt-1 text-xs" type="submit">
              Add Medicine
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
