import NavBar from '@/components/navBar';
import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Box from '@mui/system/Box';
import Footer from '@/components/footer';
import CookiesSnackbar from '@/components/cookiesSnackbar';
import { SpeedInsights } from '@vercel/speed-insights/next';


//const inter = Inter({ subsets: ['latin'] })

export const commonKeyWords = ["Mole Cup", "molecup", "Torino", "torneo", "calcio", "liceo"]

export const commonOpenGraph = {
  siteName: 'Mole Cup',
  locale: 'it_IT',
}

export const metadata: Metadata = {
  title: {
    template: "%s - Mole cup Reale Mutua",
    default: "Mole cup Reale Mutua"
  },
  creator: 'Marco Magnanini',
  publisher: "European Students league",
  applicationName: 'Mole Cup Reale Mutua',
  description: 'Sito ufficiale della Mole Cup Reale mutua',
  keywords: commonKeyWords,
  openGraph: {
    title: 'Mole Cup Reale Mutua',
    url: 'https://molecup.com',
    description: 'Sito ufficiale della Mole Cup Reale mutua',
    ...commonOpenGraph,
    type: 'website',
  },
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
              <SpeedInsights/>
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
