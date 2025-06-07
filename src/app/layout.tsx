import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner';
import './globals.css'
import Header from '@/components/Header';
import Head from 'next/head';



export const metadata: Metadata = {
  title: 'Nexo Notes',
  description: 'An ai powered notes app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange

        >
          <div className='min-h-screen flex flex-col'><Header />
            <main className='flex flex-1 px-4 pt-10 flex-col xl:px-8'> {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
