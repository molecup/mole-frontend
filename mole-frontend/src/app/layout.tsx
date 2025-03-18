import NavBar from '@/components/navBar';
import type { Metadata, ResolvingMetadata } from 'next'
//import { Inter } from 'next/font/google'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Box from '@mui/system/Box';
import Footer from '@/components/footer';
import CookiesSnackbar from '@/components/cookiesSnackbar';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import publicFetch from '@/lib/publicFetch';


//const inter = Inter({ subsets: ['latin'] })

export const commonKeyWords = ["LCS", "lcs", "Torino", "torneo", "calcio", "liceo"]

export const commonOpenGraph = {
  siteName: 'LCS',
  locale: 'it_IT',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "https://lcs.com"),
  alternates: {
    canonical: '/',
  },
  title: {
    template: "%s - Lega Calcio Studenti",
    default: "Lega Calcio Studenti",
  },
  creator: 'Marco Magnanini',
  publisher: "European Students league s.r.l.",
  applicationName: 'Lega Calcio Studenti',
  description: 'Sito ufficiale della Lega Calcio Studenti',
  keywords: commonKeyWords,
  openGraph: {
    title: 'Lega Calcio Studenti',
    url: process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : "https://lcs.com",
    description: 'Sito ufficiale della Lega Calcio Studenti',
    ...commonOpenGraph,
    type: 'website',
  },
}



async function getTournamentList(){
  const path = `/api/tournaments?populate[logo]=1&filters[main_edition][$notNull]=null`;
  const res  = await publicFetch(path);

  return res.data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tournamentList = await getTournamentList();
  return (
    <html lang="it">
      <body>
      <ThemeRegistry>
        <NavBar tournamentList = {tournamentList}>
          <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '130vh',}}>
            <Box sx={{padding : 0}}>
              {children}
              <SpeedInsights/>
              <Analytics />
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
