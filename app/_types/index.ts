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
