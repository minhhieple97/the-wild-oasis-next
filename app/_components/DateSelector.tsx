'use client';
import { isWithinInterval } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Cabin, Setting } from '../_types';
import { FC, useState } from 'react';
import { useReservationContext } from '../_context/reservation/useReservationContext';

function isAlreadyBooked(range: DateRange, datesArr: any[]) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) => isWithinInterval(date, { start: range.from, end: range.to }))
  );
}
interface DateSelectorProps {
  setting: Setting;
  bookedDates: any[];
  cabin: Cabin;
}
export const DateSelector: FC<DateSelectorProps> = ({ setting, bookedDates, cabin }) => {
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  const { minBookingLength, maxBookingLength } = setting;
  const { range, setRange, resetRange } = useReservationContext();
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        selected={range}
        onSelect={setRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">${regularPrice}</span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.from ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
};
