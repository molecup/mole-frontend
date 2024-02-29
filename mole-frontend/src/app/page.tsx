import HeroHeader from '@/components/heroHeader';
import TwoSpanBlogSection from '@/components/twoSpanBlogSection';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';


export default function Home(){
    return(
        <>
            <HeroHeader src="/DSC_0666-3.jpg">
                <Typography variant="h1" color="white" textTransform="uppercase">Mole cup</Typography>
                <Typography variant="h3" color="primary.main" textTransform="capitalize">Reale mutua</Typography>
            </HeroHeader>
            <TwoSpanBlogSection src="/DSC_0666-3.jpg" sx={{height: "250px"}}>
                <Typography variant="h2" color="primary.main" fontWeight={500}>Chi siamo</Typography>
                <Typography variant="body1">Mole Cup è un'associazione nata nel 2017 con l'obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di Torino</Typography>
            </TwoSpanBlogSection>
            <TwoSpanBlogSection src="/DSC_0666-3.jpg" variant="contentLeft">
                <Typography variant="h2" color="primary.main" fontWeight={500}>Chi siamo</Typography>
                <Typography variant="body1">Mole Cup è un'associazione nata nel 2017 con l'obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di Torino</Typography>
            </TwoSpanBlogSection>
                
        </>
    );
}

