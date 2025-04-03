import StandingTable from '@/components/standingTable';
import Container from '@mui/material/Container';
import TabLayout from '@/components/tabLayout';
import Typography from '@mui/material/Typography';
import PlayerList from '@/components/playerList';
import Paper from '@mui/material/Paper';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { groupPhase, knockOutPhase, rawMatchLongInterface, rawPlayerListInterface, teamInterface } from '@/lib/commonInterfaces';
import { stableImg } from '@/lib/outImg';
import publicFetch from '@/lib/publicFetch';
import { notFound } from 'next/navigation'
import dateTimeText, { dateTimeTextDynamic } from '@/lib/dateTimeText';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Map from '@/components/map';
import generateGoogleMapsLink from '@/lib/generateGoggleMapsLink';
import generatePlayerMapEvent, { mapEventType } from '@/lib/generatePlayerMapEvent';
import MatchTimeline from '@/components/matchTimeline';
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from 'next'
import { commonKeyWords, commonOpenGraph } from '@/app/layout';
import HeroHeader from '@/components/heroHeader';
import { getTournamentName } from '@/app/[tSlug]/layout';

import defaultImg from "@/public/static/match_placeholder.webp";
import SportsEventJsonLd from '@/components/jsonLd/sportsEvent';
import scoreText from '@/lib/scoreText';


async function getMatchData(id : number) : Promise<rawMatchLongInterface>{
    const path = `/api/matches/${id}?populate[cover]=1&populate[match_events][populate][0]=player&populate[knock_out_phase]=1&populate[group_phase][populate][teams][populate][team][populate][team][populate][0]=logo&populate[event_info][populate][stadium]=1&populate[home_team][populate][team][populate][logo]=1&populate[home_team][populate][player_list]=1&populate[away_team][populate][team][populate][logo]=1&populate[away_team][populate][player_list]=1`;
    const res  = await publicFetch(path);
    if(!res.data || !res.data.attributes){
        notFound();
    }
    return res;
}

async function getPlayerList(playerListId? : number): Promise<rawPlayerListInterface | null> {
    if(!playerListId){
        return null;
    }
    const path = `/api/player-lists/${playerListId}?populate[players]=1`;
    try{
        const res  = await publicFetch(path);
        return res;
    } catch(error) {
        console.error("Failed to fetch player list");
        return null;
    }
}

export async function generateMetadata({params} : {params : {slug : number, tSlug: string}}, parent: ResolvingMetadata): Promise<Metadata> {
    const matchInfo = await getMatchData(params.slug);
    const tournamentName = await getTournamentName(params.tSlug);
    const leagueName = matchInfo.data.attributes.group_phase?.data?.attributes.name || matchInfo.data.attributes.knock_out_phase?.data?.attributes.name || "";
    if(!matchInfo){
        return({});
    }
    const [date, time] = dateTimeText(new Date(matchInfo.data.attributes.event_info.datetime));
    const imgUrl = stableImg(matchInfo.data.attributes.cover?.data?.attributes, "large", "/match_placeholder.jpg");
    const title = `${matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes.short.toUpperCase()} vs ${matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes.short.toUpperCase()} - ${leagueName}`;
    const description = `${tournamentName}, ${leagueName}. La partita ${matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes.name} - ${matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes.name} del ${date}`
    return({
        alternates: {
            canonical: `/${params.tSlug}/match/${params.slug}`,
          },
        title: title,
        description: description,
        keywords: commonKeyWords.concat([matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes.name || "", matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes.name || "", matchInfo.data.attributes.group_phase?.data?.attributes.name || "", "partita"]),
        openGraph: {
            title: title,
            description: description,
            type: 'article',
            publishedTime: matchInfo.data.attributes.event_info.datetime,
            url: `${process.env.NEXT_PUBLIC_URL}/${params.tSlug}/match/${params.slug}`,
            ...commonOpenGraph,
            images: [
                {
                    url: imgUrl,
                    alt: matchInfo.data.attributes.cover?.data?.attributes.alternativeText || description
                }
            ]
          },
    })
}

