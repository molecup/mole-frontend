import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PlayerList from '@/components/playerList';
import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/matchCard';
import StandingTable, { StandingTables } from '@/components/standingTable';
import TabLayout from '@/components/tabLayout';
import Avatar from '@mui/material/Avatar';
import HeroHeader from '@/components/heroHeader';
import CircularStatistics from '@/components/circularStatistics';
import publicFetch from '@/lib/publicFetch';
import { stableImg } from '@/lib/outImg';
import { groupPhase, imgFormatsInterface, matchShortInterface, teamInterface, teamRankInterface } from '@/lib/commonInterfaces';
import dateTimeText from '@/lib/dateTimeText';
import RelatedArticles, { getRelatedArticles, RelatedArticlesGrid } from '@/components/relatedArticles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import defaultImg from "@/public/static/match_placeholder.webp";
import { notFound } from 'next/navigation'
import Image from "@/components/image";
import Stack from '@mui/material/Stack';
import type { Metadata, ResolvingMetadata } from 'next'
import { commonKeyWords, commonOpenGraph } from '@/app/layout';
import SportsTeamJsonLd from '@/components/jsonLd/sportsTeam';

const showCircularStats = false;

async function getTeamData(slug : string) : Promise<{id: number, attributes: teamInterface}>{
    const path = `/api/teams?filters[slug][$eq]=${slug}&populate[logo]=1&populate[main_edition][populate][cover]=1&populate[main_edition][populate][article_tags]=1&populate[main_edition][populate][player_list][populate][players][populate][0]=image`;
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length === 0){
        notFound();
    }
    if(res.data.length > 1){
        console.warn(`Multiple teams with slug ${slug}`);
    }
    return res.data[0];
}

async function getTeamMatches(teamEditionId?: number) : Promise<{matches_h: {data: matchShortInterface[]}, matches_a: {data: matchShortInterface[]}}>{
    if(!teamEditionId){
        notFound();
    }
    const path = `/api/team-editions/${teamEditionId}?populate[matches_h][populate][event_info]=1&populate[matches_h][populate][cover]=1&populate[matches_h][populate][group_phase]=1&populate[matches_h][populate][knock_out_phase]=1&populate[matches_h][populate][home_team][populate][0]=team&populate[matches_h][populate][away_team][populate][0]=team&populate[matches_a][populate][event_info]=1&populate[matches_a][populate][cover]=1&populate[matches_a][populate][group_phase]=1&populate[matches_a][populate][knock_out_phase]=1&populate[matches_a][populate][home_team][populate][0]=team&populate[matches_a][populate][away_team][populate][0]=team`;
    const res  = await publicFetch(path);
    
    return res.data.attributes
}

async function getTeamGroups(teamEditionId? : number) : Promise<groupPhase[]>{
    if(!teamEditionId){
        notFound();
    }
    const path = `/api/group-phases?filters[teams][team][id]=${teamEditionId}&populate[teams][populate][team][populate][team][populate][0]=logo`;
    const res  = await publicFetch(path);

   return res.data; 
}

export async function generateMetadata({params} : {params : {slug : string, tSlug: string}}, parent: ResolvingMetadata): Promise<Metadata> {
    const teamData = await getTeamData(params.slug);
    if(!teamData){
        return({});
    }
    const imgUrl = stableImg(teamData.attributes.logo?.data?.attributes, "medium", "/static/match_placeholder.webp");
    return({
        alternates: {
            canonical: `/${params.tSlug}/team/${params.slug}`,
          },
        title: `Squadra ${teamData.attributes.name}`,
        description: `Le partite e i risultati della squadra del liceo ${teamData.attributes.name} per la Mole Cup Reale Mutua`,
        keywords: commonKeyWords.concat([teamData.attributes.name, "squadra"]),
        openGraph: {
            title: `Mole Cup - Squadra ${teamData.attributes.name}`,
            description: `La squadra del liceo ${teamData.attributes.name} per la Mole Cup Reale Mutua`,
            type: "profile",
            ...commonOpenGraph,
            url: `https://molecup.com/${params.tSlug}/team/${params.slug}`,
            images: [
                {
                    url: imgUrl,
                    alt: `La squadra del liceo ${teamData.attributes.name}`
                }
            ]
          },
    })
}

