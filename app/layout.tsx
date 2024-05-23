import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BackgroundImage } from '@/components/ui/background-image'

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <BackgroundImage />

        {children}
      </body>
    </html>
  )
}
