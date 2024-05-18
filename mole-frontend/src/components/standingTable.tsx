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
import manualTableTree from '@/public/static/tabellone-quarti.webp';


const stickyColStyle = {
    position : 'sticky',
    left : 0,
}

const stickyColBorderStyle = {
}

export default function StandingTable({title, teamRanks, treeImg, type="group", ...props} : {title : string, teamRanks? : teamRankInterface[], treeImg?: imgFormatsInterface, type?: "group" | "elimination", small? : boolean }){
    if(type=="group"  && teamRanks){
        return LeagueTable({title: title, teamRanks: teamRanks, small:props.small})
    }
    return TableTree({title:title, treeImg:treeImg, ...props})
}

export function LeagueTable({title, teamRanks, ...props} : {title : string, teamRanks : teamRankInterface[], small? : boolean }){
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
                {teamRanks.sort((entry : teamRankInterface) => entry.pts).map((entry : teamRankInterface, i : number) =>
                    <TableRow
                        key={entry.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{...stickyColStyle, ...stickyColBorderStyle, bgcolor: 'background.paper'}} component="th" scope="row">
                            <Stack direction="row" spacing={1}>
                                <p>{i + 1}</p>
                                <Avatar href={"/team/"+entry.slug} component={Link} sx={{ width: 24, height: 24, bgcolor:"inherit"}} variant="rounded" >
                                    <Image alt={`${entry.name} logo`} src={stableImg(entry.logo, "thumbnail")}  width="24" height="24" style={{objectFit: "contain"}} />
                                </Avatar>
                                <Link href={"/team/"+entry.slug}><Typography color="primary.main" textTransform="capitalize" sx={{textDecoration: "underline", textDecorationColor: "primary.main"}}>{entry.short}</Typography></Link>
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

export function StandingTables({teamLeagues: standings}: any){
    let finalPhaseUsed = false
    if(!standings || !Array.isArray(standings)){
        return (<Typography>Nessun girone trovato</Typography>)
    }
    return(
        <>
        {standings.map((table : {teams : teamRankInterface[], name : string, type:"group" | "elimination", treeTable?: imgFormatsInterface}, i : number) => {
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