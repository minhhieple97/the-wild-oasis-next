import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import '@/app/_styles/global.css';
import Logo from './_components/Logo';
import Navigation from './_components/Navigation';
import Header from './_components/Header';
import { ReservationProvider } from './_context/reservation/ReservationContext';

const josefin = Josefin_Sans({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100`}
      >
        <Header></Header>
        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
