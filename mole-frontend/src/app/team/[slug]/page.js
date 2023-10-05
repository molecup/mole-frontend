import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function TeamPage({params}){
    return(
        <Container>
            <Typography variant='h2' align='center'>
                Squadra : {params.slug}
            </Typography>
        </Container>
    );
}