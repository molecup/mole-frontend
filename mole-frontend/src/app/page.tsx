import CardSlider from '@/components/cardSlider';
import MatchCard from '@/components/cards';
import matchImg from "@/components/static_media/match_placeholder.jpg";


export default function Home() {
  return (
    <>
      <h2>Le partite</h2>
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
