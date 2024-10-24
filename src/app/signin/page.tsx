'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';

const CLogin = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="m-auto flex w-full max-w-4xl rounded-lg bg-white shadow-xl">

        {/* Image section */}
        <div className="hidden w-full items-center justify-center p-8 py-24 md:flex md:w-1/2">

          <div className="relative size-80">
            <Image
              src="/doctor_image.png"
              alt="Doctor Image"
              layout="fill"
              objectFit="contain"
              className=" rounded-lg"
            />
          </div>
        </div>
        {/* signup form  section */}
        <div className="flex w-full flex-col items-center p-8 py-24  md:block md:w-1/2">
          <div className="mb-4 flex justify-between">
            <h2 className="mb-2 text-2xl font-bold">Sign-in</h2>

          </div>

          {/* Form starts here */}

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-gray-600">Email ID</label>
              <input
                type="text"
                id="email"
                placeholder="Email ID"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 md:mb-3"
              />
            </div>

            <button
              type="button"
              // eslint-disable-next-line no-alert
              onClick={() => alert('Please login using Google!')}
              className="w-full rounded-md bg-blue-500 py-3 text-white transition duration-300 hover:bg-blue-600 "
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full rounded-md bg-blue-500 py-3 text-white transition duration-300 hover:bg-blue-600 "
            >
              Google
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default CLogin;
