import MatchHeader from '@/components/matchHeader';
import MatchTabs from './tabs';

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

const dataExample = {
    teamA : {
        name : "Alfieri",
        short : "alf",
        img : "/alfieri.png",
        playerList: playerList,
    },
    teamB : {
        name : "Cattaneo",
        short : "cat",
        img : "/cattaneo.png",
        playerList: playerList,
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
            <MatchTabs
                teamA = {dataExample.teamA}
                teamB = {dataExample.teamB}
            />
        </>
    );
}

