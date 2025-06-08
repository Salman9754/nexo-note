import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner';
import './globals.css'
import Header from '@/components/Header';
import { UserProvider } from '@/context/UserContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';



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
          <UserProvider>
            <SidebarProvider>
              <AppSidebar />

              <div className='min-h-screen w-full flex flex-col'><Header />
                <main className='flex flex-1 px-4 pt-10 flex-col xl:px-8'>
                  {children}

                </main>
              </div>
            </SidebarProvider>
          </UserProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
