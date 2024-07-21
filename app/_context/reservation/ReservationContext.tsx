'use client';
import { ReservationContextType } from '@/app/_types';
import { createContext, FC, ReactNode, useState } from 'react';
import { DateRange } from 'react-day-picker';

const initialValue: ReservationContextType = {
  range: {
    from: undefined,
    to: undefined,
  },
  setRange: () => {},
  resetRange: () => {},
};
export const ReservationContext = createContext<ReservationContextType>(initialValue);
export const ReservationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const resetRange = () => setRange(initialValue.range);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};
