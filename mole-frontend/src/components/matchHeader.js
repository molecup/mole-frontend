import Paper from '@mui/material/Paper';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Chip from '@mui/material/Chip';

const capitalizeStyle = {
    textTransform: "capitalize",
    textDecoration: "none",
}

export default function MatchHeader(props) {
    const teamALink = "/team/" + props.teamA.id;
    const teamBLink = "/team/" + props.teamB.id;
    return (
        <Paper sx={{ margin: "10px", padding: "10px" }}>
            <Stack sx={{ alignItems: 'center' }}>
                <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }} spacing={2}>
                    <Avatar sx={{ width: 57, height: 57 }} href={teamALink} component={Link} alt={"logo " + props.teamA.name} src={props.teamA.img}/>
                    <Typography variant="h2" color="primary" sx={capitalizeStyle} href={teamALink} component={Link}>{props.teamA.short}</Typography>
                    <Typography variant="h3">{props.scoreText}</Typography>
                    <Typography variant="h2" color="primary" sx={capitalizeStyle} href={teamBLink} component={Link}>{props.teamB.short}</Typography>
                    <Avatar sx={{ width: 57, height: 57 }} href={teamBLink} component={Link} alt={"logo " + props.teamB.name} src={props.teamB.img} />
                </Stack>
                <Typography variant="overline" sx={{ textAlign: "center" }}>{props.league}</Typography>
                <Typography variant="h5" sx={{ textAlign: "center", ...capitalizeStyle }} gutterBottom>{props.date}</Typography>
                <Button variant="contained" sx={{ width: '60%' }}>Registrati</Button>
            </Stack>
        </Paper>
    );
}
