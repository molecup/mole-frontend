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
    return(
        <>
            <MatchHeader 
                teamA = {matchInfo.teamA}
                teamB = {matchInfo.teamB}
                scoreText = {status ? matchInfo.score[0] + " - " + matchInfo.score[1] : date}
                league = {matchInfo.league.name}
                date = {status? date : time}
            />
            <TabLayout 
                labels = {[matchInfo.teamA.name, matchInfo.teamB.name, matchInfo.league.name]}
            >   
                <PlayerList playerList={playerListA.attributes.playerList} />
                <PlayerList playerList={playerListB.attributes.playerList} />
                {standingTable && <StandingTable 
                    title={standingTable.name} 
                    teamRanks={standingTable.teams}
                /> }
            </TabLayout>
            
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

function MatchHeader(props : matchHeaderInterface) {
    const teamALink = "/team/" + props.teamA.slug;
    const teamBLink = "/team/" + props.teamB.slug;
    const imgA = outImg(props.teamA.logo?.formats.thumbnail.url);
    const imgB = outImg(props.teamB.logo?.formats.thumbnail.url);

    return (
        <Paper sx={{ margin: "10px", padding: "10px" }}>
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

