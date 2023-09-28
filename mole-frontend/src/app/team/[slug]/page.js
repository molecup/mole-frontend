import Container from '@mui/material/Container';

export default function TeamPage({params}){
    return(
        <Container>
            <h1>
                Squadra : {params.slug}
            </h1>
        </Container>
    );
}