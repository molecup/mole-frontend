import NavBar from '@/components/navBar';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mole cup - official site',
  description: 'Sito ufficiale della Mole Cup',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
