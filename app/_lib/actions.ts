'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateGuestProfileAction(formData) {
  const session = (await auth()) as any;
  if (!session) {
    throw new Error('Not authenticated');
  }
  const nationalId = formData.get('nationalId');
  const [nationality, countryFlag] = formData.get('nationality').split('%');
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error('Please provide a valid national ID');

  const updateData = { nationality, countryFlag, nationalId };
  console.log({ session, updateData });
  const { data, error } = await supabase
    .from('guest')
    .update(updateData)
    .eq('id', session!.user!.guestId);

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}
