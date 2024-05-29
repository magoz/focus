import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BgImage } from '@/app/_bg/bg-image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Focus',
  description: 'Focus on what matters'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} relative`} suppressHydrationWarning>
          <BgImage />
          <main className="relative">{children}</main>
          <div className="fixed bottom-0 left-0 z-20 ">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
