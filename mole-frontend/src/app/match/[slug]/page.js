import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
    category : "girone a"
}

const capitalizeStyle = {
    textTransform: "capitalize"
}

export default function MatchPage({params, props}){
    let scoreText = dataExample.time;
    if (dataExample.score !== undefined){
        scoreText = dataExample.score[0] + " - " + dataExample.score[1];
    }
    return(
        <>
            <Paper sx={{margin : "10px", padding: "10px"}}>
                <Stack>
                    <Stack direction="row" sx={{justifyContent:"center", alignItems: "center"}} spacing={2}>
                        <Avatar sx={{ width: 57, height: 57 }} alt={"logo " + dataExample.teamA.name} src={dataExample.teamA.img} />
                        <Typography variant="h2" sx={capitalizeStyle}>{dataExample.teamA.short}</Typography>
                        <Typography variant="h3" sx={capitalizeStyle}>{scoreText}</Typography>
                        <Typography variant="h2" sx={capitalizeStyle}>{dataExample.teamB.short}</Typography>
                        <Avatar sx={{ width: 57, height: 57 }} alt={"logo " + dataExample.teamB.name} src={dataExample.teamB.img} />
                    </Stack>
                    <Typography variant="overline" sx={{textAlign : "center"}}>{dataExample.category}</Typography>
                    <Typography variant="h5" sx={{textAlign : "center", ...capitalizeStyle}}>{dataExample.date}</Typography>
                </Stack>
            </Paper>
        </>
    );
}