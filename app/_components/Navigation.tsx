import Link from 'next/link';
import { auth } from '../_lib/auth';
import Image from 'next/image';

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link href="/cabins" className="transition-colors hover:text-accent-400">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="transition-colors hover:text-accent-400">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link href="/account">
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={session.user.image}
                  className="h-8 w-8 rounded-full"
                  width={8}
                  height={8}
                  alt="user profile image"
                ></Image>
                <span>{session.user.name}</span>
              </div>
            </Link>
          ) : (
            <Link href="/account" className="transition-colors hover:text-accent-400">
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
