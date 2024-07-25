'use client';
import { updateReservation } from '@/app/_lib/actions';
import { Booking } from '@/app/_types';
import { FC } from 'react';
import { useFormStatus } from 'react-dom';
import { useFormState } from 'react-dom';

export const UpdateReservationForm: FC<Booking> = ({
  numGuests,
  cabins: { maxCapacity },
  observations,
  id,
}) => {
  return (
    <form
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      action={updateReservation}
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          required
          defaultValue={numGuests}
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? 'guest' : 'guests'}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">Anything we should know about your stay?</label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>
      <input defaultValue={id} name="bookingId" className="hidden"></input>
      <div className="flex items-center justify-end gap-6">
        <Button></Button>
      </div>
    </form>
  );
};

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="disabled:bg-gray-500 disabled:text-gray-300 bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? 'Updating...' : 'Update reservation'}
    </button>
  );
};
