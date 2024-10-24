// components/DoctorCard.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import type { Doctor } from '@/app/page';

type DoctorCardProps = {
  doctor: Doctor;
};

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const router = useRouter();

  const handleBooking = () => {
    router.push(`/details?doctorId=${doctor.id}`);
  };
  return (
    <div className="max-w-xs rounded-lg bg-white p-4 shadow-lg">
      <Image
        src={doctor.profilePicture}
        width={200}
        height={200}
        alt="Doctor Image"
        className="mx-auto mb-4 size-32 rounded-lg border"
      />
      <div className="rounded-lg bg-slate-200 py-2 shadow-lg">
        <h2 className="text-center text-lg font-semibold">{doctor.name}</h2>
        <p className="text-center text-gray-600">{doctor.specialization}</p>
        <p className="text-center text-sm text-gray-500">
          {doctor.experience}
          {' '}
          years of experience
        </p>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleBooking}
          >
            Book an appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
