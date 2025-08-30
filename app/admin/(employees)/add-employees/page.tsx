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
  position: z.string().min(1),
  email: z.string().min(1),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-zA-Z]/, { message: 'Password must include at least one letter' })
    .regex(/[0-9]/, { message: 'Password must include at least one number' }),
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
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (data: FormData) => {
    setLoading(true);
    APIKit.employees
      .AddEmployee(data)
      .then(() => {
        toast.success('Employee added successfully');
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
                  label="Full Name"
                  required={true}
                  placeholder="Enter Service Name"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  type="text"
                  label="Position"
                  required={true}
                  placeholder="Enter Position"
                  {...register('position')}
                  error={errors.position?.message}
                />
              </div>
            </div>
            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Email"
                  required={true}
                  placeholder="Enter Your Email"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
            </div>

            <div className="md:flex gap-6 w-full">
              <div className="w-full">
                <Input
                  label="Password"
                  type="password"
                  required={true}
                  placeholder="Enter Your Password"
                  {...register('password')}
                  error={errors.password?.message}
                />
              </div>
            </div>

            <Button isLoading={loading} className="mt-1 text-xs " type="submit">
              Add Employee
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
