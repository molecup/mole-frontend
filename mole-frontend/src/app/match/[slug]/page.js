import Container from '@mui/material/Container';

export default function MatchPage({params}){
    return(
        <Container>
            <h1>
                Partita : {params.slug}
            </h1>
        </Container>
    );
}