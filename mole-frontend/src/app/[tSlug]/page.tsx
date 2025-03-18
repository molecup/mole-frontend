import publicFetch from '@/lib/publicFetch';
import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/matchCard';
import TeamCard from '@/components/teamCard';
import Typography from '@mui/material/Typography';
import StandingTable, { StandingTables } from '@/components/standingTable';
import Container from '@mui/material/Container';
import HeroHeader from '@/components/heroHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { groupPhase, rawTournamentEditionInterface, tournamentInterface, teamRankInterface, teamEditionInterface, matchShortInterface } from '@/lib/commonInterfaces';
import dateTimeText from '@/lib/dateTimeText';
import RelatedArticles, { RelatedArticlesGrid, getRelatedArticles } from '@/components/relatedArticles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import type { Metadata } from 'next'

import headerImg from "@/public/static/DSC_0666-3.webp";
import { commonOpenGraph } from '../layout';
import SportsOrganizationJsonLd from '@/components/jsonLd/sportsOrganization';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: `/molecup`,
  },
  title: 'Il torneo',
  description: 'Tutte le informazioni del torneo Mole Cup Reale Mutua',
  openGraph: {
    title: 'Il torneo - Mole Cup Reale Mutua',
    url: 'https://molecup.com/molecup',
    description: 'Tutte le partite e le informazioni del torneo Mole Cup Reale Mutua',
    ...commonOpenGraph,
    type: 'website',
  },
}

const marginBottom = {
  marginBottom: "20px",
}

export const dynamicParams = false;

/*export async function generateStaticParams() : Promise<{tSlug: string, id:number, data: tournamentInterface}[]>{
  const path = "/api/tournaments?populate[main_edition][fields][0]=title&populate[main_edition][fields][1]=slug&populate[main_edition][fields][2]=year&populate[main_edition][populate][cover]=1&populate[main_edition][populate][team_editions][fields][0]=slug&populate[main_edition][populate][team_editions][fields][1]=year&populate[main_edition][populate][team_editions][populate][team][populate][0]=logo&populate[main_edition][populate][team_editions][populate][cover]=1&populate[logo]=1&fields[0]=slug&fields[1]=name";
  const res  = await publicFetch(path);
 
  return res.data.map((tournament : tournamentInterface) => ({
    tSlug: tournament.attributes.slug,
    editionId: tournament.attributes.main_edition.data.id,
    data: tournament
  }));
}*/

async function getTournamentData(tSlug: string) : Promise<tournamentInterface> {
  const path = `/api/tournaments?filters[slug][$eq]=${tSlug}&populate[main_edition][fields][0]=title&populate[main_edition][fields][1]=slug&populate[main_edition][fields][2]=year&populate[main_edition][fields][3]=subtitle&populate[main_edition][populate][cover]=1&populate[main_edition][populate][article_tags]=1&populate[main_edition][populate][team_editions][fields][0]=slug&populate[main_edition][populate][team_editions][fields][1]=year&populate[main_edition][populate][team_editions][populate][team][populate][0]=logo&populate[main_edition][populate][team_editions][populate][cover]=1&populate[main_edition][populate][group_phases][populate][teams][populate][team][populate][team][populate][0]=logo&populate[main_edition][populate][group_phases][populate][matches][populate][0]=home_team&populate[main_edition][populate][group_phases][populate][matches][populate][1]=away_team&populate[main_edition][populate][group_phases][populate][matches][populate][2]=event_info&populate[main_edition][populate][group_phases][populate][matches][populate][3]=cover&populate[logo]=1&fields[0]=slug&fields[1]=name`;
  const res  = await publicFetch(path);

  if (res.data.length !== 1) {
    console.error(`Tournament not found (${tSlug})`);
    notFound();
  }

  return res.data[0];
}

/*
async function getGroupMatches(editionId: number) : Promise<rawTournamentEditionInterface> {
  const path = `api/tournament-editions/${editionId}/?populate[group_phases][fields][0]=name&populate[group_phases][fields][1]=slug&populate[group_phases][populate][teams][populate][0]=team&populate[group_phases][populate][matches][populate][0]=home_team&populate[group_phases][populate][matches][populate][1]=away_team&populate[group_phases][populate][matches][populate][2]=event_info&fields[0]=slug&fields[1]=title&fields[2]=year`;
  const res  = await publicFetch(path);
  return res.data;
}
  */


