import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LoadingPage(){
    return(
        <Container>
            <Stack spacing={1}>
                <Skeleton variant="rounded" height="200px"/>
                <Stack direction="row" spacing={2} sx={{overflow: "hidden"}}>
                    <Skeleton variant="rounded" width="450px" height="100px" />
                    <Skeleton variant="rounded" width="450px" height="100px" />
                    <Skeleton variant="rounded" width="450px" height="100px" />
                </Stack>

                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                <Skeleton variant="rounded" height="150px" />

                <Stack direction="row" spacing={2} sx={{overflow: "hidden"}}>
                    <Skeleton variant="circular" height="100px" width="100px"/>
                    <Skeleton variant="circular" height="100px" width="100px"/>
                </Stack>

                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                <Skeleton variant="rounded" height="150px" />
            </Stack>
        </Container>
    );
}