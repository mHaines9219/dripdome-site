// theme.ts
import { createTheme } from '@mui/material/styles';

import '@fontsource/montserrat/400.css'; // Regular
import '@fontsource/montserrat/600.css'; // Semi-bold
import '@fontsource/montserrat/700.css'; // Bold
import '@fontsource/open-sans/400.css'; // Regular

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', 'Open Sans', sans-serif",
    h1: {
      fontSize: '96px',
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      lineHeight: 1.26,
      '@media (max-width:600px)': {
        fontSize: '22px',
      },
    },
    h2: {
      fontSize: '42px',
      fontWeight: 600,
      fontFamily: 'Montserrat',
    },
    h3: {
      fontSize: '32px',
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      '@media (max-width:600px)': {
        fontSize: '16px',
      },
    },
    h4: {
      fontSize: '24px',
      fontWeight: 'semi-bold',
      fontFamily: 'Montserrat',
      '@media (max-width:600px)': {
        fontSize: '14px',
      },
    },
    body1: {
      fontSize: '24px',
      fontWeight: 400,
      fontFamily: 'Open Sans',
      '@media (max-width:600px)': {
        fontSize: '14px',
      },
    },
    body2: {
      fontSize: '24px',
      fontWeight: 400,
      fontFamily: 'Open Sans',
      '@media (max-width:600px)': {
        fontSize: '12px',
      },
    },
  },
  palette: {
    primary: {
      main: '#391e0c', // mainBrown
    },
    secondary: {
      main: '#DD9F28', // mainGold
    },

    background: {
      default: '#FCF5EC', // mainWhite
    },
    text: {
      primary: '#391E0C', // mainBrown
      secondary: '#DD9F28', // mainGold
    },
  },
});

export default theme;
