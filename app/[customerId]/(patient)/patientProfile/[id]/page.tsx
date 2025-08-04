'use client';
import { APIKit } from '@/common/helpers/APIKit';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import patienticon from '@/public/assets/patient-image.png';

const Page = () => {
  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['get-patient-by-id'],
    queryFn: async () => {
      const res = await APIKit.patient.getPatientById(params.id);
      return res.data;
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const patient = data?.patient;

  return (
    <>
      {/* Profile */}
      <div className="flex items-center gap-x-3">
        <div className="shrink-0">
          <Image
            className="rounded-full object-cover"
            src={patienticon}
            alt="Patient Avatar"
            width={64}
            height={64}
          />
        </div>
        <div className="grow">
          <h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
            {`${patient?.firstname} ${patient?.lastname}`}
          </h1>
          <p className="text-sm text-gray-600 dark:text-neutral-400">Type: {patient?.type}</p>
        </div>
      </div>
      {/* End Profile */}

      {/* About */}
      <div className="mt-8">
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          Guardian Name: {patient?.guardian_name}
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
          Blood Group: {patient?.blood_groupe}
        </p>
        <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
          Address: {patient?.address_line}, {patient?.area}, {patient?.city}, {patient?.postal_code}
        </p>
        <div className="mt-8 flex gap-22 text-sm text-gray-600 dark:text-neutral-400 space-y-2">
          <div>
            <p>
              <strong>Mobile Phone:</strong> {patient?.mobile_phone}
            </p>
            <p>
              <strong>Gender:</strong> {patient?.gender}
            </p>
            <p>
              <strong>Age:</strong> {patient?.age}
            </p>
            <p>
              <strong>Birth Date:</strong> {patient?.birth_date}
            </p>
            <p>
              <strong>Height:</strong> {patient?.height} ft
            </p>
            <p>
              <strong>Weight:</strong> {patient?.weight} kg
            </p>
          </div>
          <div>
            <p>
              <strong>City:</strong> {patient?.city}
            </p>
            <p>
              <strong>Area:</strong> {patient?.area}
            </p>
            <p>
              <strong>Postal Code:</strong> {patient?.postal_code}
            </p>
            <p>
              <strong>Created At:</strong> {new Date(patient?.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated At:</strong> {new Date(patient?.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {/* End About */}
    </>
  );
};

export default Page;
