import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/cards';
import matchImg from "@/components/static_media/match_placeholder.jpg";

export default function Home() {
  return (
    <>
      <h2>Le partite</h2>
      <CardSlider>
        <MatchCard
          key={1}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={2}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={3}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={4}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />
        <MatchCard
          key={5}
          title = "Alf -Cat"
          description = "Questo è un esempio di partita"
          url = "/news"
          img = {matchImg}
          datetime = "20:30 12/10"
        />  
      </CardSlider>
    </>
  )
}
