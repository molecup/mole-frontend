'use client'
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { Typography } from "@mui/material";
import { useCookies } from 'react-cookie'

export default function CookiesSnackbar(){
    const [cookies, setCookie, removeCookie] = useCookies(['cookies-accepted'])
    const [open, setOpen] = useState(!cookies["cookies-accepted"]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        // set a cookie for 120 days (10368000 seconds)
        setCookie('cookies-accepted', true, { path: '/', maxAge: 10368000, domain: process.env.NEXT_PUBLIC_HOSTNAME});
        console.log("Cookies accepted");
        setOpen(false);
    };

    const action = (
        <>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </>
    );

    const message = (
        <>
        <Typography variant="body1">
        {"Questo sito utilizza cookies, anche di terze parti, per migliorare il servizio offerto. \
        Proseguendo nella navigazione del sito, acconsenti alle modalità d'uso dei cookie."}
        <Typography sx={{marginLeft: "2pt"}} component="a" href="/cookie-policy" variant="body2" color="secondary.contrastText">Ulteriori informazioni</Typography>
        </Typography>
        </>
    );

    return(
        <Snackbar
        open={open}
        onClose={handleClose}
        message={message}
        action={action}
        />
    );
}
