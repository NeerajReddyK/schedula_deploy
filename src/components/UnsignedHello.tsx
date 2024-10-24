'use client';
import { useRouter } from 'next/navigation';

const UnsignedHello = () => {
  const router = useRouter();
  return (
    <>
      <header className="mx-32 my-12 flex justify-between rounded-lg border bg-white py-2 text-2xl shadow-xl">
        <div className="ml-12 pt-2">
          Hello! Sign-in to book an appointment
        </div>
        <button
          type="button"
          onClick={() => router.push('/signin')}
          className="mr-24 rounded-full border bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          SignIn
        </button>
      </header>
      <body>

      </body>
    </>
  );
};

export default UnsignedHello;
