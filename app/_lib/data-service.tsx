import { eachDayOfInterval } from 'date-fns';
import { supabase } from './supabase';
import { Booking, Cabin, Guest, Setting } from '../_types';
import { notFound } from 'next/navigation';

/////////////
// GET

export async function getCabin(id: string): Promise<Cabin> {
  const { data, error } = await supabase.from('cabins').select('*').eq('id', id).single();

  // For testing
  await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data as Cabin;
}

export async function getCabinPrice(id: string) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image, description')
    .order('name');
  await new Promise((res, rej) => setTimeout(res, 1000));
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data as Cabin[];
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest> {
  const { data } = await supabase.from('guest').select('*').eq('email', email).single();
  return data;
}

export async function getBooking(id: string): Promise<Booking> {
  const { data, error, count } = await supabase
    .from('bookings')
    .select(
      'id,created_at,startDate,endDate,numNights,numGuests,cabinPrice,extrasPrice,totalPrice,status,hasBreakfast,isPaid,observations,cabinId,guestId,cabins(maxCapacity)',
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    // throw new Error('Booking could not get loaded');
    notFound();
  }

  return data as any;
}

export async function getBookings(guestId: string): Promise<Booking[]> {
  const { data, error, count } = await supabase
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id,created_at,startDate,endDate,numNights,numGuests,cabinPrice,extrasPrice,totalPrice,status,hasBreakfast,isPaid,observations,cabinId,guestId,cabins(maxCapacity,image)',
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data as any;
}

export async function getBookedDatesByCabinId(cabinId: string) {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSetting(): Promise<Setting> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data as Setting;
}

export async function getCountries() {
  try {
    const res = await fetch('https://restcountries.com/v2/all?fields=name,flag');
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: any) {
  const { data, error } = await supabase.from('guest').insert([newGuest]);
  if (error) {
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking: any) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: string, updatedFields: any) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(id: string, updatedFields: any) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: string) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
