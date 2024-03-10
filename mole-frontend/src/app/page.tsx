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
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import Button from '@mui/material/Button';
import Link from 'next/link';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Quote from '@/components/quote';
import { Metadata } from 'next';
import Image from "next/image";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot, { TimelineDotProps } from '@mui/lab/TimelineDot';

import img1 from "@/public/static/DSCF6614-Migliorato-NR.webp";
import img2 from "@/public/static/DSCF6576-Migliorato-NR.webp";


export const metadata: Metadata = {
    description: "Mole Cup Reale mutua è un torneo di calcio nato nel 2017 con l'obbiettivo di creare un evento innovativo e coinvolgente tra le scuole superiori di Torino"
}

export default function Home(){
    return(
        <>
            <HeroHeader src="/static/DSC_0666-3.webp" sx={{height: "70vh"}}>
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h1" color="white" textTransform="uppercase">{"Mole cup"}</Typography>
                    <Typography variant="h3" color="primary.main" fontWeight={700} textTransform="capitalize">{"Reale mutua"}</Typography>
                    <Typography variant="h6" color="secondary.contrastText" sx={{pt: "20px", textAlign:"center"}}>{"Dai banchi di scuola ai campi da calcio: il teatro del torneo più atteso dagli studenti"}</Typography>
                    <Button variant="contained" LinkComponent={Link} href="/molecup" sx={{padding: "10px 20px 10px 20px", mt: "20px"}}>Vai al torneo</Button>
                </Stack>
            </HeroHeader>
            <TwoSpanBlogSection src={img1} sx={{height: {xs:"400px", sm:"300px", md:"300px"}}}>
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

            <HowDoesItWork />

            <ValuesSection />
            
            <FeaturesSection/>

            <PromoterSection />
        </>
    );
}

function HowDoesItWork(){
    const phases : {color: TimelineDotProps["color"], title:string, description:string, Icon:any}[] = [
        {
            title: "Fase a gironi",
            description: "Le squadre si affrontano in tre gironi da quattro squadre",
            Icon: SportsSoccerRoundedIcon,
            color: "secondary",
        },
        {
            title: "Eliminazione diretta",
            description: "Le prime due squadre di ogni girone e le due migliori terze procedono alla fase ad eliminazione diretta",
            Icon: EmojiEventsRoundedIcon,
            color: "primary",
        },
        {
            title: "Rappresentativa Mole Cup vs pro clubs",
            description: "Stay tuned",
            Icon: StarRoundedIcon,
            color: "warning",
        },
    ];

    return(
        <Box component="section">
            <Container sx={{textAlign: "center", mt:5, mb:10}}>
                <Typography variant="h2" color="primary.main" fontWeight={500}>Come funziona</Typography>
                <Timeline position="alternate-reverse" >
                    {phases.map((phase, idx) => 
                        <TimelineItem key={idx}>
                            <TimelineSeparator>
                            <TimelineDot color={phase.color}>
                                <phase.Icon/>
                            </TimelineDot>
                            {idx < phases.length-1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" textTransform="uppercase">{phase.title}</Typography>
                                <Typography variant="body2">{phase.description}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    )}
                </Timeline>
                <Box sx={{mt:5, mb:5}}>
                    <Typography variant="h6" textTransform="uppercase" color="primary">Halftime challenges</Typography>
                    <Stack>
                        <Typography variant="body2">{"Ogni partita offre una sfida diversa durante l'intervallo"}</Typography>
                        <Typography variant="body2">I tifosi possono partecipare per vincere premi individuali e collettivi</Typography>
                    </Stack>
                </Box>
                <Button variant="contained" LinkComponent={Link} href="/molecup">Vai al torneo</Button>
            </Container>
        </Box>
    );
}

function ValuesSection(){
    const values = [
        {
            title: "Alternanza scuola lavoro",
            description: 
                <Typography variant="body2">
                    Offriamo progetti di alternanza scuola lavoro (riprese e montaggio, giornalismo, sicurezza)
                </Typography>
        },
        {
            title: "Cause benefiche",
            description: 
                <Typography variant="body2">
                    Sosteniamo cause benefiche come <b> ONG Interos </b>, <b>Just the woman I am</b>, <b>Onlus</b>, <b>African Impact</b>, <b>FFF</b>
                </Typography>
        },
        {
            title: "Donazioni",
            description: 
                <Typography variant="body2">
                    Abbiamo donato oltre 3000&euro; per l&apos;emergenza Covid e oltre 500&euro; all&apos;associazione <b>Genova nel cuore</b>
                </Typography>
        },
    ]
    return(
        <TwoSpanBlogSection variant="contentLeft" src={img2} sx={{height: {xs:"600px", sm:"450px", md:"450px"}}}>
            <Typography variant="h2" color="primary.main" fontWeight={500}>I nostri valori</Typography>
            <Quote>{"Lo sport nei giovani può avere un impatto sulla formazione del futuro"}</Quote>
            <Stack spacing={3} sx={{pt: 5}}>
                {values.map((item, idx) => 
                    <Box component="span" key={idx}>
                    <Typography variant="h6" textTransform="uppercase" color="primary">{item.title}</Typography>
                    {item.description}
                </Box>
                )}
            </Stack>
        </TwoSpanBlogSection>
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
                                        <Avatar  alt={promoter.name} sx={{ width: 70, height: 70 }}>
                                            <Image src={promoter.img} alt={promoter.name} fill style={{objectFit: "cover", objectPosition:"center"}} sizes='150px' />
                                        </Avatar>
                                        <Typography variant="h4" color="text.primary" textTransform="uppercase">{promoter.name}</Typography>
                                        <Typography variant="caption" textTransform="uppercase" color="primary.main">{promoter.description}</Typography>
                                        <Quote>{promoter.quote}</Quote>
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
