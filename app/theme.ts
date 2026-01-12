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

const FONT_FALLBACK =
  "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

const theme = createTheme({
  typography: {
    // Loaded in app/layout.tsx via Google Fonts <link> tags
    fontFamily: `'Source Sans 3', ${FONT_FALLBACK}`,

    // Titles (h1-h6)
    h1: { fontFamily: `'Zalando Sans Expanded', ${FONT_FALLBACK}` },
    h2: { fontFamily: `'Zalando Sans Expanded', ${FONT_FALLBACK}` },
    h3: { fontFamily: `'Zalando Sans Expanded', ${FONT_FALLBACK}` },
    h4: { fontFamily: `'Zalando Sans Expanded', ${FONT_FALLBACK}` },
    h5: { fontFamily: `'Zalando Sans Expanded', ${FONT_FALLBACK}` },
    h6: { fontFamily: `'Zalando Sans Expanded', ${FONT_FALLBACK}` },

    // Subheaders + paragraphs
    subtitle1: { fontFamily: `'Source Sans 3', ${FONT_FALLBACK}` },
    subtitle2: { fontFamily: `'Source Sans 3', ${FONT_FALLBACK}` },
    body1: { fontFamily: `'Source Sans 3', ${FONT_FALLBACK}` },
    body2: { fontFamily: `'Source Sans 3', ${FONT_FALLBACK}` },
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
