'use client';
import { FC } from 'react';
import { Booking } from '../_types';
import ReservationCard from './ReservationCard';

export const Reservations: FC<{ bookings: Booking[] }> = ({ bookings }) => {
  return (
    <ul className="space-y-6">
      {bookings.map((booking: any) => (
        <ReservationCard booking={booking} key={booking.id} />
      ))}
    </ul>
  );
};
