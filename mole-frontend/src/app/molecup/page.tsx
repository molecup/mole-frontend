import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/matchCard';
import TeamCard from '@/components/teamCard';
import Typography from '@mui/material/Typography';
import StandingTable from '@/components/standingTable';
import Container from '@mui/material/Container';

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


const firstTeam = Math.round(teams.length / 2) - 2;

export default function MoleCup() {
  return (
    <>
      <CardSlider>
        {teams.map((team, i) =>
          <TeamCard
            key={team.id}
            img={team.img}
            url={'/team/' + team.id}
            initial={i === firstTeam}
            name={team.name}
            noTitle
          />
        )}
      </CardSlider>
      <Typography variant='h2' align='center' gutterBottom>Le partite</Typography>
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
            scoreText={match.score ? match.score[0] + " - " + match.score[1] : "-"}
          />
        )}
      </CardSlider>
      <Container sx={{ marginTop: "10px", marginBottom: "10px" }}>
        <StandingTable title="Girone A" />
        <StandingTable title="Girone B" />
        <StandingTable title="Girone C" />
      </Container>
    </>
  )
}
