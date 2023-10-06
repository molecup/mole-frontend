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


const matches = [
  {id:"1", title:"Maj - Daz", description:"Questo è un esempio di partita. Bal bla bla bla", datetime:"20/10 21:30", img:matchImg, initial:false},
  {id:"2", title:"Alf - Cat", description:"Questo è un esempio di partita. Bal bla bla bla", datetime:"20/10 20:00", img:matchImg, initial:false},
  {id:"3", title:"Gio - Maj", description:"Questo è un esempio di partita. Bal bla bla bla", datetime:"27/10 21:30", img:matchImg, initial:false},
  {id:"4", title:"Cat - Gal", description:"Questo è un esempio di partita. Prima partita", datetime:"27/10 20:00", img:matchImg, initial:true},
  {id:"5", title:"Gio - Daz", description:"Questo è un esempio di partita. Bal bla bla bla", datetime:"2/11 21:30", img:matchImg, initial:false},
  {id:"6", title:"Gal - Alf", description:"Questo è un esempio di partita. Bal bla bla bla", datetime:"2/11 20:00", img:matchImg, initial:false},
  {id:"7", title:"Daz - Maj", description:"Questo è un esempio di partita. Bal bla bla bla", datetime:"9/11 21:30", img:matchImg, initial:false},

];

const teams = [
  {id:"alf", name:"Alfieri", img:alfieriImg},
  {id:"gob", name:"Gobetti", img:gobettiImg},
  {id:"cat", name:"Cattaneo", img:cattaneoImg},
  {id:"gob22", name:"Gobetti", img:gobetti22Img},
  {id:"avo", name:"Avogadro", img:avogadroImg},
  {id:"cav", name:"Cavour", img:cavourImg},
  {id:"conv", name:"Covitto", img:convittoImg},
  {id:"daze", name:"Dazeglio", img:dazeImg},
  {id:"majo", name:"Majorana", img:majoImg},
];
const firstTeam = Math.round(teams.length / 2) - 2;

export default function Home() {
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
      <CardSlider>
        {teams.map((team, i) =>
          <TeamCard
            key={team.id}
            img={team.img}
            url={'/team/' + team.id}
            initial={i === firstTeam}
            name={team.name}
          />
        )}
      </CardSlider>
      <Typography variant='h2' align='center' gutterBottom>Le partite</Typography>
      <CardSlider>
        {matches.map((match, i) =>
          <MatchCard 
            key = {match.id}
            img = {match.img}
            url = {'/match/' + match.id}
            initial = {match.initial}
            title = {match.title}
            description = {match.description}
            datetime = {match.datetime}
          />
        )}
      </CardSlider>
      <Container sx={{marginTop:"10px", marginBottom:"10px"}}>
        <StandingTable title="Girone A"/>
        <StandingTable title="Girone B"/>
        <StandingTable title="Girone C"/>
      </Container>
    </>
  )
}
