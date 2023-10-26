import Paper from '@mui/material/Paper';
import Stack from '@mui/system/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const capitalizeStyle = {
    textTransform: "capitalize"
}

export default function TeamHeader(props) {
    return (
        <Paper sx={{ margin: "10px", padding: "10px" }}>
            <Stack sx={{ alignItems: 'center' }}>
            <Avatar sx={{ width: 57, height: 57 }} alt={"logo " + props.name} src={props.img} />
            <Typography variant="h2">{props.name}</Typography>
            </Stack>
        </Paper>
    );
}