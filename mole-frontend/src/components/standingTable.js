import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const teamRanking = [
    {team: "Alfieri", points: 4, scored: 3, against: 1, played: 2, img:'/alfieri.png'},
    {team: "Galfer", points: 1, scored: 1, against: 2, played: 2, img:'/cattaneo.png'},
    {team: "Cattaneo", points: 1, scored: 2, against: 3, played: 2, img:'/gobetti2022.png'},
];

export default function StandingTable(props){
    return(
        <TableContainer component={Paper} sx={{ maxWidth: 700, marginTop: '10px', marginBottom: '10px' }}>
            <Toolbar color='primary'>
                <Typography variant='h5'>{props.title}</Typography>
            </Toolbar>
            <Table sx={{ minWidth: 180 }} aria-label="Standing Table">
                <TableHead >
                    <TableRow sx={{height: "10px"}}>
                        <TableCell align="left" colSpan={3}>Squadra</TableCell>
                        <TableCell align="right">Pt</TableCell>
                        <TableCell align="right">DR</TableCell>
                        <TableCell align="right">GS</TableCell>
                        <TableCell align="right">PG</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {teamRanking.sort((entry) => entry.points).map((entry, i) =>
                    <TableRow
                        key={entry.team}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="right">
                            {i + 1}
                        </TableCell>
                        <TableCell padding="none"><Avatar sx={{ width: 24, height: 24 }} alt={entry.team + " icon"} src={entry.img} /></TableCell>
                        <TableCell>{entry.team}</TableCell>
                        <TableCell align="right">{entry.points}</TableCell>
                        <TableCell align="right">{entry.scored - entry.against}</TableCell>
                        <TableCell align="right">{entry.scored}</TableCell>
                        <TableCell align="right">{entry.played}</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}