'use client';

import Image from 'next/image';
import { updateGuestProfileAction } from '../_lib/actions';
import { Guest } from '../_types';

export const UpdateProfileForm = ({
  children,
  guest,
}: {
  children: React.ReactNode;
  guest: Guest;
}) => {
  const { fullName, email, nationalId, countryFlag } = guest;
  return (
    <form
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      action={updateGuestProfileAction}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="disabled:bg-gray-600 disabled:text-gray-400 w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="disabled:bg-gray-600 disabled:text-gray-400 w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="nationality">Where are y ou from?</label>
          <Image
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
            width={45}
            height={25}
          />
        </div>
        <div className="flex flex-col items-end justify-end gap-2">{children}</div>
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalId">National ID number</label>
        <input
          name="nationalId"
          defaultValue={nationalId}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <button className="disabled:bg-gray-500 disabled:text-gray-300 bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed">
          Update profile
        </button>
      </div>
    </form>
  );
};
