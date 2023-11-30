import {Antonio, Cabin, Roboto } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const cabin = Cabin({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const antonio = Antonio({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      // main: '#4963F4',
      // main : '#EC1E4E',
      main: '#EB1E4D',
    },
    secondary: {
      main: "#4B4E59",
    },
    mode: 'light',
  },
  typography: {
    fontFamily: antonio.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
    MuiTableContainer:{
      styleOverrides: {
        root: () => ({
          "& .MuiTableCell-head": {
            backgroundColor: theme.palette.secondary.main,
            color : theme.palette.secondary.contrastText,
            fontWeight: 600,
          },
          "& .MuiToolbar-root": {
            backgroundColor: theme.palette.primary.main,
            color : theme.palette.primary.contrastText,
          }
        })
      }
    }
  },
  
}));

export default theme;