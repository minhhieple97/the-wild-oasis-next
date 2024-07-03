import Spinner from '@/app/_components/Spinner';

const Loading = async () => {
  return (
    <div className="grid items-center justify-center">
      <Spinner></Spinner>
      <p className="text-xl text-primary-200">Loading cabins data...</p>
    </div>
  );
};

export default Loading;
