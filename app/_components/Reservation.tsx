import { getBookedDatesByCabinId, getSetting } from '../_lib/data-service';
import { Cabin } from '../_types';
import { DateSelector } from './DateSelector';
import { ReservationForm } from './ReservationForm';

export const Reservation = async ({ cabin }: { cabin: Cabin }) => {
  const [setting, bookedDates] = await Promise.all([
    getSetting(),
    getBookedDatesByCabinId(cabin.id.toString()),
  ]);
  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector setting={setting} bookedDates={bookedDates} cabin={cabin}></DateSelector>
      <ReservationForm cabin={cabin}></ReservationForm>
    </div>
  );
};
