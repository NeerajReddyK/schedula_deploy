'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import BookDoctor from '@/components/BookDoctor';
import DoctorCard from '@/components/DoctorCard';
import SignedHello from '@/components/SignedHello';
import UnsignedHello from '@/components/UnsignedHello';
import fetchDetails from '@/utils/fetchDetails';

export type Doctor = {
  id: number;
  name: string;
  profilePicture: string;
  specialization: string;
  experience: number;
  qualification: string;
  college: string;
};

const Home = () => {
  const { data: session, status } = useSession();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const loadDetails = async () => {
      const data = await fetchDetails();
      setDoctors(data);
    };
    loadDetails();
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <div className="mb-12 min-h-screen">
        <UnsignedHello />

        <h1 className="mb-8 text-center text-3xl font-bold">Available Doctors</h1>
        <div className="mx-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    );
  }

  // If the user is authenticated
  const name = session.user?.name ?? 'Guest';

  return (

    <div className="mb-12 min-h-screen">
      <SignedHello name={name} />

      <h1 className="mb-8 text-center text-3xl font-bold">Available Doctors</h1>
      <div className="mx-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map(doctor => (
          <BookDoctor key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>

  );
};

export default function HomeWrapper() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
