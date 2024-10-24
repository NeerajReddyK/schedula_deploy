/* eslint-disable no-alert */
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const generateNext7Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    dates.push(nextDay);
  }

  return dates;
};
const timeSlots = [
  '09:30 AM - 09:45 AM',
  '10:00 AM - 10:15 AM',
  '10:30 AM - 10:45 AM',
  '11:00 AM - 11:15 AM',
  '11:30 AM - 11:45 AM',
  '12:00 PM - 12:15 PM',
];
const evngSlots = [
  '3:00 PM - 3:15 PM',
  '3:30 PM - 3:45 PM',
  '4:00 PM - 4:15 PM',
  '4:30 PM - 4:45 PM',

];
type DateSelectionProps = {
  doctorId: number;
};
const DateSelection: React.FC<DateSelectionProps> = ({ doctorId }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const router = useRouter();
  const dates = generateNext7Days();

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  const [monthYear, setMonthYear] = useState<Date>(dates[0]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setMonthYear(date);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setMonthYear(date);
  };
  const handleSlotClick = (slot: string) => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      alert('Please select both a date and a time slot');
      return;
    }

    const appointmentDetails = {
      date: format(selectedDate, 'yyyy-MM-dd'),
      slot: selectedSlot,
      doctorId,
    };

    const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

    try {
      const response = await axios.post(`${dbUrl}/appointments`, appointmentDetails);
      if (response.status === 201) {
        alert('Appointment booked succesfully');
        const appointmentId = response.data.id;
        router.push(`/scheduled?appointmentId=${appointmentId}`);
      } else {
        alert('Error booking appointment. Please try again later');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="mb-4 flex items-center justify-center">
        <h2 className="text-lg font-semibold">
          {format(monthYear, 'MMMM, yyyy')}
        </h2>
        <DatePicker
          selected={selectedDate}
          // eslint-disable-next-line ts/ban-ts-comment
          // @ts-ignore
          onChange={(date: Date) => handleDateChange(date)}
          customInput={(
            <button className="bg-transparent text-blue-500" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M5 8h14V6h-2V4H7v2H5v2zm14 10H5v-9h14v9zM9 14h2v2H9v-2zm4 0h2v2h-2v-2z" />
              </svg>
            </button>
          )}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {dates.map((date, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`flex h-16 w-12 cursor-pointer flex-col items-center justify-center rounded-lg transition-all 
              ${
          selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
            ? 'bg-blue-500 text-white' // Active date styling
            : 'border border-gray-300 bg-white text-gray-500'
          }`}
            onClick={() => handleDateClick(date)}
          >
            <span className="text-sm font-medium">{format(date, 'd')}</span>
            <span className="text-xs">{format(date, 'EEE')}</span>
          </div>
        ))}
      </div>
      <div className="my-6">
        <h3 className="mb-2 text-lg font-semibold">Select slot</h3>
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((slot, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`rounded-lg border p-2 ${
                // eslint-disable-next-line ts/ban-ts-comment
                // @ts-ignore
                selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
              }`}
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
        <h3 className="mb-2 text-lg font-semibold">Evening Slots</h3>
        <div className="grid grid-cols-2 gap-4">
          {evngSlots.map((slot, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`rounded-lg border p-2 ${
                // eslint-disable-next-line ts/ban-ts-comment
                // @ts-ignore
                selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
              }`}
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleBooking}
      >
        Book appointment
      </button>

    </div>
  );
};

export default DateSelection;
