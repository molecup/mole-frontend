import MatchHeader from '@/components/matchHeader';
import PlayerList from '@/components/playerList';

const dataExample = {
    teamA : {
        name : "Alfieri",
        short : "alf",
        img : "/alfieri.png"
    },
    teamB : {
        name : "Cattaneo",
        short : "cat",
        img : "/cattaneo.png"
    },
    score : [0, 1],
    time : "20:30",
    date : "20 ottobre 2023",
    league : "girone a"
}

export default function MatchPage({params}){
    let scoreText = dataExample.time;
    if (dataExample.score !== undefined){
        scoreText = dataExample.score[0] + " - " + dataExample.score[1];
    }
    return(
        <>
            <MatchHeader 
                teamA = {dataExample.teamA}
                teamB = {dataExample.teamB}
                scoreText = {scoreText}
                league = {dataExample.league}
                date = {dataExample.date}
            />
        </>
    );
}