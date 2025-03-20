import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Instagram } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TikTokIcon from "@/components/tiktokIcon";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "secondary.light",
        p: 6,
        py: 3,
        px: 2,
        mt: 'auto',
        marginTop: "20px",
        filter: "brightness(110%)"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary.contrastText" gutterBottom>
              Chi siamo
            </Typography>
            <Typography variant="body2" color="secondary.text">
            {"European Students League è una società con l'obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di tutta Italia"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary.contrastText" gutterBottom>
              Contatti
            </Typography>
            <Typography variant="body2" color="secondary.text">
              Via Don Giovanni Minzoni 14, Torino, 10121
            </Typography>
            <Typography variant="body2" color="secondary.text">
              Email: amministrazione@estudentsleague.com
            </Typography>
            <Typography variant="body2" color="secondary.text" sx={{display: "none"}}>
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} >
            <Typography variant="h6" color="secondary.contrastText" gutterBottom>
              Seguici
            </Typography>
            <Link
              href="https://www.instagram.com/molecup_torino/"
              color="inherit"
            >
              <Instagram sx={{mr:"7px"}} aria-label="Instagram"/>
            </Link>
            <Link
              href="https://www.tiktok.com/@molecup_torino"
              color="inherit"
            >
              <TikTokIcon />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href={process.env.NEXT_PUBLIC_URL}>
              European Students League
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}