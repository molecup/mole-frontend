import NavBar from '@/components/navBar';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Container from '@mui/system/Container';


//const inter = Inter({ subsets: ['latin'] })

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
      <ThemeRegistry>
        <NavBar>
          <Container sx={{padding : {xs : 0, md : 1}}}>
            {children}
          </Container>
        </NavBar>
      </ThemeRegistry>
      </body>
    </html>
  )
}
