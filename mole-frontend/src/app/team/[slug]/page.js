import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PlayerList from '@/components/playerList';
import TeamHeader from '@/components/teamHeader';
import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/matchCard';
import StandingTable from '@/components/standingTable';
import TabLayout from '@/components/tabLayout';

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

const playerList = [
    {firstName: "Giacomo", lastName: "Rossi", number: 10, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 2, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 7, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 4, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 9, img: null},
    {firstName: "Gianferdinando", lastName: "Verdi", number: 12, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 1, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 22, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 74, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 20, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 11, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 17, img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: 19, img: null},

];

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
    { id: "4", teamA: teams[7], teamB: teams[0], score: null, description: "Questo è un esempio di partita. Prima partita  ", date: "27/10", time: "20:00", league: "Girone A", img: matchImg, initial: true },
    { id: "5", teamA: teams[0], teamB: teams[1], score: null, description: "Questo è un esempio di partita. Bal bla bla bla", date: "02/11", time: "21:30", league: "Girone B", img: matchImg, initial: false },
  ];

export default function TeamPage({params}){
    return(
        <>
            <TeamHeader
                name = "Alfieri"
                img = "/alfieri.png"
            />
            <CardSlider>
            {matches.map((match, i) =>
                <MatchCard
                    key={match.id}
                    img={match.img}
                    url={'/match/' + match.id}
                    initial={match.initial}
                    teamA={match.teamA}
                    teamB={match.teamB}
                    description={match.description}
                    date={match.date}
                    time={match.time}
                    league={match.league}
                    scoreText={match.score ? match.score[0] + " - " + match.score[1] : match.time}
                />
            )}
            </CardSlider>
            <TabLayout 
                labels = {["Torneo", "Rosa giocatori", "News"]}
            >
                <StandingTable title="Girone A" />
                <PlayerList playerList={playerList} />
                <Typography variant="h3">News</Typography>
            </TabLayout>
        </>
    );
}