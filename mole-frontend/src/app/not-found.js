import Link from 'next/link';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
 
export default function NotFound() {
  return (
    <Container sx={{textAlign : 'center'}}>
        <h1>Pagina non trovata</h1>
        <SentimentVeryDissatisfiedIcon />
        <p>Il contenuto che stai cercando non esiste o è stato rimosso</p>
        <Button variant='contained' component={Link} href="/" >Pagina principale</Button>
    </Container>
  )
}