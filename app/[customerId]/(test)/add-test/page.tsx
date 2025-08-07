/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Plus } from 'lucide-react';
import { APIKit } from '@/common/helpers/APIKit';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const testSchema = z.object({
  item_name: z.string().min(1, 'Item name is required'),
  code: z.string().optional(),
  groupe_id: z.string(),
  unit_price: z.string().min(1, 'Unit price is required'),
  max_discound: z.string().optional(),
  des: z.string().optional(),
});

const groupeSchema = z.object({
  name: z.string().min(1, 'Groupe name is required'),
  description: z.string().optional(),
});

export default function Page() {
  const [groupeLoading, setGroupeLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
  });

  const {
    register: registerGroupe,
    handleSubmit: handleSubmitGroupe,
    formState: { errors: errorsGroupe },
    reset: resetGroupe,
  } = useForm<z.infer<typeof groupeSchema>>({
    resolver: zodResolver(groupeSchema),
  });

  const onSubmitTest = (data: z.infer<typeof testSchema>) => {
    setGroupeLoading(true);
    console.log(data);

    APIKit.Test.AddTest(data)
      .then(() => {
        toast.success('Test added successfully');
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setGroupeLoading(false); // ✅ End loading
        reset();
      });
  };

  const { data, isLoading } = useQuery({
    queryKey: ['get-Allappointment-14a54'],
    queryFn: async () => {
      try {
        const res = await APIKit.Test.getGroupe();
        return res?.data?.groupe;
      } catch (err: any) {
        if (err?.response?.status === 404) {
          return [];
        }
        throw err;
      }
    },
  });
  const options = data?.map((value: { id: number; name: string }) => {
    return {
      value: `${value?.id}`,
      label: value?.name,
    };
  });

  const onSubmitGroupe = (data: z.infer<typeof groupeSchema>) => {
    setGroupeLoading(true);
    APIKit.Test.AddGroupe(data)
      .then(() => {
        toast.success('Groupe added successfully');
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setGroupeLoading(false); // ✅ End loading
        resetGroupe();
      });
  };

  return (
    <>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4 className="text-sm font-medium">Add Test</h4>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <form onSubmit={handleSubmit(onSubmitTest)} className="space-y-6 w-full">
          <div className="md:flex gap-6 w-full">
            <div className="w-full">
              <Input
                required={true}
                label="Item Name"
                placeholder="Enter Item Name"
                {...register('item_name')}
                error={errors.item_name?.message}
              />
            </div>
            <div className="w-full">
              <Input
                label="Code"
                placeholder="Enter Code"
                {...register('code')}
                error={errors.code?.message}
              />
            </div>
            {isLoading ? (
              <div className="w-full animate-pulse">
                <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-full bg-gray-200 rounded"></div>
              </div>
            ) : (
              <div className="w-full">
                <Controller
                  name="groupe_id"
                  control={control}
                  render={({ field }) => (
                    <ReusableSelect
                      label="groupe"
                      required={true}
                      options={options}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Title"
                      error={errors.groupe_id?.message}
                    />
                  )}
                />
                {data?.length === 0 && (
                  <p className="text-[10px] text-red-500 mt-1">
                    No Groupe added. Please add to select Groupe.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="md:flex gap-6 w-full md:space-y-6 space-y-4">
            <div className="w-full">
              <Input
                type="number"
                required={true}
                label="Unit Price"
                placeholder="Enter Unit Price"
                {...register('unit_price')}
                error={errors.unit_price?.message}
              />
            </div>
            <div className="w-full">
              <Input
                type="number"
                label="Max Discount (%)"
                placeholder="Enter Max Discount"
                {...register('max_discound')}
                error={errors.max_discound?.message}
              />
            </div>
          </div>
          <div className="md:flex gap-6 w-full">
            <Textarea
              label="Description"
              className="w-full"
              placeholder="Enter Description"
              {...register('des')}
              error={errors.des?.message}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button isLoading={groupeLoading} type="submit" className="text-xs">
              <Plus /> Add Test
            </Button>
          </div>
        </form>

        <div className="pb-3 mt-6 flex w-full justify-between items-center">
          <h4 className="text-sm font-medium">Add Groupe</h4>
        </div>
        <hr className="border-1" />
        <form onSubmit={handleSubmitGroupe(onSubmitGroupe)} className="space-y-6">
          <div className="w-full mt-6">
            <Input
              required={true}
              label="Groupe Name"
              placeholder="Enter Groupe Name"
              {...registerGroupe('name')}
              error={errorsGroupe.name?.message}
            />
          </div>
          <div className="md:flex gap-6 w-full">
            <Textarea
              label="Description"
              className="w-full"
              placeholder="Enter Description"
              {...registerGroupe('description')}
              error={errorsGroupe.description?.message}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button isLoading={groupeLoading} type="submit" className="text-xs">
              <Plus /> Add Groupe
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
