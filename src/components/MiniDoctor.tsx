import Image from 'next/image';
import type React from 'react';

import type { Doctor } from '@/app/page';

type DoctorCardProps = {
  doctor?: Doctor;
};

const MiniDoctor: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div>
      <div className="flex flex-col ">

        <div className="flex items-center justify-center">
          <div className="flex w-full items-start justify-around rounded-xl border bg-blue-200 p-4 text-gray-700 shadow-xl">
            <div className="pt-4">
              <p className="text-2xl font-semibold">{doctor?.name}</p>
              <p>{doctor?.specialization}</p>
              <p className="pt-8">{doctor?.qualification}</p>

            </div>
            <div>
              <Image
              // eslint-disable-next-line ts/ban-ts-comment
              // @ts-ignore
                src={doctor?.profilePicture}
                alt="Doctor image"
                width={200}
                height={200}
                className="mx-auto mb-4 size-32 rounded-xl border"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MiniDoctor;
