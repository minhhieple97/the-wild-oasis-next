import { getCabins } from '../_lib/data-service';
import { CapacityEnum } from '../_types';
import { CabinCard } from './CabinCard';
interface CabinListProps {
  capacity: CapacityEnum;
}
export const CabinList = async ({ capacity }: CabinListProps) => {
  const cabins = await getCabins();
  if (cabins.length === 0) return null;
  let displayCabins;
  switch (capacity) {
    case CapacityEnum.LARGE: {
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity > 4);
      break;
    }
    case CapacityEnum.ALL: {
      displayCabins = cabins;
      break;
    }
    case CapacityEnum.MEDIUM: {
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity > 2 && cabin.maxCapacity <= 4);
      break;
    }
    case CapacityEnum.SMALL: {
      displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 1 && cabin.maxCapacity <= 2);
      break;
    }
  }
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
        {displayCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </>
  );
};
