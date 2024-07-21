'use client';
import { useContext } from 'react';
import { ReservationContext } from './ReservationContext';

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservationContext must be used within a ReservationProvider');
  }
  return context;
};
