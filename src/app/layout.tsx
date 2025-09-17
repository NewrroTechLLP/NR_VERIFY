// src/app/layout.tsx

import type { Metadata } from 'next'
import { Poppins, Great_Vibes } from 'next/font/google'
import { ThemeProvider } from './theme-provider'
import { ThemeSwitcher } from './ThemeSwitcher'
import './globals.css'

// Font configuration remains the same
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
})

export const metadata: Metadata = {
  title: 'Verification | Newrro Tech LLP',
  description: 'Employee and Intern Verification Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${greatVibes.variable}`}>
        {/* The only change is defaultTheme="light" below */}
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
