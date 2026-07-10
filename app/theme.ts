// theme.ts
import { createTheme } from '@mui/material/styles';
import { ACCENT, INK, PAPER } from '@/lib/theme';

/**
 * Neobrutalist app colors.
 */
export const APP_COLORS = {
  /** Used for page backgrounds and surfaces */
  surface: PAPER,
  /** Used for all text/icons */
  ink: INK,
  /** Used for buttons/links/highlights */
  accent: ACCENT,
} as const;

const FONT_FALLBACK =
  "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

// Loaded in app/layout.tsx via next/font (Archivo Black + Space Grotesk)
const DISPLAY_FONT = `var(--font-display), ${FONT_FALLBACK}`;
const BODY_FONT = `var(--font-body), ${FONT_FALLBACK}`;

const theme = createTheme({
  shape: {
    // Neobrutalism: no rounded corners, anywhere.
    borderRadius: 0,
  },
  typography: {
    fontFamily: BODY_FONT,

    // Titles (h1-h6). Archivo Black ships a single 400 weight; explicit
    // bold would only faux-bold it, so headings pin weight to 400.
    h1: { fontFamily: DISPLAY_FONT, fontWeight: 400, textTransform: 'uppercase' },
    h2: { fontFamily: DISPLAY_FONT, fontWeight: 400, textTransform: 'uppercase' },
    h3: { fontFamily: DISPLAY_FONT, fontWeight: 400, textTransform: 'uppercase' },
    h4: { fontFamily: DISPLAY_FONT, fontWeight: 400, textTransform: 'uppercase' },
    h5: { fontFamily: DISPLAY_FONT, fontWeight: 400 },
    h6: { fontFamily: DISPLAY_FONT, fontWeight: 400 },

    // Subheaders + paragraphs
    subtitle1: { fontFamily: BODY_FONT },
    subtitle2: { fontFamily: BODY_FONT },
    body1: { fontFamily: BODY_FONT },
    body2: { fontFamily: BODY_FONT },
    button: { fontFamily: BODY_FONT, fontWeight: 700, letterSpacing: '0.04em' },
  },
  palette: {
    primary: {
      main: INK,
    },
    secondary: {
      main: ACCENT,
    },
    background: {
      default: PAPER,
      paper: PAPER,
    },
    text: {
      primary: INK,
      secondary: '#3D3A33',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          '&:first-of-type': { borderRadius: 0 },
          '&:last-of-type': { borderRadius: 0 },
        },
      },
    },
  },
});

export default theme;
