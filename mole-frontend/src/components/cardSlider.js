import react from 'react';
import MatchCard from '@/components/cards';

import matchImg from "@/components/static_media/match_placeholder.jpg";

export default function CardSlider(){
  return(
    <>
      <MatchCard
        title = "Alf -Cat"
        description = "Questo è un esempio di partita"
        url = "/news"
        img = {matchImg}
        datetime = "20:30 12/10"
      />
    </>
  );
}