import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/matchCard';
import TeamCard from '@/components/teamCard';
import Typography from '@mui/material/Typography';

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
        {[...Array(10)].map((x, i) =>
          <MatchCard 
            key = {i}
            img = {matchImg}
            url = {'/match/' + i}
            initial = {i == 3}
            title = {i == 3? "Initial" : "Maj - Daz " + i}
            description = "Questo è un esempio di partita. Bal bla bla bla"
            datetime = "20:30 12/10"
          />
        )}
      </CardSlider>
    </>
  )
}
