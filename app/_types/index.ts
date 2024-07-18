export interface Cabin {
  id: string; // Assuming ID could be a string or number
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string; // Assuming image is a string URL or path
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