export default async function MatchPage({params} : {params : {slug : number, tSlug:string}}){
    const matchInfo = await getMatchData(params.slug);
    const standingTable = matchInfo.data.attributes.group_phase;
    const treeTable = matchInfo.data.attributes.knock_out_phase;
    const [playerListA, playerListB] = await Promise.all([getPlayerList(matchInfo.data.attributes.home_team?.data.id), getPlayerList(matchInfo.data.attributes.home_team?.data.id)]);
    const datetime = new Date(matchInfo.data.attributes.event_info.datetime);
    const status = matchInfo.data.attributes.event_info.status === "finished" || matchInfo.data.attributes.event_info.status === "live";
    const mapEvents = generatePlayerMapEvent(matchInfo.data.attributes.match_events);
    const coverUrl = stableImg(matchInfo.data.attributes.cover?.data?.attributes, "large", defaultImg);
    const layoutProps = {
        playerList : [playerListA, playerListB],
        matchInfo : matchInfo,
        standingTable : standingTable?.data,
        treeTable: treeTable?.data,
        status : status,
        datetime : datetime,
        mapEvents : mapEvents,
        tSlug : params.tSlug
    }
    return(
        <>
            <SportsEventJsonLd 
                slug={params.slug.toString()}
                matchInfo={matchInfo}
                img={coverUrl}
                dateString={dateTimeText(datetime)[0]}
            />
            <HeroHeader sx={{minHeight:"300px"}} imgObjectPosition="50% 16%" src={coverUrl} blurDataURL={matchInfo.data.attributes.cover?.data?.attributes.placeholder} blur ></HeroHeader>
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
    sx : any,
    playerList : (rawPlayerListInterface | null)[], 
    matchInfo: rawMatchLongInterface, 
    standingTable?: groupPhase | null, 
    treeTable?: knockOutPhase | null
    status:boolean, 
    datetime: Date,
    mapEvents: [mapEventType, mapEventType],
    tSlug: string,
}

function SmallLayout({playerList, matchInfo, standingTable, treeTable, status, datetime, mapEvents, sx, tSlug} : layoutInterface){
    return(
        <Box sx={sx}>
        <MatchHeader 
            teamUrlRoot= {`/${tSlug}/team/`}
            teamA = {matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface}
            teamB = {matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes || {} as teamInterface}
            //scoreText = {status ? matchInfo.data.attributes.home_score + " - " + matchInfo.data.attributes.away_score : date}
            scoreText= {scoreText(matchInfo.data)}
            league = {standingTable?.attributes?.name || treeTable?.attributes.name || ""}
            date = {status? dateTimeText(datetime)[0] : dateTimeTextDynamic(datetime, true)}
            sx={{margin: "10px"}}
            link= {matchInfo.data.attributes.event_info.event_registration ? matchInfo.data.attributes.event_info.registration_link : undefined}
        />
        {Array.isArray(matchInfo.data.attributes.match_events) && matchInfo.data.attributes.match_events.length > 0 && <MatchTimeline matchEvents={matchInfo.data.attributes.match_events} teams={[matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface, matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes || {} as teamInterface]} hideMinutes={matchInfo.data.attributes.hide_event_minutes}/>}
        {!status && <LocationMapSmall address={matchInfo.data.attributes.event_info.stadium?.data?.attributes.location?.address} />}
        <TabLayout 
            labels = {[matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes.name, matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes.name, standingTable?.attributes?.name || treeTable?.attributes.name || ""]}
        >   
            <PlayerList playerList={playerList[0]} mapEvent={mapEvents[0]}/>
            <PlayerList playerList={playerList[1]} mapEvent={mapEvents[1]}/>
            {standingTable && !standingTable.attributes.hide_table && <StandingTable 
                title={standingTable.attributes.name} 
                teamRanks={standingTable.attributes.teams}
                type={standingTable.attributes ? "group" : "elimination"}
                teamUrlRoot={`/${tSlug}/team/`}
                //treeImg={null}
            /> }
        </TabLayout>
        {status && <LocationMapSmall address={matchInfo.data.attributes.event_info.stadium?.data?.attributes.location.address} />}
        </Box>
    )
}

function BigLayout({playerList, matchInfo, standingTable, treeTable, status, datetime, mapEvents, sx, tSlug} : layoutInterface){
    return(
        <Box sx={sx}> 
        <Container>
            <MatchHeader 
                teamUrlRoot= {`/${tSlug}/team/`}
                teamA = {matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface}
                teamB = {matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes || {} as teamInterface}
                //scoreText = {status ? matchInfo.data.attributes.home_score + " - " + matchInfo.data.attributes.away_score : date}
                scoreText= {scoreText(matchInfo.data)}
                league = {standingTable?.attributes?.name || treeTable?.attributes.name || ""}
                date = {status? dateTimeText(datetime)[0] : dateTimeTextDynamic(datetime, true)}
                sx={{marginTop: "10px"}}
                link= {matchInfo.data.attributes.event_info.event_registration ? matchInfo.data.attributes.event_info.registration_link : undefined}
            />
            <Grid container spacing={1} sx={{marginTop:"10px"}}>
                {Array.isArray(matchInfo.data.attributes.match_events) && matchInfo.data.attributes.match_events.length > 0 && <TimeLineBig matchInfo={matchInfo}/>}
                {!status && <LocationMapBig address={matchInfo.data.attributes.event_info.stadium?.data?.attributes.location.address} />}
                <PlayerBig 
                    playerList = {playerList}
                    teams = {[matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface, matchInfo.data.attributes.away_team?.data.attributes.team.data.attributes || {} as teamInterface]}
                    mapEvents={mapEvents}
                />
                <Grid md={4}>
                    <StandingTableBig
                        standingTable = {standingTable}
                        treeTable={treeTable}
                        tSlug={tSlug}
                    />
                    {status && <LocationMapBig address={matchInfo.data.attributes.event_info.stadium?.data?.attributes.location.address} md={4} />}
                </Grid>
            </Grid>
        </Container>
        </Box>
        
    );
}

function TimeLineBig({matchInfo} : {matchInfo : rawMatchLongInterface}){
    return(
        <Grid md={12} sx={{marginBottom: "10px", marginTop: "10px"}}>
            <MatchTimeline matchEvents={matchInfo.data.attributes.match_events} teams={[matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface, matchInfo.data.attributes.home_team?.data.attributes.team.data.attributes || {} as teamInterface]} hideMinutes={matchInfo.data.attributes.hide_event_minutes}/>
        </Grid>
    );
}

function LocationMapSmall({address} : {address?:string}){
    if(!address){
        return(null);
    }
    return(
        <Paper sx={{margin: "10px"}}>
            <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                <Typography variant='h5'>Il campo</Typography>
            </Toolbar>
            <Map address={address} mapHeight="250px" id="mapSmall"/>
            <Typography sx={{margin: "5px"}} color="text.secondary" variant="h6" component="a" href={generateGoogleMapsLink(address)}>{address}</Typography>
        </Paper>
    );
}

function LocationMapBig({address, md=12} : {address?:string, md?:number}){
    if(!address){
        return(null);
    }
    return(
        <Grid md={md}>
        <Paper>
            <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                <Typography variant='h5'>Il campo</Typography>
            </Toolbar>
            <Map address={address} mapHeight="300px" id="mapBig"/>
            <Typography sx={{margin:"5px"}} color="text.secondary" variant="h6" component="a" href={generateGoogleMapsLink(address)}>{address}</Typography>
        </Paper>
        </Grid>
    );
}

function StandingTableBig({standingTable, treeTable, tSlug} : {standingTable?: groupPhase | null, treeTable?: knockOutPhase | null, tSlug: string}){
    return(
        <>
        <Grid md={4}>
            {standingTable && !standingTable.attributes.hide_table && 
                <StandingTable 
                teamUrlRoot={`/${tSlug}/team/`}
                title={standingTable?.attributes?.name || treeTable?.attributes.name || ""} 
                teamRanks={standingTable.attributes.teams}
                type= {standingTable.attributes ? "group" : "elimination"}
                //treeImg={standingTable.treeTable}
                /> 
            }
        </Grid>
        </>
    );
}

function PlayerBig({playerList, teams, mapEvents} : {playerList : (rawPlayerListInterface | null)[], teams:[teamInterface, teamInterface], mapEvents: [mapEventType, mapEventType]}){
    return(
        <>
            {playerList.map((pl, idx) => 
                <Grid md={4} key={idx} sx={{marginTop: "10px"}}>
                    <Paper>
                        <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                            <Typography variant='h5'>Rosa {teams[idx].name}</Typography>
                        </Toolbar>
                        <PlayerList playerList={pl} mapEvent={mapEvents[idx]} />
                    </Paper>
                </Grid>
            )}
        </>
    );
}

const capitalizeStyle = {
    textTransform: "capitalize",
    textDecoration: "none",
}

interface matchHeaderInterface{
    teamA : teamInterface,
    teamB : teamInterface,
    scoreText : string,
    league : string,
    date : string,
    link ?: string,
    teamUrlRoot : string,
}

function MatchHeader(props : matchHeaderInterface & {sx?: any}) {
    const teamALink = props.teamUrlRoot + props.teamA.slug;
    const teamBLink = props.teamUrlRoot + props.teamB.slug;
    const imgA = stableImg(props.teamA.logo?.data?.attributes, "thumbnail");
    const imgB = stableImg(props.teamB.logo?.data?.attributes, "thumbnail");

    return (
        <Paper component="header" sx={{ padding: "10px", ...props.sx }}>
            <Stack sx={{ alignItems: 'center' }}>
                <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={{xs: 0.5, md:3}}>
                    <Avatar sx={{ width: 57, height: 57, bgcolor:"inherit", marginRight:"-60px" }} href={teamALink} component={Link} variant="rounded" >
                        <Image alt={`${props.teamA.name} logo`} src={imgA}  width="57" height="57" style={{objectFit: "contain"}} />
                    </Avatar>
                    <Typography variant="h2" color="primary" sx={capitalizeStyle} href={teamALink} component={Link}>{props.teamA.short}</Typography>
                    <Typography variant="h3" minWidth={70}>{props.scoreText}</Typography>
                    <Typography variant="h2" color="secondary" sx={capitalizeStyle} href={teamBLink} component={Link}>{props.teamB.short}</Typography>
                    <Avatar sx={{ width: 57, height: 57, bgcolor:"inherit" }} href={teamBLink} component={Link} variant="rounded" >
                        <Image alt={`${props.teamB.name} logo`} src={imgB}  width="57" height="57" style={{objectFit: "contain"}} />
                    </Avatar>
                </Stack>
                <Typography variant="overline" sx={{ textAlign: "center" }}>{props.league}</Typography>
                <Typography variant="h5" sx={{ textAlign: "center", ...capitalizeStyle }} gutterBottom>{props.date}</Typography>
                {props.link && <Button variant="contained" sx={{ width: '60%' }} href={props.link}>Registrati</Button>}
            </Stack>
        </Paper>
    );
}

