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
import Paper from '@mui/material/Paper';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import Button from '@mui/material/Button';
import Link from 'next/link';


export default function Home(){
    return(
        <>
            <HeroHeader src="/DSC_0666-3.jpg" sx={{height: "70vh"}}>
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h1" color="white" textTransform="uppercase">{"Mole cup"}</Typography>
                    <Typography variant="h3" color="primary.main" fontWeight={700} textTransform="capitalize">{"Reale mutua"}</Typography>
                    <Typography variant="h6" color="secondary.contrastText" sx={{pt: "20px", textAlign:"center"}}>{"Dai banchi di scuola ai campi da calcio: il teatro del torneo più atteso dagli studenti"}</Typography>
                    <Button variant="contained" LinkComponent={Link} href="/molecup" sx={{padding: "10px 20px 10px 20px", mt: "20px"}}>Vai al torneo</Button>
                </Stack>
            </HeroHeader>
            <TwoSpanBlogSection src="/static/DSCF6614-Migliorato-NR.jpg" sx={{height: {xs:"400px", sm:"300px", md:"300px"}}}>
                <Typography variant="h2" color="primary.main" fontWeight={500}>{"Chi siamo"}</Typography>
                <Stack direction="row">
                    <ChangeHistoryRoundedIcon sx={{transform: "rotate(90deg)", color: "primary.main"}}/>
                    <Typography variant="body1">{"Mole Cup è un'associazione nata nel 2017 con l'obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di Torino"}</Typography>
                </Stack>
                <Stack direction="row">
                    <ChangeHistoryRoundedIcon sx={{transform: "rotate(90deg)", color: "primary.main"}}/>
                    <Typography variant="body1">{"Dal 2025 la Molecup si espanderà in tutta Italia, con l'obbiettivo di creare un campionato nazionale che abbia un torneo in ogni grande città italiana, a partire da Torino, Firenze e Milano"}</Typography>
                </Stack>
            </TwoSpanBlogSection>
            
            <FeaturesSection/>

            <PromoterSection />
        </>
    );
}

function PromoterSection(){
    const promoters = [
        {
            img: "/static/giancarlo-antognoni.jpg",
            name: "Giancarlo Antognoni",
            description: "Dirigente sportivo, ex calciatore",
            quote: "L'iniziativa ripercorre i veri valori dello sport in cui credo e in cui mi riconosco. \
                Il torneo si svolge in maniera spontanea e genuina con l'impegno e la dedizione degli organizzatori.",
        },
        {
            img: "/static/ciro-ferrara.jpg",
            name: "Ciro Ferrara",
            description: "Allenatore, ex calciatore",
            quote: "Grazie ad un torneo simile io ho dato inizio alla mia carriera",
        },
    ]
    return(
        <Box component="section">
                <Container sx={{textAlign: "center", mt:5, mb:10}}>
                    <Grid container spacing={3}>
                        <Grid xs={12}>
                            <Typography variant="h2" color="primary.main" fontWeight={500}>{"Dicono di noi"}</Typography>
                        </Grid>
                        {promoters.map((promoter, idx) => 
                            <Grid xs={12} md={6} key={idx}>
                                <Box sx = {{padding: "10px"}}>
                                    <Stack direction="column" spacing={2} alignItems="center">
                                        <Avatar src={promoter.img} alt={promoter.name} sx={{ width: 70, height: 70 }}/>
                                        <Typography variant="h4" color="text.primary" textTransform="uppercase">{promoter.name}</Typography>
                                        <Typography variant="caption" textTransform="uppercase" color="primary.main">{promoter.description}</Typography>
                                        <Stack direction="row" spacing={2}>
                                            <FormatQuoteRoundedIcon sx={{color: "text.secondary", display:"inline-block"}}/>
                                            <Typography variant="body1" color="text.secondary" sx={{display:"inline-block"}}>{promoter.quote}</Typography>
                                            <FormatQuoteRoundedIcon sx={{color: "text.secondary", display:"inline-block"}}/>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Grid>
                        )}
                        
                    </Grid>
                </Container>
            </Box>
    );
}

function FeaturesSection(){
    const features = [
        {
            Icon :  WhereToVoteRoundedIcon,
            title: "Unico",
            text: "Siamo il primo torneo in Italia specificamente rivolto alle scuole superiori"
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