export default async function Page({params} : {params : Promise<{tSlug: string}>}) {
  const {tSlug} = await params;
  const tournamentData = await getTournamentData(tSlug);
  const tournament = tournamentData.attributes.main_edition.data.attributes;
  const news = await getRelatedArticles(tournament.article_tags?.data || []);
  const teams = tournament.team_editions?.data || [];
  const firstTeam = Math.round(teams.length / 2) - 2;
  const groups = tournament.group_phases?.data || [];
  const layoutProps = {
    teams: teams,
    firstTeam: firstTeam,
    matches: groups.flatMap((group : groupPhase) => group.attributes.matches?.data?.map((match) => {return {league: group.attributes.name, ...match}}) || []),
    standingTables: groups,
    news: news,
    tSlug: tSlug,
  }
  return (
    <>
      <SportsOrganizationJsonLd/>
      <HeroHeader src={headerImg} blur sx={{height: "300px"}}>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h1" color="white" textTransform="uppercase">{tournament.title}</Typography>
          <Typography variant="h3" color="primary.main" fontWeight={700} textTransform="capitalize">{tournament.subtitle}</Typography>
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
  teams: teamEditionInterface[], 
  firstTeam: number, 
  matches: (matchShortInterface&{league:string})[], 
  standingTables: groupPhase[], 
  news: any,
  sx: any,
  tSlug: string,
}

function SmallLayout({teams, firstTeam, matches, standingTables, news, sx, tSlug}: layoutInterface){
  return(
    <Box sx={sx}>
      <TeamSection 
        teams={teams} 
        firstTeam={firstTeam} 
        tSlug={tSlug} 
      />
      <Typography variant='h2' align='center' gutterBottom >Le partite</Typography>
      <MatchSliderSection 
        matches={matches}
        teams = {teams}
        tSlug={tSlug}
      />
      
      {Array.isArray(news) && news.length > 0 && 
      <>
        <Typography variant="h2" align="center" gutterBottom>Notizie</Typography> 
        <RelatedArticles articles={news} sx={marginBottom} /> 
      </>
      }

      <Typography variant="h2" align="center" gutterBottom>Il torneo</Typography>
      <StandingTableSection standingTables={standingTables} tSlug={tSlug}/>
    </Box>
  );
}

function BigLayout({teams, firstTeam, matches, standingTables, news, sx, tSlug}: layoutInterface){
  return(
    <Box sx={sx}>
      <Container>
        <TeamSection teams={teams} firstTeam={firstTeam} tSlug={tSlug}/>

        <Grid container spacing={1}>
            <Grid md={8} sx={{marginTop: "20px"}}>
              <Paper>
                <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                    <Typography variant='h5'>Le partite</Typography>
                </Toolbar>
                <MatchSliderSection matches={matches} teams={teams} tSlug={tSlug} />
              </Paper>

              <Paper>
                <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                    <Typography variant='h5'>Ultime notizie</Typography>
                </Toolbar>
                <RelatedArticlesGrid articles = {news}/>
              </Paper>        
            </Grid>
            <Grid md={4}>
              <StandingTableSection standingTables={standingTables} tSlug={tSlug}/>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function TeamSection({teams, firstTeam, tSlug} : {teams: teamEditionInterface[], firstTeam: number, tSlug: string}){
  return(
    <CardSlider sx={marginBottom}>
      {teams && Array.isArray(teams) && teams.map((team : teamEditionInterface, i : number) => {
        return(
          <TeamCard
            key={team.id}
            img={team.attributes.team.data.attributes.logo?.data?.attributes || null}
            url={tSlug + '/team/' + team.attributes.team.data.attributes.slug} 
            initial={i === firstTeam}
            name={team.attributes.team.data.attributes.name}
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

function StandingTableSection({standingTables, tSlug} : {standingTables : groupPhase[], tSlug: string}){
  const tables = standingTables.map((group) : {teams: teamRankInterface[], name: string, type: "group" | "elimination"} => {return {teams: group.attributes.teams || [], name: group.attributes.name, type: 'group'}});
  return(
    <Grid container sx={{...marginBottom, padding:"10px"}} spacing={1}>
      <StandingTables teamLeagues={tables} teamUrlRoot={`/${tSlug}/team/`} />
    </Grid>
  );
}

function MatchSliderSection({matches, teams, tSlug} : {matches: (matchShortInterface&{league:string})[], teams: teamEditionInterface[], tSlug: string}){
  return(
    <>
      <CardSlider sx={marginBottom}>
        {matches && Array.isArray(matches) ? 
        matches.sort((m1, m2) => m1.attributes.event_info?.datetime.localeCompare(m2.attributes.event_info?.datetime))
                .map((match : matchShortInterface&{league:string}, i : number) => {
          const [date, time] = dateTimeText(new Date(match.attributes.event_info?.datetime || ""));
          //console.log(match)
          return(
            <MatchCard
              key={match.id}
              img={match.attributes.cover?.data?.attributes || null}
              url={tSlug + '/match/' + match.id}
              initial={match.attributes.event_info?.status !== "finished"}
              teamA={teams.find((team) => team.id === match.attributes.home_team?.data.id)?.attributes.team.data.attributes || teams[0].attributes.team.data.attributes}
              teamB={teams.find((team) => team.id === match.attributes.away_team?.data.id)?.attributes.team.data.attributes || teams[0].attributes.team.data.attributes}
              date={date}
              time={time}
              league={match.league}
              scoreText={match.attributes.event_info?.status === "finished" ? match.attributes.home_score + " - " + match.attributes.away_score : time}
            />
          );
        }
        ) : 
          <Typography>Nessuna partita trovata</Typography>
        }
      </CardSlider>
    </>
  );
}
