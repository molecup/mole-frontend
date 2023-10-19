import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PlayerList from '@/components/playerList';

const playerList = [
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "2", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "7", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Gianferdinando", lastName: "Verdi", number: "8", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},
    {firstName: "Giacomo", lastName: "Rossi", number: "10", img: null},

];

export default function TeamPage({params}){
    return(
        <>
            <Typography variant='h2' align='center'>
                Squadra : {params.slug}
            </Typography>
            <PlayerList playerList={playerList}/>
        </>
    );
}