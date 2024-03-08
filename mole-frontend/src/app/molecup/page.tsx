import publicFetch from '@/lib/publicFetch';
import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/matchCard';
import TeamCard from '@/components/teamCard';
import Typography from '@mui/material/Typography';
import StandingTable from '@/components/standingTable';
import Container from '@mui/material/Container';
import HeroHeader from '@/components/heroHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { teamRankInterface } from '@/lib/commonInterfaces';
import dateTimeText from '@/lib/dateTimeText';
import RelatedArticles, { RelatedArticlesGrid, getRelatedArticles } from '@/components/relatedArticles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import type { Metadata } from 'next'

/*
import matchImg from "@/components/static_media/match_placeholder.jpg";
import alfieriImg from '@/components/static_media/alfieri.png';
import gobettiImg from '@/components/static_media/gobetti.png';
import gobetti22Img from '@/components/static_media/gobetti2022.png';
import cattaneoImg from '@/components/static_media/cattaneo.png';
import avogadroImg from '@/components/static_media/avogadro.png';
import cavourImg from '@/components/static_media/cavour.png';
import convittoImg from '@/components/static_media/convitto.jpeg';
import dazeImg from '@/components/static_media/dazeglio.png';
import majoImg from '@/components/static_media/majo.png';
*/

//hard-coded dev data
/*
const teams = [
  { id: "alf", name: "Alfieri", short: "Alf", img: alfieriImg },
  { id: "gob", name: "Gobetti", short: "Gob", img: gobettiImg },
  { id: "cat", name: "Cattaneo", short: "Cat", img: cattaneoImg },
  { id: "gob22", name: "Gobetti", short: "Gob", img: gobetti22Img },
  { id: "avo", name: "Avogadro", short: "Avo", img: avogadroImg },
  { id: "cav", name: "Cavour", short: "Cav", img: cavourImg },
  { id: "conv", name: "Covitto", short: "Con", img: convittoImg },
  { id: "daze", name: "Dazeglio", short: "Daz", img: dazeImg },
  { id: "majo", name: "Majorana", short: "Maj", img: majoImg },
];

const matches = [
  { id: "1", teamA: teams[0], teamB: teams[1], score: [0, 1], description: "Questo è un esempio di partita. Bal bla bla bla", date: "20/10", time: "21:30", league: "Girone A", img: matchImg, initial: false },
  { id: "2", teamA: teams[2], teamB: teams[5], score: [2, 1], description: "Questo è un esempio di partita. Bal bla bla bla", date: "20/10", time: "20:00", league: "Girone C", img: matchImg, initial: false },
  { id: "3", teamA: teams[4], teamB: teams[3], score: [0, 0], description: "Questo è un esempio di partita. Bal bla bla bla", date: "27/10", time: "21:30", league: "Girone B", img: matchImg, initial: false },
  { id: "4", teamA: teams[7], teamB: teams[0], score: null, description: "Questo è un esempio di partita. Prima partita  ", date: "27/10", time: "20:00", league: "Girone A", img: matchImg, initial: true },
  { id: "5", teamA: teams[0], teamB: teams[1], score: null, description: "Questo è un esempio di partita. Bal bla bla bla", date: "02/11", time: "21:30", league: "Girone B", img: matchImg, initial: false },
  { id: "6", teamA: teams[5], teamB: teams[6], score: null, description: "Questo è un esempio di partita. Bal bla bla bla", date: "02/11", time: "20:00", league: "Girone D", img: matchImg, initial: false },
  { id: "7", teamA: teams[6], teamB: teams[2], score: null, description: "Questo è un esempio di partita. Bal bla bla bla", date: "09/11", time: "21:30", league: "Girone C", img: matchImg, initial: false },

];
*/

export const metadata: Metadata = {
  title: 'Mole cup Reale Mutua - Il torneo',
  description: 'Le ultime novità della Mole Cup Reale Mutua',
}

const marginBottom = {
  marginBottom: "20px",
}

async function getStandingTables(){
  const path = "/api/league-standings/tournament/mole-cup";
  const res  = await publicFetch(path);
  return res.data;
}

async function getMatches(){
  const path = "/api/matches-report/tournament/mole-cup";
  const res  = await publicFetch(path);
  return res.data;
}

async function getTournamentInfo(){
  const SLUG = "mole-cup";
  const path = `/api/tournaments?filter[slug]=${SLUG}&populate[teams][populate]=logo&populate[article_tags]=1&fields[0]=name&fields[1]=year`;
  const res  = await publicFetch(path);
  if(!Array.isArray(res.data) || res.data.length===0){
    throw new Error("Pagina non trovata!");
  }
  return res.data[0];
}

