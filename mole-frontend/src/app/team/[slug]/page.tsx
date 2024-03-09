import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PlayerList from '@/components/playerList';
import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/matchCard';
import StandingTable from '@/components/standingTable';
import TabLayout from '@/components/tabLayout';
import Avatar from '@mui/material/Avatar';
import HeroHeader from '@/components/heroHeader';
import CircularStatistics from '@/components/circularStatistics';
import publicFetch from '@/lib/publicFetch';
import { stableImg } from '@/lib/outImg';
import { imgFormatsInterface, teamRankInterface } from '@/lib/commonInterfaces';
import dateTimeText from '@/lib/dateTimeText';
import RelatedArticles, { getRelatedArticles, RelatedArticlesGrid } from '@/components/relatedArticles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { notFound } from 'next/navigation'
import Image from "next/image";
import Stack from '@mui/material/Stack';
import type { Metadata, ResolvingMetadata } from 'next'
import { commonKeyWords } from '@/app/layout';

const showCircularStats = false;

async function getTeamData(slug : string){
    const path = `/api/teams?filters[slug][$eq]=${slug}&populate[logo]=1&populate[cover]=1&populate[article_tags][fields]=id&populate[playerList]=1`;
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length === 0){
        notFound();
    }
    return res.data[0];
}

async function getTeamMatches(slug : string){
    const path = `/api/matches-report/team/${slug}`;
    const res  = await publicFetch(path);
    return res.data; 
}

async function getTeamLeagues(slug : string){
    const path = `/api/league-standings/team/${slug}`;
    const res  = await publicFetch(path);
    return res.data; 
}

export async function generateMetadata({params} : {params : {slug : string}}, parent: ResolvingMetadata): Promise<Metadata> {
    const teamData = await getTeamData(params.slug);
    return({
        title: `Squadra ${teamData.attributes.name}`,
        description: `Le partite e i risultati della squadra del liceo ${teamData.attributes.name} per la Mole Cup Reale Mutua`,
        keywords: commonKeyWords.concat([teamData.attributes.name, "squadra"])
    })
}

export default async function TeamPage({params} : {params : {slug : string}}){
    const [teamData, teamMatches, teamLeagues] = await Promise.all([getTeamData(params.slug), getTeamMatches(params.slug), getTeamLeagues(params.slug)]);
    const articles = await getRelatedArticles(teamData.attributes.article_tags.data);
    const layoutProps = {
        teamData: teamData,
        teamLeagues: teamLeagues,
        articles: articles,
        teamMatches: teamMatches
    }
    return(
        <>
            <TeamHeader
                name = {teamData.attributes.name}
                logo = {teamData.attributes.logo.data?.attributes}
                cover = {teamData.attributes.cover.data?.attributes}
            />
            <SmallLayout
                sx={{display: { xs: 'block', md: 'none' }}}
                {...layoutProps}
            />
            <BigLayout
                sx={{display: { xs: 'none', md: 'block' }}}
                {...layoutProps}
            />
        </>
    );
}

interface layoutInterface {
    teamData: any, 
    teamLeagues: any, 
    articles: any, 
    teamMatches: any,
    sx: any
}

