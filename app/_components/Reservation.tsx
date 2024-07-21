import { getBookedDatesByCabinId, getSetting } from '../_lib/data-service';
import { Cabin } from '../_types';
import { DateSelector } from './DateSelector';
import { LoginMessage } from './LoginMessage';
import { ReservationForm } from './ReservationForm';
import { auth } from '@/app/_lib/auth';
export const Reservation = async ({ cabin }: { cabin: Cabin }) => {
  const [setting, bookedDates, session] = await Promise.all([
    getSetting(),
    getBookedDatesByCabinId(cabin.id.toString()),
    auth(),
  ]);
  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector setting={setting} bookedDates={bookedDates} cabin={cabin}></DateSelector>
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={{
            name: session.user.name,
            image: session.user.image,
          }}
        ></ReservationForm>
      ) : (
        <LoginMessage></LoginMessage>
      )}
    </div>
  );
};
