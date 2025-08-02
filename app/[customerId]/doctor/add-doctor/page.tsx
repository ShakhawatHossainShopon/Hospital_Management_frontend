'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { APIKit } from '@/common/helpers/APIKit';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

// 1. Define Zod schema with error messages
const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  firstname: z.string().min(1, { message: 'firstname is required' }),
  lastname: z.string().min(1, { message: 'lastname is required' }),
  bmdc_code: z.string().min(1, { message: 'bmdc code is required' }),
  booking_phone: z.string().min(1, { message: 'booking phone is required' }),
  gender: z.string().min(1, { message: 'gender is required' }),
  consultancy_fee: z.string().min(1, { message: 'consultancy_fee is required' }),
  mobile: z.string().min(1, { message: 'mobile is required' }),
  email: z.email().min(1, { message: 'email is required' }),
  password: z.string().min(1, { message: 'password is required' }),
  working_place: z.string(),
  available_days: z.string().min(1, { message: 'available_time is required' }),
  job_designation: z.string(),
  degree_name: z.string(),
  provide_service: z.string(),
  about: z.string(),
  speciality: z.string(),
  starting_pratice: z.string(),
  achievement: z.string(),
});

const Page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  type FormData = z.infer<typeof formSchema>;
  console.log(loading);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const options = [{ value: 'Dr', label: 'Dr' }];
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const onSubmit = (data: FormData) => {
    setLoading(true);
    APIKit.doctor
      .addDoctor(data)
      .then(() => {
        toast.success('Doctor added successfully');
        queryClient.invalidateQueries({ queryKey: ['getUser-name-34'] });
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
        setLoading(false); // ✅ End loading
      });
  };
  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4>Add New Doctor</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 bg-white rounded-lg">
        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReusableSelect
                  label="Title"
                  required={true}
                  options={options}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Title"
                  error={errors.gender?.message}
                />
              )}
            />
          </div>
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
              label="Working Organization"
              placeholder="Enter Working Organization"
              {...register('working_place')}
              error={errors.working_place?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Available Time"
              placeholder="Enter Available Time"
              {...register('available_days')}
              error={errors.available_days?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="BMDC Code"
              required={true}
              placeholder="Enter BMDC Code"
              {...register('bmdc_code')}
              error={errors.bmdc_code?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Job Designation"
              placeholder="Enter Job Designation"
              {...register('job_designation')}
              error={errors.job_designation?.message}
            />
          </div>
          <div className="w-full">
            <Input
              required={true}
              label="Booking Phone"
              placeholder="Enter Booking Phone"
              {...register('booking_phone')}
              error={errors.booking_phone?.message}
            />
          </div>
          <div className="w-full">
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReusableSelect
                  required={true}
                  label="Gender"
                  options={genderOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Gender"
                  error={errors.gender?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Medical Degree"
              placeholder="Enter Medical Degree"
              {...register('degree_name')}
              error={errors.degree_name?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Consultancy Fee"
              required={true}
              type="number"
              placeholder="Enter Consultancy Fee"
              {...register('consultancy_fee')}
              error={errors.consultancy_fee?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Mobile"
              required={true}
              type="number"
              placeholder="Enter Mobile Number"
              {...register('mobile')}
              error={errors.mobile?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="About The Specialist"
              placeholder="Enter Description"
              {...register('about')}
              error={errors.about?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Email"
              required={true}
              placeholder="Enter Email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Speciality"
              placeholder="Enter Speciality"
              {...register('speciality')}
              error={errors.speciality?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Provide Service For"
              placeholder="Enter Service Provided"
              {...register('provide_service')}
              error={errors.provide_service?.message}
            />
          </div>
          <div className="w-full">
            <Input
              required={true}
              label="Password"
              placeholder="Enter Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          <div className="w-full">
            <Input
              type="date"
              label="Start Practising"
              placeholder="Enter Start Practising Date"
              {...register('starting_pratice')}
              error={errors.starting_pratice?.message}
            />
          </div>
        </div>
        <div className="w-full">
          <Textarea
            label="Achievements"
            placeholder="Enter Achievements"
            {...register('achievement')}
            error={errors.achievement?.message}
          />
        </div>
        <div className="flex w-full justify-end">
          <Button className="mt-3 text-xs" type="submit">
            <Plus /> Add New Doctor
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
