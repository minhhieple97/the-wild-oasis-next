import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

export async function GET(_: any, { params }: any) {
  const { cabinId } = params;
  try {
    const [cabin, bookeDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookeDates }, { status: 200 });
  } catch (err) {
    return Response.json({ error: 'Could not load data' }, { status: 400 });
  }
}
