'use client' // Error components must be Client Components
 
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container/Container';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

  
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Container sx={{textAlign : 'center', minHeight:"40vh"}}>
        <h1>Qualcosa è andato storto!</h1>
        <SentimentVeryDissatisfiedIcon />
        <p>Il contenuto che stai cercando ha generato un errore. Riprova più tardi</p>
        <Button 
          variant='contained'  
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Riprova
        </Button>
    </Container>
  )
}