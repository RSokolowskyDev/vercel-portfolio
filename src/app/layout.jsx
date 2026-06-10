import { Roboto, Orbitron } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import ThemedDotsGrid from '@/components/DotsGrid/ThemedDotsGrid';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const orbitron = Orbitron({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

export default function RootLayout({children}) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body className={`${roboto.className} bg-zinc-100 dark:bg-zinc-900`}>
        <div className="fixed inset-0 z-0">
          <ThemedDotsGrid opacity={1} dotSize="0.8vw" />
        </div>
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-12 py-4">
          <div className="flex items-center gap-3">
            <Navbar />
            <ThemeSwitcher />
          </div>
        </header>
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