export default async function MoleCup() {
  const [tournamentInfo, standingTables, matches] =  await Promise.all([getTournamentInfo(), getStandingTables(), getMatches()]);
  const tournament = tournamentInfo.attributes;
  const news = await getRelatedArticles(tournament.article_tags.data);
  const teams = tournament.teams.data;
  const firstTeam = Math.round(teams.length / 2) - 2;
  const layoutProps = {
    teams: teams,
    firstTeam: firstTeam,
    matches: matches,
    standingTables: standingTables,
    news: news
  }
  return (
    <>
      <HeroHeader src="/DSC_0666-3.jpg" sx={{height: "300px"}}>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h1" color="white" textTransform="uppercase">{tournament.name}</Typography>
          <Typography variant="h3" color="primary.main" fontWeight={700} textTransform="capitalize">{"Reale mutua"}</Typography>
        </Stack>
      </HeroHeader>

      <SmallLayout
        sx={{display: { xs: 'block', md: 'none' }}}
        {...layoutProps}
      />

      <BigLayout
        sx={{display: { xs: 'none', md: 'block' }}}
        {...layoutProps}
      />
    </>
  )
}

interface layoutInterface{
  teams: any, 
  firstTeam: number, 
  matches: any, 
  standingTables: any, 
  news: any,
  sx: any
}

function SmallLayout({teams, firstTeam, matches, standingTables, news, sx}: layoutInterface){
  return(
    <Box sx={sx}>
      <TeamSection teams={teams} firstTeam={firstTeam} />
        <Typography variant='h2' align='center' gutterBottom>Le partite</Typography>
        <MatchSliderSection 
          matches={matches}
        />

        
        {Array.isArray(news) && news.length > 0 && 
        <>
          <Typography variant="h2" align="center" gutterBottom>Notizie</Typography> 
          <RelatedArticles articles={news} sx={marginBottom} /> 
        </>
        }

        <Typography variant="h2" align="center" gutterBottom>Il torneo</Typography>
        <StandingTableSection standingTables={standingTables}/>
    </Box>
  );
}

function BigLayout({teams, firstTeam, matches, standingTables, news, sx}: layoutInterface){
  return(
    <Box sx={sx}>
      <Container>
        <TeamSection teams={teams} firstTeam={firstTeam} />

        <Grid container spacing={1}>
            <Grid md={8} sx={{marginTop: "20px"}}>
              <Paper>
                <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                    <Typography variant='h5'>Le partite</Typography>
                </Toolbar>
                <MatchSliderSection matches={matches} />
              </Paper>

              <Paper>
                <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                    <Typography variant='h5'>Ultime notizie</Typography>
                </Toolbar>
                <RelatedArticlesGrid articles = {news}/>
              </Paper>        
            </Grid>
            <Grid md={4}>
              <StandingTableSection standingTables={standingTables}/>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function TeamSection({teams, firstTeam} : {teams: any, firstTeam: number}){
  return(
    <CardSlider sx={marginBottom}>
      {teams && Array.isArray(teams) && teams.map((team : any, i : number) => {
        return(
          <TeamCard
            key={team.id}
            img={team.attributes.logo.data?.attributes}
            url={'/team/' + team.attributes.slug} 
            initial={i === firstTeam}
            name={team.attributes.name}
            noTitle
          />
        );
      })}
    </CardSlider>
  );
}

function StandingGrid(props: any){
  const {children, ...otherProps} = props;
  return(
    <Grid xs={12} sm={6} lg={4} {...otherProps} >
      {children}
    </Grid>
  )
}

function StandingTableSection({standingTables} : {standingTables : any}){
  return(
    <Grid container sx={{...marginBottom, padding:"10px"}} spacing={1}>
      {standingTables && Array.isArray(standingTables) ? standingTables.sort((a, b) => a.name.localeCompare(b.name)).map((table : {teams : teamRankInterface[], name : string}, i : number) => 
        <StandingGrid key = {i}>
          <StandingTable
            title = {table.name}
            teamRanks = {table.teams}
          />
        </StandingGrid>
      ) :
        <Typography>Nessun girone trovato</Typography>
      }
    </Grid>
  );
}

function MatchSliderSection({matches} : {matches: any}){
  return(
    <>
      <CardSlider sx={marginBottom}>
        {matches && Array.isArray(matches) ? matches.map((match : any, i : number) => {
          const [date, time] = dateTimeText(new Date(match.date));
          //console.log(match)
          return(
            <MatchCard
              key={match.id}
              img={match.cover}
              url={'/match/' + match.id}
              initial={match.status === "finished"}
              teamA={match.teamA}
              teamB={match.teamB}
              date={date}
              time={time}
              league={match.league.name}
              scoreText={match.status === "finished" ? match.score[0] + " - " + match.score[1] : time}
            />
          );
        }
        ) : 
          <Typography>Nessuna squadra trovata</Typography>
        }
      </CardSlider>
    </>
  );
}
