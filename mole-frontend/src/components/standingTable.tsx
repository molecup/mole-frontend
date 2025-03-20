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
import { imgFormatsInterface, teamRankInterface } from '@/lib/commonInterfaces';
import { stableImg } from '@/lib/outImg';
import Image from "@/components/image";
import Box from '@mui/material/Box';
import manualTableTree from '@/public/static/tabellone-semi.webp';


const stickyColStyle = {
    position : 'sticky',
    left : 0,
}

const stickyColBorderStyle = {
}

export default function StandingTable({title, teamRanks, treeImg, type="group", teamUrlRoot, ...props} : {title : string, teamRanks? : teamRankInterface[], treeImg?: imgFormatsInterface, type?: "group" | "elimination", small? : boolean, teamUrlRoot: string}){
    if(type=="group"  && teamRanks){
        return LeagueTable({title: title, teamRanks: teamRanks, small:props.small, teamUrlRoot: teamUrlRoot})
    }
    return TableTree({title:title, treeImg:treeImg, ...props})
}

export function LeagueTable({title, teamRanks, teamUrlRoot, ...props} : {title : string, teamRanks : teamRankInterface[], small? : boolean, teamUrlRoot: string}) {
    return(
        <TableContainer component={Paper} sx={{ maxWidth:700, marginTop: '10px', marginBottom: '10px' }}>
            <Toolbar sx={stickyColStyle}>
                <Typography variant='h5' textTransform='capitalize'>{title}</Typography>
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
                {teamRanks.sort((entry : teamRankInterface) => entry.pts).map((entry : teamRankInterface, i : number) =>
                    <TableRow
                        key={entry.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{...stickyColStyle, ...stickyColBorderStyle, bgcolor: 'background.paper'}} component="th" scope="row">
                            <Stack direction="row" spacing={1}>
                                <p>{i + 1}</p>
                                <Avatar href={teamUrlRoot+entry.team.data.attributes.team.data.attributes.slug} component={Link} sx={{ width: 24, height: 24, bgcolor:"inherit"}} variant="rounded" >
                                    <Image alt={`${entry.team.data.attributes.team?.data.attributes.name} logo`} src={stableImg(entry.team.data.attributes.team?.data.attributes.logo?.data?.attributes, "thumbnail")}  width="24" height="24" style={{objectFit: "contain"}} />
                                </Avatar>
                                <Link href={teamUrlRoot+entry.team.data.attributes.team.data.attributes.slug}><Typography color="primary.main" textTransform="capitalize" sx={{textDecoration: "underline", textDecorationColor: "primary.main"}}>{entry.team.data.attributes.team?.data.attributes.short}</Typography></Link>
                            </Stack>
                        </TableCell>
                        <TableCell align="right">{entry.pts}</TableCell>
                        <TableCell align="right">{entry.played}</TableCell>
                        <TableCell align="right">{entry.wins}</TableCell>
                        <TableCell align="right">{entry.draws}</TableCell>
                        <TableCell align="right">{entry.losses}</TableCell>
                        <TableCell align="right">{entry.goal_scored}</TableCell>
                        <TableCell align="right">{entry.goal_taken}</TableCell>
                        <TableCell align="right">{entry.goal_scored - entry.goal_taken}</TableCell>

                    </TableRow>
                )}
                {(teamRanks.length == 0) && <TableRow><TableCell align="center" colSpan={4}>Nessuna squadra presente</TableCell></TableRow>}
                </TableBody>
                
            </Table>
            
        </TableContainer>
    );
}

function TableTree({title, treeImg} : {title:string, treeImg?: imgFormatsInterface}){
    const imgUrl = stableImg(treeImg, "medium", manualTableTree);
    return(
        <Paper sx={{maxWidth:700, marginTop: '10px', marginBottom: '10px', width:"100%" }}>
            <Toolbar sx={{borderRadius: "4px 4px 0 0"}}>
                <Typography variant='h5'>{title}</Typography>
            </Toolbar>
            <Box sx={{height:"300px"}}>
                <div style={{ position: 'relative', width: '100%', height: '100%', opacity: 0.9 }}>
                    <Image alt="Final phase tree table" src={imgUrl} fill={true} blurDataURL={treeImg?.placeholder} placeholder="blur" style={{ objectFit: "contain" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw" />
                </div>
            </Box>
        </Paper>
    )
}

export function StandingTables({teamLeagues: standings, teamUrlRoot}: { teamUrlRoot: string, teamLeagues: {teams : teamRankInterface[], name : string, type:"group" | "elimination", treeTable?: imgFormatsInterface}[]}){
    let finalPhaseUsed = false
    if(!standings || !Array.isArray(standings)){
        return (<Typography>Nessun girone trovato</Typography>)
    }
    return(
        <>
        {standings.map((table, i : number) => {
            const title = table.type=="group" ? table.name : "Fasi Finali"
            let showTable = true
            if(table.type == "elimination"){
                if(finalPhaseUsed){
                    showTable = false
                }
                finalPhaseUsed = true
            }
            return(
                showTable && <StandingTable 
                teamUrlRoot={teamUrlRoot}
                key = {i}
                title = {title}
                teamRanks = {table.teams}
                type= {table.type}
                treeImg={table.treeTable}
                small
                />
            )
        }
        )}
        </>
    )
}