'use client';
import React from 'react';
import { CapacityEnum } from '../_types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const Filter = () => {
  const buttonArrayInfo: { title: string; value: CapacityEnum }[] = [
    { title: 'All cabins', value: CapacityEnum.ALL },
    { title: '1--3guest', value: CapacityEnum.SMALL },
    { title: '4--7guest', value: CapacityEnum.MEDIUM },
    { title: '8--12guest', value: CapacityEnum.LARGE },
  ];
  const searchParams = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();
  const currentFilter = searchParams.get('capacity') ?? CapacityEnum.ALL;
  const handleFilter = (value: CapacityEnum) => {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', value);
    route.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex border border-primary-800">
      {buttonArrayInfo.map((info) => (
        <button
          key={info.title}
          className={`border-primary-800 px-5 py-2 hover:bg-primary-900 ${
            info.value === currentFilter ? 'bg-primary-900' : ''
          }`}
          onClick={() => handleFilter(info.value)}
        >
          {info.title}
        </button>
      ))}
    </div>
  );
};
