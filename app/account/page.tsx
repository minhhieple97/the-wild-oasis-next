import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Account',
};

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <span className="text-2xl font-semibold text-accent-400">
        Wellcome, {session?.user?.name}
      </span>
    </div>
  );
}
