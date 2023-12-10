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
import Link from 'next/link';
import { imgFormatsInterface, teamRank } from '@/lib/commonInterfaces';
import outImg from '@/lib/outImg';

/*
const teamRanking = [
    {id: "alf", name: "Alfieri", points: 4, scored: 3, against: 1, victories: 2, draws: 0, losses: 0, img:'/alfieri.png'},
    {id: "gal", name: "Galfer", points: 1, scored: 1, against: 2, victories: 2, draws: 0, losses: 0, img:'/cattaneo.png'},
    {id: "cat", name: "Cattaneo", points: 1, scored: 2, against: 3, victories: 2, draws: 0, losses: 0, img:'/gobetti2022.png'},
];
*/

const stickyColStyle = {
    position : 'sticky',
    left : 0,
}

const stickyColBorderStyle = {
}



export default function StandingTable({title, teamRanks, ...props} : {title : string, teamRanks : teamRank[], small? : boolean }){
    return(
        <TableContainer component={Paper} sx={{ maxWidth:700, marginTop: '10px', marginBottom: '10px' }}>
            <Toolbar sx={stickyColStyle}>
                <Typography variant='h5'>{title}</Typography>
            </Toolbar>
            <Table aria-label={"Classifica gironi - "+title} size={props.small ? "small" : "medium"}>
                <TableHead>
                    <TableRow>
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
                {teamRanks.sort((entry : teamRank) => entry.pts).map((entry : teamRank, i : number) =>
                    <TableRow
                        key={entry.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{...stickyColStyle, ...stickyColBorderStyle, bgcolor: 'background.paper'}} component="th" scope="row">
                            <Stack direction="row" spacing={1}>
                                <p>{i + 1}</p>
                                <Avatar href={"/team/"+entry.slug} component={Link} sx={{ width: 24, height: 24 }} alt={entry.name + " icon"} src={outImg(entry.logo?.formats.thumbnail.url)} />
                                <Link href={"/team/"+entry.slug}>{entry.name}</Link>
                            </Stack>
                        </TableCell>
                        <TableCell align="right">{entry.pts}</TableCell>
                        <TableCell align="right">{entry.mp}</TableCell>
                        <TableCell align="right">{entry.w}</TableCell>
                        <TableCell align="right">{entry.t}</TableCell>
                        <TableCell align="right">{entry.l}</TableCell>
                        <TableCell align="right">{entry.gs}</TableCell>
                        <TableCell align="right">{entry.gt}</TableCell>
                        <TableCell align="right">{entry.gs - entry.gt}</TableCell>

                    </TableRow>
                )}
                {(teamRanks.length == 0) && <TableCell align="center" colSpan={4}>Nessuna squadra presente</TableCell>}
                </TableBody>
                
            </Table>
            
        </TableContainer>
    );
}