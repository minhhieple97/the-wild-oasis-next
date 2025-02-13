import { Suspense } from 'react';
import { CabinCard } from '../_components/CabinCard';
import { CabinList } from '../_components/CabinList';
import { getCabins } from '../_lib/data-service';
import Spinner from '../_components/Spinner';
import { CapacityEnum, SearchParams } from '../_types';
import { Filter } from '../_components/Filter';
import { ReservationReminder } from '../_components/ReservationReminder';
export const metadata = {
  title: 'Cabins',
};
export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const filter = searchParams?.capacity ?? CapacityEnum.ALL;
  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">Our Luxury Cabins</h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine
        waking up to beautiful mountain views, spending your days exploring the dark forests around,
        or just relaxing in your private hot tub under the stars. Enjoy nature&apos;s beauty in your
        own little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to
        paradise.
      </p>
      <div className="mb-8 flex justify-end">
        <Filter></Filter>
      </div>
      <Suspense fallback={<Spinner></Spinner>} key={filter.toString()}>
        <CabinList capacity={filter as CapacityEnum}></CabinList>
        <ReservationReminder></ReservationReminder>
      </Suspense>
    </div>
  );
}
