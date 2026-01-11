// app/theme.ts
import { createTheme } from "@mui/material/styles";

/**
 * App colors (ONLY 3).
 * Replace these with your real brand values.
 */
export const APP_COLORS = {
  /** Used for page backgrounds and surfaces */
  surface: "#FFFFFF",
  /** Used for all text/icons */
  ink: "#111111",
  /** Used for buttons/links/highlights */
  accent: "#FF00AA",
} as const;

// Optional: keep font imports here if you're using them app-wide
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/shrikhand";
import "@fontsource/nova-mono";
import "@fontsource/quicksand";

const theme = createTheme({
  typography: {
    // Placeholder typography; adjust freely.
    fontFamily: "'Montserrat', 'Open Sans', sans-serif",
    h1: { fontFamily: "Shrikhand" },
    h2: { fontFamily: "Shrikhand" },
    h3: { fontFamily: "Shrikhand" },
    h4: { fontFamily: "Nova Mono" },
    body1: { fontFamily: "Open Sans" },
    body2: { fontFamily: "Open Sans" },
  },

  /**
   * Palette fields are derived from the 3 base colors above.
   * No extra hex values should be introduced here.
   */
  palette: {
    // Treat "accent" as your MUI primary color.
    primary: { main: APP_COLORS.accent },
    // Secondary can point at the same accent (or you can swap usage in components).
    secondary: { main: APP_COLORS.accent },

    background: {
      default: APP_COLORS.surface,
      paper: APP_COLORS.surface,
    },

    text: {
      primary: APP_COLORS.ink,
      secondary: APP_COLORS.ink,
    },

    divider: APP_COLORS.ink,
  },

  // Scaffold for future component-level styling.
  components: {},
});

export default theme;
