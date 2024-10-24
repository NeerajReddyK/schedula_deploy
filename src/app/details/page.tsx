'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import DatePicker from '@/components/DatePicker';
import MiniDoctor from '@/components/MiniDoctor';
import fetchDetails from '@/utils/fetchDetails';

import type { Doctor } from '../page';

const Details = () => {
  const [doctor, setDoctor] = useState<Doctor>();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  useEffect(() => {
    const loadDetails = async () => {
      if (!doctorId) {
        return;
      }
      try {
        const response = await fetchDetails();
        const requiredDoc = response.find((doc: Doctor) => doc.id.toString() === doctorId);
        setDoctor(requiredDoc);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    loadDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!doctor) {
    return <p>Loading Doctors...</p>;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-2xl border p-4 shadow-2xl">
        <div className="flex items-center justify-center p-2 py-4 text-3xl font-semibold">
          Book Appointment
        </div>
        <MiniDoctor doctor={doctor} />
        <DatePicker doctorId={doctor.id} />

      </div>

    </div>
  );
};

export default Details;
