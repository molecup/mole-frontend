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
import { teamInterface } from '@/lib/commonInterfaces';
import { stableImg } from '@/lib/outImg';
import publicFetch from '@/lib/publicFetch';
import { notFound } from 'next/navigation'
import dateTimeText from '@/lib/dateTimeText';
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

async function getMatchInfo(id : number){
    const path = "/api/matches-report/" + id;
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length !== 1){
        notFound();
    }
    return res.data[0];
}

async function getStandingTable(leagueId : number){
    const path = "/api/league-standings/" + leagueId;
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length !== 1){
        console.log("ERROR. Standing table not found")
        return null;
    }
    return res.data[0];
}

async function getPlayerList(teamId : number){
    const path = `/api/teams/${teamId}?populate[player_list][populate][0]=players`;
    const res  = await publicFetch(path);
    return res.data.attributes.player_list.data;
}

export async function generateMetadata({params} : {params : {slug : number}}, parent: ResolvingMetadata): Promise<Metadata> {
    const matchInfo = await getMatchInfo(params.slug);
    if(!matchInfo){
        return({});
    }
    const [date, time] = dateTimeText(new Date(matchInfo.date));
    const imgUrl = stableImg(matchInfo.cover, "large", "/match_placeholder.jpg");
    const title = `${matchInfo.teamA?.short.toUpperCase()} vs ${matchInfo.teamB?.short.toUpperCase()} - ${matchInfo.league?.name}`;
    const description = `La partita ${matchInfo.teamA?.name} - ${matchInfo.teamB?.name} del ${date} al ${matchInfo.stadium?.name} della Mole Cup Reale Mutua`
    return({
        title: title,
        description: description,
        keywords: commonKeyWords.concat([matchInfo.teamA?.name, matchInfo.teamB?.name, matchInfo.stadium?.name, matchInfo.league?.name, "partita"]),
        openGraph: {
            title: title,
            description: description,
            type: 'article',
            publishedTime: matchInfo.date,
            url: `https://molecup.com/match/${params.slug}`,
            ...commonOpenGraph,
            images: [
                {
                    url: imgUrl,
                    alt: matchInfo.cover?.alternativeText ? matchInfo.cover?.alternativeText : description
                }
            ]
          },
    })
}

