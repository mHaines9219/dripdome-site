// theme.ts
import { createTheme } from '@mui/material/styles';

import '@fontsource/montserrat/400.css'; // Regular
import '@fontsource/montserrat/600.css'; // Semi-bold
import '@fontsource/montserrat/700.css'; // Bold
import '@fontsource/open-sans/400.css'; // Regular
import '@fontsource/shrikhand';
import '@fontsource/nova-mono';
import '@fontsource/quicksand';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', 'Open Sans', sans-serif",
    h1: {
      fontSize: '96px',
      fontWeight: 'bold',
      fontFamily: 'Shrikhand',
      lineHeight: 1.26,
      // '@media (max-width:600px)': {
      //   fontSize: '202px',
      // },
    },
    h2: {
      fontSize: '42px',
      fontWeight: 600,
      fontFamily: 'Shrikhand',
    },
    h3: {
      fontSize: '32px',
      fontWeight: 'bold',
      fontFamily: '',
      '@media (max-width:600px)': {
        fontSize: '16px',
      },
    },
    h4: {
      fontSize: '24px',
      fontWeight: 'semi-bold',
      fontFamily: 'Nova Mono',
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
      main: '#FCF5EC', // mainBrown
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
