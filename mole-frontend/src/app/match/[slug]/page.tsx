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
import outImg from '@/lib/outImg';
import publicFetch from '@/lib/publicFetch';
import { Warning } from '@mui/icons-material';
import dateTimeText from '@/lib/dateTimeText';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Map from '@/components/map';
import generateGoogleMapsLink from '@/lib/generateGoggleMapsLink';



/*
const playerList = [
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 10, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 2, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 7, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 4, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 9, img: null},
    {firstName: "Gianferdinando", lastName: "Verdi", shirtNumber: 12, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 1, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 22, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 74, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 20, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 11, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 17, img: null},
    {firstName: "Giacomo", lastName: "Rossi", shirtNumber: 19, img: null},
];

const dataExample = {
    teamA : {
        id: "Alf",
        name : "Alfieri",
        short : "alf",
        img : "/alfieri.png",
        playerList: playerList,
    },
    teamB : {
        id: "Alf",
        name : "Cattaneo",
        short : "cat",
        img : "/cattaneo.png",
        playerList: playerList,
    },
    score : [0, 1],
    time : "20:30",
    date : "20 ottobre 2023",
    league : {
        name: "Girone A",
    }
}
*/

async function getMatchInfo(id : number){
    const path = "/api/matches-report/" + id;
    const res  = await publicFetch(path);
    if(!Array.isArray(res.data) || res.data.length !== 1){
        throw new Error("Partita non trovata");
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
    const path = `/api/teams/${teamId}?populate[playerList]=1`;
    const res  = await publicFetch(path);
    return res.data;
}

export default async function MatchPage({params} : {params : {slug : number}}){
    const matchInfo = await getMatchInfo(params.slug);
    const standingTable = await getStandingTable(matchInfo.league.id);
    const [playerListA, playerListB] = await Promise.all([getPlayerList(matchInfo.teamA.id), getPlayerList(matchInfo.teamB.id)]);
    const [date, time] = dateTimeText(new Date(matchInfo.date));
    const status = matchInfo.status === "finished" || matchInfo.status === "live";
    const layoutProps = {
        playerList : [playerListA, playerListB],
        matchInfo : matchInfo,
        standingTable : standingTable,
        status : status,
        date : date,
        time : time,
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
    time:string
}

function SmallLayout({playerList, matchInfo, standingTable, status, date, time, sx} : layoutInterface){
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
        {!status && <LocationMapSmall address={matchInfo.stadium?.location.description} />}
        <TabLayout 
            labels = {[matchInfo.teamA.name, matchInfo.teamB.name, matchInfo.league.name]}
        >   
            <PlayerList playerList={playerList[0].attributes.playerList} />
            <PlayerList playerList={playerList[1].attributes.playerList} />
            {standingTable && <StandingTable 
                title={standingTable.name} 
                teamRanks={standingTable.teams}
            /> }
        </TabLayout>
        {status && <LocationMapSmall address={matchInfo.stadium?.location.description} />}
        </Box>
    )
}

function BigLayout({playerList, matchInfo, standingTable, status, date, time, sx} : layoutInterface){
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
                {!status && <LocationMapBig address={matchInfo.stadium?.location.description} />}
                <PlayerBig 
                    playerList = {playerList}
                    teams = {[matchInfo.teamA, matchInfo.teamB]}
                />
                <StandingTableBig
                    standingTable = {standingTable}
                />
                {status && <LocationMapBig address={matchInfo.stadium?.location.description} />}
            </Grid>
        </Container>
        </Box>
        
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
            <Typography sx={{margin: "5px"}} variant="h6" component="a" href={generateGoogleMapsLink(address)}>{address}</Typography>
        </Paper>
    );
}

function LocationMapBig({address} : {address?:string}){
    if(!address){
        return(null);
    }
    return(
        <Grid md={12}>
        <Paper>
            <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                <Typography variant='h5'>Il campo</Typography>
            </Toolbar>
            <Map address={address} mapHeight="300px" id="mapBig"/>
            <Typography sx={{margin:"5px"}} variant="h6" component="a" href={generateGoogleMapsLink(address)}>{address}</Typography>
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

function PlayerBig({playerList, teams} : {playerList : [any, any], teams:[teamInterface, teamInterface]}){
    return(
        <>
            {playerList.map((pl, idx) => 
                <Grid md={4} key={idx} sx={{marginTop: "10px"}}>
                    <Paper>
                        <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                            <Typography variant='h5'>Rosa {teams[idx].name}</Typography>
                        </Toolbar>
                        <PlayerList playerList={pl.attributes.playerList} />
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
    const imgA = outImg(props.teamA.logo?.formats.thumbnail.url);
    const imgB = outImg(props.teamB.logo?.formats.thumbnail.url);

    return (
        <Paper sx={{ padding: "10px", ...props.sx }}>
            <Stack sx={{ alignItems: 'center' }}>
                <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={2}>
                    <Avatar sx={{ width: 57, height: 57 }} href={teamALink} component={Link} alt={"logo " + props.teamA.name} src={imgA}/>
                    <Typography variant="h2" color="primary" sx={capitalizeStyle} href={teamALink} component={Link}>{props.teamA.short}</Typography>
                    <Typography variant="h3">{props.scoreText}</Typography>
                    <Typography variant="h2" color="primary" sx={capitalizeStyle} href={teamBLink} component={Link}>{props.teamB.short}</Typography>
                    <Avatar sx={{ width: 57, height: 57 }} href={teamBLink} component={Link} alt={"logo " + props.teamB.name} src={imgB} />
                </Stack>
                <Typography variant="overline" sx={{ textAlign: "center" }}>{props.league}</Typography>
                <Typography variant="h5" sx={{ textAlign: "center", ...capitalizeStyle }} gutterBottom>{props.date}</Typography>
                <Button variant="contained" sx={{ width: '60%' }}>Registrati</Button>
            </Stack>
        </Paper>
    );
}

