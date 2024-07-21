'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservationContext } from '../_context/reservation/useReservationContext';

export const ReservationReminder = () => {
  const { range, resetRange } = useReservationContext();
  if (!range || !range.from || !range.to) return null;
  return (
    <div className="text shadow-slate-900 fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-8 rounded-full bg-accent-500 px-8 py-5 font-semibold text-primary-800 shadow-xl">
      <p>
        <span>👋</span> Don&apos;f forget to reserve your dates <br /> from{' '}
        {format(new Date(range.from), 'MMM dd yyyy')} to {format(new Date(range.to), 'MMM dd yyyy')}
      </p>
      <button className="rounded-full p-1 transition-all hover:bg-accent-600" onClick={resetRange}>
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
