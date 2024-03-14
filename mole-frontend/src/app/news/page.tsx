import { RelatedArticlesGrid, getAllArticles } from "@/components/relatedArticles";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import HeroHeader from "@/components/heroHeader";
import type { Metadata } from 'next'

import headerImg from "@/public/static/DSC_0666-3.webp";
import { commonOpenGraph } from "../layout";


export const metadata: Metadata = {
  alternates: {
    canonical: `/news`,
  },
  title: 'Notizie',
  description: 'Tutte le notizie e gli articoli della Mole Cup Reale Mutua',
  openGraph: {
    title: 'Notizie - Mole Cup Reale Mutua',
    url: 'https://molecup.com/news',
    description: 'Tutte le notizie e gli articoli della Mole Cup Reale Mutua',
    ...commonOpenGraph,
    type: 'website',
  },
}

export default async function News(){
    const news = await getAllArticles();
    return(
        <>
        <HeroHeader src={headerImg} blur>
            <Typography variant="h1" color="white" textTransform="uppercase">Notizie</Typography>
        </HeroHeader>
        
        <Container sx={{display:"flex", flexDirection:"column", minHeight:"40vh"}}>
            <RelatedArticlesGrid articles={news} xs={12} sm={6} md={4} lg={3}/>
        </Container>
        </>
    )
}