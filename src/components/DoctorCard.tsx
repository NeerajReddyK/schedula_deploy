// components/DoctorCard.tsx

import Image from 'next/image';
import React from 'react';

import type { Doctor } from '@/app/page';

type DoctorCardProps = {
  doctor: Doctor;
};

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="max-w-xs rounded-lg bg-white p-4 shadow-lg">
      <Image
        src={doctor.profilePicture}
        width={200}
        height={200}
        alt="Doctor Image"
        className="mx-auto mb-4 size-32 rounded-full"
      />
      <div className="rounded-lg bg-slate-200 py-2 shadow-lg">
        <h2 className="text-center text-lg font-semibold">{doctor.name}</h2>
        <p className="text-center text-gray-600">{doctor.specialization}</p>
        <p className="text-center text-sm text-gray-500">
          {doctor.experience}
          {' '}
          years of experience
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
