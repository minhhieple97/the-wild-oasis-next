import { updateReservation } from '@/app/_lib/actions';
import { getBooking } from '@/app/_lib/data-service';
import { useFormState } from 'react-dom';
import { UpdateReservationForm } from './_components/UpdateReservationForm';

export default async function Page({ params }: { params: { reservationId: string } }) {
  const reservationId = params.reservationId;
  const booking = await getBooking(reservationId);
  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{reservationId}
      </h2>
      <UpdateReservationForm {...booking}></UpdateReservationForm>
    </div>
  );
}
