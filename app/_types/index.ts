import { Dispatch, SetStateAction } from 'react';
import { DateRange } from 'react-day-picker';

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string; // Assuming image is a string URL or path
  description: string;
}

export enum CapacityEnum {
  ALL = 'all',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export interface SearchParams {
  capacity: CapacityEnum | CapacityEnum[];
  [key: string]: string | string[] | undefined;
}

export interface Setting {
  id: number;
  created_at: string; // ISO 8601 date string
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export type ReservationContextType = {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

export interface Guest {
  id: number;
  createdAt: string; // ISO 8601 date string
  fullName: string;
  email: string;
  nationalId: string;
  nationality: string;
  countryFlag: string;
}

export interface Booking {
  id: number;
  created_at: string; // ISO string format for timestamp with time zone
  startDate: string; // ISO string format for timestamp without time zone
  endDate: string; // ISO string format for timestamp without time zone
  numNights: number; // smallint
  numGuests: number; // smallint
  cabinPrice: number; // smallint
  extrasPrice: number; // smallint
  totalPrice: number; // smallint
  status: string; // text
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string; // text
  cabinId: bigint;
  guestId: bigint;
  cabins: {
    maxCapacity: any;
  };
}