function SmallLayout({teamData, teamLeagues, articles, teamMatches, sx} : layoutInterface){
    return(
        <Box sx={sx}>
        {showCircularStats && <Container sx={{padding:"10px"}}>
            <CircularStatistics 
                statistics={[
                    {title: "Edizioni", value:4, tot:4},
                    {title: "vittorie", value:23, tot:30, color:"success"},
                    {title: "Tifosi", value: 1500, tot:50000, hideTot:true}
                ]}
            />
        </Container>}
        
        <CardSlider>
        {teamMatches && Array.isArray(teamMatches) && teamMatches.map((match : any, i : number) => {
                const [date, time] = dateTimeText(new Date(match.date));
                return(
                    <MatchCard
                        key={match.id}
                        img={match.cover}
                        url={'/match/' + match.id}
                        initial={match.initial}
                        teamA={match.teamA}
                        teamB={match.teamB}
                        date={date}
                        time={time}
                        league={match.league.name}
                        scoreText={match.status === "finished" ? match.score[0] + " - " + match.score[1] : time}
                    />
                );
            }
        )}
        </CardSlider>
        <TabLayout 
            labels = {["Rosa giocatori", "Torneo", "News"]}
        >
            <PlayerList playerList={teamData.attributes.playerList} />
            <>
                {teamLeagues && Array.isArray(teamLeagues) && teamLeagues.map((table : {teams : teamRankInterface[], name : string}, i : number) => 
                    <StandingTable 
                    key = {i}
                    title = {table.name}
                    teamRanks = {table.teams}
                    small
                    />
                )}
            </>
            <RelatedArticles articles = {articles}/>
        </TabLayout>
        </Box>
    );
}

function BigLayout({teamData, teamLeagues, articles, teamMatches, sx} : layoutInterface){
    return(
        <Box sx={sx}>
            <Container sx={{padding:"10px"}}>
                {showCircularStats && <CircularStatistics 
                    statistics={[
                        {title: "Edizioni", value:4, tot:4},
                        {title: "vittorie", value:23, tot:30, color:"success"},
                        {title: "Tifosi", value: 1500, tot:50000, hideTot:true}
                    ]}
                />}
                <CardSlider>
                {teamMatches && Array.isArray(teamMatches) && teamMatches.map((match : any, i : number) => {
                        const [date, time] = dateTimeText(new Date(match.date));
                        return(
                            <MatchCard
                                key={match.id}
                                img={match.cover}
                                url={'/match/' + match.id}
                                initial={match.initial}
                                teamA={match.teamA}
                                teamB={match.teamB}
                                date={date}
                                time={time}
                                league={match.league.name}
                                scoreText={match.status === "finished" ? match.score[0] + " - " + match.score[1] : time}
                            />
                        );
                    }
                )}
                </CardSlider>
                <Grid container spacing={1} >
                    <Grid md={5} sx={{marginTop: "10px"}}>
                        <Paper>
                            <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                                <Typography variant='h5'>Rosa giocatori</Typography>
                            </Toolbar>
                            <PlayerList playerList={teamData.attributes.playerList} />
                        </Paper>
                    </Grid>
                    <Grid md={7}>
                        {teamLeagues && Array.isArray(teamLeagues) && teamLeagues.map((table : {teams : teamRankInterface[], name : string}, i : number) => 
                            <StandingTable 
                            key = {i}
                            title = {table.name}
                            teamRanks = {table.teams}
                            small
                            />
                        )}
                        <Paper>
                            <Toolbar sx={{borderRadius: "4px 4px 0 0", marginBottom: "10px"}}>
                                <Typography variant='h5'>Ultimi articoli</Typography>
                            </Toolbar>
                            <RelatedArticlesGrid articles = {articles}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

interface teamHeaderProps {
    name : string,
    logo? : imgFormatsInterface,
    cover?: imgFormatsInterface
}

function TeamHeader(props : teamHeaderProps) {
    const logoUrl = stableImg(props.logo, "medium");
    const coverUrl = stableImg(props.cover, "medium", "/match_placeholder.jpg");
    return (
        <>
            <HeroHeader sx={{padding: "10px"}} src={coverUrl}>
                <Stack direction="column" spacing={2} alignItems="center">
                    <Typography variant="h1" color="white">{props.name}</Typography>
                    <Avatar sx={{ width: 90, height: 90, bgcolor:"inherit" }} variant="rounded" >
                        <Image alt={`${props.name} logo`} src={logoUrl}  width="90" height="90" style={{objectFit: "contain"}} />
                    </Avatar>
                </Stack>
            </HeroHeader>
        </> 
    );
}