export default async function TeamPage({params} : {params : {slug : string, tSlug: string}}){
    const teamData = await getTeamData(params.slug);
    const [teamGroups, teamMatches] = await Promise.all([getTeamGroups(teamData.attributes.main_edition?.data.id), getTeamMatches(teamData.attributes.main_edition?.data.id)]);
    const articles = await getRelatedArticles(teamData.attributes.main_edition?.data.attributes.article_tags?.data || []);
    const layoutProps = {
        tSlug: params.tSlug,
        teamData: teamData.attributes,
        teamLeagues: teamGroups.map((group) : {teams: teamRankInterface[], name: string, type: "group" | "elimination"} => {return {teams: group.attributes.teams || [], name: group.attributes.name, type: 'group'}}),
        articles: articles,
        teamMatches: teamMatches.matches_a.data.concat(teamMatches.matches_h.data).sort((a, b) => a.attributes.event_info.datetime.localeCompare(b.attributes.event_info.datetime)),
    }
    return(
        <>
            <SportsTeamJsonLd team={teamData.attributes} logo={teamData.attributes.logo?.data?.attributes}/>
            <TeamHeader
                name = {teamData.attributes.name}
                logo = {teamData.attributes.logo?.data?.attributes}
                cover = {teamData.attributes.main_edition?.data.attributes.cover?.data?.attributes}
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
    teamData: teamInterface, 
    teamLeagues: {teams: teamRankInterface[], name: string, type: "group" | "elimination"}[],
    articles: any, 
    teamMatches: matchShortInterface[],
    sx: any,
    tSlug: string,
}

function SmallLayout({teamData, teamLeagues, articles, teamMatches, sx, tSlug} : layoutInterface){
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
        {teamMatches && Array.isArray(teamMatches) && teamMatches.map((match, i : number) => {
                const [date, time] = dateTimeText(new Date(match.attributes.event_info.datetime));
                return(
                    <MatchCard
                        key={match.id}
                        img={match.attributes.cover?.data?.attributes || null}
                        url={"/" + tSlug + '/match/' + match.id}
                        initial={match.attributes.event_info?.status !== "finished"}
                        teamA={match.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface}
                        teamB={match.attributes.away_team?.data.attributes.team.data.attributes || {} as teamInterface}
                        date={date}
                        time={time}
                        league={match.attributes.group_phase?.data?.attributes.name || match.attributes.knock_out_phase?.data?.attributes.name || ""}  
                        scoreText={match.attributes.event_info.status === "finished" ? match.attributes.home_score + " - " + match.attributes.away_score : time}
                    />
                );
            }
        )}
        </CardSlider>
        <TabLayout 
            labels = {["Rosa giocatori", "Torneo", "News"]}
        >
            <PlayerList playerList={teamData.main_edition?.data.attributes.player_list || null} />
            <StandingTables teamLeagues={teamLeagues} teamUrlRoot={`/${tSlug}/team/`} />

            <RelatedArticles articles = {articles}/>
        </TabLayout>
        </Box>
    );
}

function BigLayout({teamData, teamLeagues, articles, teamMatches, sx, tSlug} : layoutInterface){
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
                {teamMatches && Array.isArray(teamMatches) && teamMatches.map((match, i : number) => {
                        const [date, time] = dateTimeText(new Date(match.attributes.event_info.datetime));
                        return(
                            <MatchCard
                                key={match.id}
                                img={match.attributes.cover?.data?.attributes || null}
                                url={"/" + tSlug + '/match/' + match.id}
                                initial={match.attributes.event_info?.status !== "finished"}
                                teamA={match.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface}
                                teamB={match.attributes.away_team?.data.attributes.team.data.attributes || {} as teamInterface}
                                date={date}
                                time={time}
                                league={(match.attributes.group_phase?.data?.attributes.name || match.attributes.knock_out_phase?.data?.attributes.name) || ""}  
                                scoreText={match.attributes.event_info.status === "finished" ? match.attributes.home_score + " - " + match.attributes.away_score : time}
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
                            <PlayerList playerList={teamData.main_edition?.data.attributes.player_list || null} />
                        </Paper>
                    </Grid>
                    <Grid md={7}>
                        <StandingTables teamLeagues={teamLeagues} teamUrlRoot={`/${tSlug}/team/`}/>
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
    const coverUrl = stableImg(props.cover, "medium", defaultImg);
    return (
        <>
            <HeroHeader sx={{padding: "10px"}} src={coverUrl} blurDataURL={props.cover?.placeholder} blur>
                <Stack direction="column" spacing={2} alignItems="center">
                    <Typography variant="h1" color="white">{props.name}</Typography>
                    <Avatar sx={{ width: 90, height: 90, bgcolor:"inherit" }} variant="rounded" >
                        <Image alt={`${props.name} logo`} src={logoUrl} width="90" height="90" style={{objectFit: "contain"}} />
                    </Avatar>
                </Stack>
            </HeroHeader>
        </> 
    );
}

