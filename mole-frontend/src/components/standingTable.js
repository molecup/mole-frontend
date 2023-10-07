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
import Stack from '@mui/system/Stack';
//import Link from '@mui/material/Link';
import Link  from 'next/link';


const teamRanking = [
    {team: "Alfieri", points: 4, scored: 3, against: 1, victories: 2, draws: 0, losses: 0, img:'/alfieri.png'},
    {team: "Galfer", points: 1, scored: 1, against: 2, victories: 2, draws: 0, losses: 0, img:'/cattaneo.png'},
    {team: "Cattaneo", points: 1, scored: 2, against: 3, victories: 2, draws: 0, losses: 0, img:'/gobetti2022.png'},
];

const stickyColStyle = {
    position : 'sticky',
    left : 0,
}

const stickyColBorderStyle = {
}

export default function StandingTable(props){
    return(
        <TableContainer component={Paper} sx={{ maxWidth:700, marginTop: '10px', marginBottom: '10px' }}>
            <Toolbar sx={stickyColStyle}>
                <Typography variant='h5'>{props.title}</Typography>
            </Toolbar>
            <Table aria-label={"Classifica gironi - "+props.title} size={props.small ? "small" : "normal"}>
                <TableHead >
                    <TableRow sx={{height: "10px"}}>
                        <TableCell align="left" sx={stickyColStyle}>Squadra</TableCell>
                        <TableCell align="right">Pt</TableCell>
                        <TableCell align="right">PG</TableCell>
                        <TableCell align="right">V</TableCell>
                        <TableCell align="right">P</TableCell>
                        <TableCell align="right">S</TableCell>
                        <TableCell align="right">GF</TableCell>
                        <TableCell align="right">GS</TableCell>
                        <TableCell align="right">DR</TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                {teamRanking.sort((entry) => entry.points).map((entry, i) =>
                    <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{...stickyColStyle, ...stickyColBorderStyle, background : "white"}} component="th" scope="row" elevation={2}>
                            <Stack direction="row" spacing={1}>
                                <p>{i + 1}</p>
                                <Avatar sx={{ width: 24, height: 24 }} alt={entry.team + " icon"} src={entry.img} />
                                <p>{entry.team}</p>
                            </Stack>
                        </TableCell>
                        <TableCell align="right">{entry.points}</TableCell>
                        <TableCell align="right">{entry.victories + entry.losses + entry.draws}</TableCell>
                        <TableCell align="right">{entry.victories}</TableCell>
                        <TableCell align="right">{entry.draws}</TableCell>
                        <TableCell align="right">{entry.losses}</TableCell>
                        <TableCell align="right">{entry.scored}</TableCell>
                        <TableCell align="right">{entry.against}</TableCell>
                        <TableCell align="right">{entry.scored - entry.against}</TableCell>

                    </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}