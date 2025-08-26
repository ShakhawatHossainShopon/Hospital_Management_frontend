'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import doctoricon from '@/public/assets/doctor-icon.png';

const Page = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['get-doctor-by-id'],
    queryFn: async () => {
      const res = await APIKit.doctor.getSingleDoctor(params.id);
      return res.data;
    },
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(data.doctor);

  return (
    <>
      {/* Profile */}
      <div className="flex items-center gap-x-3">
        <div className="shrink-0">
          <Image
            className="rounded-full object-cover"
            src={doctoricon}
            alt="Doctor Avatar"
            width={64}
            height={64}
          />
        </div>
        <div className="grow">
          <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
            {`${data?.doctor?.firstname} ${data?.doctor?.firstname}`}
          </h1>
          <p className="text-sm text-gray-600 dark:text-neutral-400">{data?.doctor?.degree_name}</p>
        </div>
      </div>
      {/* End Profile */}
      {/* About */}
      <div className="mt-8">
        <p className="text-sm text-gray-600 dark:text-neutral-400">{data?.doctor?.about}</p>
        <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
          {data?.doctor?.achievement}
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">{data?.doctor?.about}</p>
        <div className="mt-8 flex gap-22 text-sm text-gray-600 dark:text-neutral-400 space-y-2">
          <div>
            <p>
              <strong>Achievement:</strong> {data?.doctor?.achievement}
            </p>
            <p>
              <strong>Available Days:</strong> {data?.doctor?.available_days}
            </p>
            <p>
              <strong>BMDC Code:</strong> {data?.doctor?.bmdc_code}
            </p>
            <p>
              <strong>Booking Phone:</strong> {data?.doctor?.booking_phone}
            </p>
            <p>
              <strong>Consultancy Fee:</strong> {data?.doctor?.consultancy_fee} TK
            </p>
            <p>
              <strong>Email:</strong> {data?.doctor?.email}
            </p>
            <p>
              <strong>Gender:</strong> {data?.doctor?.gender}
            </p>
          </div>
          <div>
            <p>
              <strong>Job Designation:</strong> {data?.doctor?.job_designation}
            </p>
            <p>
              <strong>Mobile:</strong> {data?.doctor?.mobile}
            </p>
            <p>
              <strong>Provide Service:</strong> {data?.doctor?.provide_service}
            </p>
            <p>
              <strong>Speciality:</strong> {data?.doctor?.speciality}
            </p>
            <p>
              <strong>Starting Practice:</strong> {data?.doctor?.starting_pratice}
            </p>
            <p>
              <strong>Working Place:</strong> {data?.doctor?.working_place}
            </p>
          </div>
        </div>
      </div>
      {/* End About */}
    </>
  );
};

export default Page;
