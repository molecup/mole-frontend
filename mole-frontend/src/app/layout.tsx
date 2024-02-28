import NavBar from '@/components/navBar';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Box from '@mui/system/Box';
import Footer from '@/components/footer';
import CookiesSnackbar from '@/components/cookiesSnackbar';


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
          <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '130vh',}}>
            <Box sx={{padding : 0}}>
              {children}
            </Box>
            <Footer/>
          </Box>
          
        </NavBar>
        <CookiesSnackbar/>
      </ThemeRegistry>
      </body>
    </html>
  )
}
