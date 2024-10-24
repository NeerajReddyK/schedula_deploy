/* eslint-disable no-alert */
'use client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import MiniDoctor from '@/components/MiniDoctor';
import fetchDetails from '@/utils/fetchDetails';

import type { Doctor } from '../page';

type AppointmentParams = {
  id: string;
  date: string;
  slot: string;
  doctorId: number;
};

const ScheduledAppointment = () => {
  const [appointment, setAppointment] = useState<AppointmentParams | null>(null);
  const [doctor, setDoctor] = useState<Doctor>();
  const [doctorId, setDoctorId] = useState();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId');
  const router = useRouter();
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

  const fetchAppointmentDetails = async (id: string) => {
    try {
      const response = await axios.get(`${dbUrl}/appointments/${id}`);
      const appointmentData = response.data;
      const doctorId = appointmentData.doctorId;
      setDoctorId(doctorId);
      setAppointment(appointmentData);
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  useEffect(() => {
    if (appointmentId) {
      fetchAppointmentDetails(appointmentId);
    }
  }, [appointmentId]);
  useEffect(() => {
    const loadDetails = async () => {
      if (!doctorId) {
        return;
      }
      try {
        const response = await fetchDetails();
        const requiredDoc = response.find((doc: Doctor) => doc.id === doctorId);
        setDoctor(requiredDoc);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    loadDetails();
  }, [doctorId]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-4 w-1/4 rounded-xl bg-white p-6 shadow-xl">

        <h3 className=" pb-4 text-2xl font-bold">Appointment Scheduled</h3>
        <MiniDoctor doctor={doctor} />
        {/* Appointment Info */}
        <div className="mt-12 rounded-xl border bg-slate-50 p-4 shadow-lg">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Appointment Number:</div>
              <div className="text-lg font-semibold">
                #
                {appointment?.id}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">Status:</span>
                <span className="font-bold text-green-500">Active</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Reporting Time</span>
                <span className="font-medium">
                  {appointment?.date}
                  ,
                  <div>
                    {appointment?.slot}
                  </div>
                </span>
              </div>
            </div>
            <div className="mb-4 text-center">
              <button type="button" className="mt-4 flex items-center rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-200" onClick={() => alert('Functionality not implemented yet!')}>
                Add to calendar
              </button>
            </div>

          </div>

        </div>
        {/* Add Patient Details */}
        <div className="mt-12">
          <button
            type="button"
            className="mx-auto flex items-center rounded-lg border border-blue-500 px-4 py-2 font-semibold text-blue-500 hover:bg-blue-50"
            onClick={() => {
              router.push(`/patient-details?appointmentId=${appointmentId}`);
            }}
          >
            Add Patient Details
          </button>
        </div>
      </div>

    </div>
  );
};
export default ScheduledAppointment;
