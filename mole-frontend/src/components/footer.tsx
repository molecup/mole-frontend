import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import Box from "@mui/material/Box";

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
        marginTop: "20px"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary.contrastText" gutterBottom>
              Chi siamo
            </Typography>
            <Typography variant="body2" color="secondary.text">
            {"Mole Cup è un'associazione nata nel 2017 con l'obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di Torino"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary.contrastText" gutterBottom>
              Contatti
            </Typography>
            <Typography variant="body2" color="secondary.text">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="secondary.text">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="secondary.text">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="secondary.contrastText" gutterBottom>
              Seguici
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://molecup.com/">
              Mole cup
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}