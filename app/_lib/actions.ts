'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateGuestProfileAction(formData: any) {
  const session = (await auth()) as any;
  if (!session) {
    throw new Error('Not authenticated');
  }
  const nationalId = formData.get('nationalId');
  const [nationality, countryFlag] = formData.get('nationality').split('%');
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error('Please provide a valid national ID');

  const updateData = { nationality, countryFlag, nationalId };
  const { data, error } = await supabase
    .from('guest')
    .update(updateData)
    .eq('id', session!.user!.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function deleteReservationAction(bookingId: string) {
  const session = (await auth()) as any;
  if (!session) {
    throw new Error('Not authenticated');
  }
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error('You are not allowed to delete this booking');
  const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');
  revalidatePath('/account/reservations');
  return data;
}
