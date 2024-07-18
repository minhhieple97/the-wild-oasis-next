import { Cabin } from '@/app/_components/Cabin';
import { DateSelector } from '@/app/_components/DateSelector';
import { Reservation } from '@/app/_components/Reservation';
import { ReservationForm } from '@/app/_components/ReservationForm';
import Spinner from '@/app/_components/Spinner';
import { TextExpander } from '@/app/_components/TextExpander';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Suspense } from 'react';
export async function generateMetadata({ params }: { params: { cabinId: string } }) {
  const cabin = await getCabin(params.cabinId);
  const { name } = cabin;
  return {
    title: `Cabin ${name}`,
  };
}
export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}
export default async function Page({ params }: { params: { cabinId: string } }) {
  const cabin = await getCabin(params.cabinId);
  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin}></Cabin>
      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-200">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner></Spinner>}>
          <Reservation cabin={cabin}></Reservation>
        </Suspense>
      </div>
    </div>
  );
}
