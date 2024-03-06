import HeroHeader from '@/components/heroHeader';
import TwoSpanBlogSection from '@/components/twoSpanBlogSection';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import ForestRoundedIcon from '@mui/icons-material/ForestRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';


export default function Home(){
    return(
        <>
            <HeroHeader src="/DSC_0666-3.jpg">
                <Typography variant="h1" color="white" textTransform="uppercase">{"Mole cup"}</Typography>
                <Typography variant="h3" color="primary.main" textTransform="capitalize">{"Reale mutua"}</Typography>
            </HeroHeader>
            <TwoSpanBlogSection src="/DSC_0666-3.jpg" sx={{height: {xs:"400px", sm:"300px", md:"300px"}}}>
                <Typography variant="h2" color="primary.main" fontWeight={500}>{"Chi siamo"}</Typography>
                <Typography variant="body1">{"Mole Cup è un'associazione nata nel 2017 con l'obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di Torino"}</Typography>
                <Typography variant="body1">{"Dal 2025 la Molecup si espanderà in tutta Italia, con l'obbiettivo di creare un campionato nazionale che abbia un torneo in ogni grande città italiana, a partire da Torino, Firenze e Milano"}</Typography>
            </TwoSpanBlogSection>
            
            <FeaturesSection/>
        </>
    );
}

function FeaturesSection(){
    const features = [
        {
            Icon :  WhereToVoteRoundedIcon,
            title: "Unico",
            text: "Un format unico e coinvolgente, costruito appositamente per attirare un vasto pubblico all'interno delle scuole, indipendentemente dai loro meriti sportivi"
        },
        {
            Icon :  Diversity1RoundedIcon,
            title: "Inclusivo",
            text: "Rivolto a tutti gli studenti, indipendentemente dal sesso o dall'età"
        },
        {
            Icon :  ForestRoundedIcon,
            title: "Ecologico",
            text: "Tutti i prodotti e le pratiche sono al 100% verdi ed ecologici"
        },
        {
            Icon :  AccountBalanceRoundedIcon,
            title: "Storico",
            text: "5 anni di esperienza nel settore con una fanbase già corposa"
        }
    ];

    return(
        <Box 
            component="section"
            sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#fff5f8'}}
        >
            <Container sx={{ mt: 5, mb: 10, display: 'flex', position: 'relative'}}>
                <Box
                    component="img"
                    src="/productCurvyLines.png"
                    alt="curvy lines"
                    sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
                />
                <Grid container sx={{textAlign:"center"}} spacing={3}>
                    <Grid xs={12}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h2" color="primary.main" fontWeight={500}>{"L'Evento"}</Typography>
                            <Typography variant="body1">{"Un format unico e coinvolgente, costruito appositamente per attirare un vasto pubblico all'interno delle scuole, indipendentemente dai loro meriti sportivi"}</Typography>
                        </Stack>
                    </Grid>
                    {features.map((featureItem, idx) => 
                        <Grid xs={12} md={6} lg={3} key={idx}>
                            <Stack direction="column" alignItems="center" spacing={2}>
                                <featureItem.Icon fontSize="large"/>
                                <Typography variant="h6" color="text.primary" textTransform="uppercase">{featureItem.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{featureItem.text}</Typography>
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    )
}
