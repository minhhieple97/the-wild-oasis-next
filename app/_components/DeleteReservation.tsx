'use client';
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteReservationAction } from '../_lib/actions';
import { useTransition } from 'react';
interface DeleteReservationProps {
  bookingId: string;
}
export const DeleteReservation = ({ bookingId }: DeleteReservationProps) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(() => {
      if (confirm('Are you sure you want to delete this reservation?')) {
        deleteReservationAction(bookingId);
      }
    });
  };
  return (
    <button
      className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
      onClick={handleDelete}
    >
      {isPending ? (
        <div className="border-t-transparent flex h-4 w-4 animate-spin items-center justify-center rounded-full border-2 border-primary-600" />
      ) : (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
          <span className="mt-1">Delete</span>
        </>
      )}
    </button>
  );
};