export default async function MatchPage({params} : {params : {slug : number}}){
    const matchInfo = await getMatchInfo(params.slug);
    const [standingTable, playerListA, playerListB] = await Promise.all([getStandingTable(matchInfo.league.id), getPlayerList(matchInfo.teamA.id), getPlayerList(matchInfo.teamB.id)]);
    const [date, time] = dateTimeText(new Date(matchInfo.date));
    const status = matchInfo.status === "finished" || matchInfo.status === "live";
    const mapEvents = generatePlayerMapEvent(matchInfo.matchEvents);
    const layoutProps = {
        playerList : [playerListA, playerListB],
        matchInfo : matchInfo,
        standingTable : standingTable,
        status : status,
        date : date,
        time : time,
        mapEvents : mapEvents,
    }
    return(
        <>
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
    playerList : any[2], 
    matchInfo: any, 
    standingTable:any, 
    status:boolean, 
    date:string, 
    time:string,
    mapEvents: [mapEventType, mapEventType],
}

function SmallLayout({playerList, matchInfo, standingTable, status, date, time, mapEvents, sx} : layoutInterface){
    return(
        <Box sx={sx}>
        <MatchHeader 
            teamA = {matchInfo.teamA}
            teamB = {matchInfo.teamB}
            scoreText = {status ? matchInfo.score[0] + " - " + matchInfo.score[1] : date}
            league = {matchInfo.league.name}
            date = {status? date : time}
            sx={{margin: "10px"}}
        />
        {Array.isArray(matchInfo.matchEvents) && matchInfo.matchEvents.length > 0 && <MatchTimeline matchEvents={matchInfo.matchEvents} teams={[matchInfo.teamA, matchInfo.teamB]}/>}
        {!status && <LocationMapSmall address={matchInfo.stadium?.location?.description} />}
        <TabLayout 
            labels = {[matchInfo.teamA.name, matchInfo.teamB.name, matchInfo.league.name]}
        >   
            <PlayerList playerList={playerList[0]?.attributes.players} mapEvent={mapEvents[0]}/>
            <PlayerList playerList={playerList[1]?.attributes.players} mapEvent={mapEvents[1]}/>
            {standingTable && <StandingTable 
                title={standingTable.name} 
                teamRanks={standingTable.teams}
            /> }
        </TabLayout>
        {status && <LocationMapSmall address={matchInfo.stadium?.location?.description} />}
        </Box>
    )
}

function BigLayout({playerList, matchInfo, standingTable, status, date, time, mapEvents, sx} : layoutInterface){
    return(
        <Box sx={sx}> 
        <Container>
            <MatchHeader 
                teamA = {matchInfo.teamA}
                teamB = {matchInfo.teamB}
                scoreText = {status ? matchInfo.score[0] + " - " + matchInfo.score[1] : date}
                league = {matchInfo.league.name}
                date = {status? date : time}
                sx={{marginTop: "10px"}}
            />
            <Grid container spacing={1} sx={{marginTop:"10px"}}>
                {Array.isArray(matchInfo.matchEvents) && matchInfo.matchEvents.length > 0 && <TimeLineBig matchInfo={matchInfo}/>}
                {!status && <LocationMapBig address={matchInfo.stadium?.location?.description} />}
                <PlayerBig 
                    playerList = {playerList}
                    teams = {[matchInfo.teamA, matchInfo.teamB]}
                    mapEvents={mapEvents}
                />
                <Grid md={4}>
                    <StandingTableBig
                        standingTable = {standingTable}
                    />
                    {status && <LocationMapBig address={matchInfo.stadium?.location?.description} md={4} />}
                </Grid>
            </Grid>
        </Container>
        </Box>
        
    );
}

function TimeLineBig({matchInfo} : {matchInfo : any}){
    return(
        <Grid md={12} sx={{marginBottom: "10px", marginTop: "10px"}}>
            <MatchTimeline matchEvents={matchInfo.matchEvents} teams={[matchInfo.teamA, matchInfo.teamB]}/>
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

function StandingTableBig({standingTable} : {standingTable: any}){
    return(
        <>
        <Grid md={4}>
            {standingTable && 
                <StandingTable 
                title={standingTable.name} 
                teamRanks={standingTable.teams}
                /> 
            }
        </Grid>
        </>
    );
}

function PlayerBig({playerList, teams, mapEvents} : {playerList : [any, any], teams:[teamInterface, teamInterface], mapEvents: [mapEventType, mapEventType]}){
    return(
        <>
            {playerList.map((pl, idx) => 
                <Grid md={4} key={idx} sx={{marginTop: "10px"}}>
                    <Paper>
                        <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                            <Typography variant='h5'>Rosa {teams[idx].name}</Typography>
                        </Toolbar>
                        <PlayerList playerList={pl?.attributes.players} mapEvent={mapEvents[idx]} />
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
}

function MatchHeader(props : matchHeaderInterface & {sx?: any}) {
    const teamALink = "/team/" + props.teamA.slug;
    const teamBLink = "/team/" + props.teamB.slug;
    const imgA = stableImg(props.teamA.logo, "thumbnail");
    const imgB = stableImg(props.teamB.logo, "thumbnail");

    return (
        <Paper component="header" sx={{ padding: "10px", ...props.sx }}>
            <Stack sx={{ alignItems: 'center' }}>
                <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={2}>
                    <Avatar sx={{ width: 57, height: 57, bgcolor:"inherit" }} href={teamALink} component={Link} variant="rounded" >
                        <Image alt={`${props.teamA.name} logo`} src={imgA}  width="57" height="57" style={{objectFit: "contain"}} />
                    </Avatar>
                    <Typography variant="h2" color="primary" sx={capitalizeStyle} href={teamALink} component={Link}>{props.teamA.short}</Typography>
                    <Typography variant="h3">{props.scoreText}</Typography>
                    <Typography variant="h2" color="primary" sx={capitalizeStyle} href={teamBLink} component={Link}>{props.teamB.short}</Typography>
                    <Avatar sx={{ width: 57, height: 57, bgcolor:"inherit" }} href={teamBLink} component={Link} variant="rounded" >
                        <Image alt={`${props.teamB.name} logo`} src={imgB}  width="57" height="57" style={{objectFit: "contain"}} />
                    </Avatar>
                </Stack>
                <Typography variant="overline" sx={{ textAlign: "center" }}>{props.league}</Typography>
                <Typography variant="h5" sx={{ textAlign: "center", ...capitalizeStyle }} gutterBottom>{props.date}</Typography>
                {false && <Button variant="contained" sx={{ width: '60%' }}>Registrati</Button>}
            </Stack>
        </Paper>
    );
}

