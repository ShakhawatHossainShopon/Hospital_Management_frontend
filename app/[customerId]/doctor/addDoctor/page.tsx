'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/SelectComp';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

// 1. Define Zod schema with error messages
const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  firstname: z.string().min(1, { message: 'Firstname is required' }),
  workingOrganization: z.string().min(1, { message: 'Working Organization is required' }),
  availableTime: z.string().min(1, { message: 'Available Time is required' }),
  bmdcCode: z.string().min(1, { message: 'BMDC Code is required' }),
  jobDesignation: z.string().min(1, { message: 'Job Designation is required' }),
  bookingPhone: z.string().min(1, { message: 'Booking Phone is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  medicalDegree: z.string().min(1, { message: 'Medical Degree is required' }),
  consultancyFee: z.string().min(1, { message: 'Consultancy Fee is required' }),
  mobile: z.string().min(1, { message: 'Mobile is required' }),
  provideServiceFor: z.string().min(1, { message: 'Provide Service is required' }),
  aboutSpecialist: z.string().min(1, { message: 'Description is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  speciality: z.string().min(1, { message: 'Speciality is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  startPractising: z.string().min(1, { message: 'Start Practising is required' }),
  achievements: z.string().min(1, { message: 'Achievements is required' }),
});

const Page = () => {
  // 2. Infer TypeScript type from schema
  type FormData = z.infer<typeof formSchema>;

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
    console.log(data);
  };
  return (
    <div>
      <div className="pb-4 flex w-full justify-between items-center">
        <h4>Add New Doctor</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReusableSelect
                  label="Title"
                  options={options}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Title"
                />
              )}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div className="w-full">
            <Input
              label="Firstname"
              placeholder="Enter Firstname"
              {...register('firstname')}
              error={errors.firstname?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Working Organization"
              placeholder="Enter Working Organization"
              {...register('workingOrganization')}
              error={errors.workingOrganization?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Available Time"
              placeholder="Enter Available Time"
              {...register('availableTime')}
              error={errors.availableTime?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="BMDC Code"
              placeholder="Enter BMDC Code"
              {...register('bmdcCode')}
              error={errors.bmdcCode?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Job Designation"
              placeholder="Enter Job Designation"
              {...register('jobDesignation')}
              error={errors.jobDesignation?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Booking Phone"
              placeholder="Enter Booking Phone"
              {...register('bookingPhone')}
              error={errors.bookingPhone?.message}
            />
          </div>
          <div className="w-full">
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReusableSelect
                  label="Gender"
                  options={genderOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Gender"
                />
              )}
            />
            {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
          </div>
          <div className="w-full">
            <Input
              label="Medical Degree"
              placeholder="Enter Medical Degree"
              {...register('medicalDegree')}
              error={errors.medicalDegree?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="Consultancy Fee"
              placeholder="Enter Consultancy Fee"
              {...register('consultancyFee')}
              error={errors.consultancyFee?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Mobile"
              type="number"
              placeholder="Enter Mobile Number"
              {...register('mobile')}
              error={errors.mobile?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Provide Service For"
              placeholder="Enter Service Provided"
              {...register('provideServiceFor')}
              error={errors.provideServiceFor?.message}
            />
          </div>
        </div>

        <div className="md:flex gap-6 w-full">
          <div className="w-full">
            <Input
              label="About The Specialist"
              placeholder="Enter Description"
              {...register('aboutSpecialist')}
              error={errors.aboutSpecialist?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Email"
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
              label="Password"
              placeholder="Enter Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Start Practising"
              placeholder="Enter Start Practising Date"
              {...register('startPractising')}
              error={errors.startPractising?.message}
            />
          </div>
          <div className="w-full">
            <Input
              label="Achievements"
              placeholder="Enter Achievements"
              {...register('achievements')}
              error={errors.achievements?.message}
            />
          </div>
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
