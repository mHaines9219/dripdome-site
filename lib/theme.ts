/**
 * DripDome neobrutalist design tokens.
 *
 * The system: flat saturated color, thick ink borders, hard offset shadows
 * (zero blur), zero border radius, and press-down button mechanics.
 * No gradients anywhere.
 */

/** Near-black used for text, borders, and dark section backgrounds. */
export const INK = "#111111";
/** Warm bone paper used for page/section backgrounds. */
export const PAPER = "#F3EDE2";
/** Card surface color on paper backgrounds. */
export const SURFACE = "#ff9966";
/** Light Tiffany blue. Flat only, never in a gradient. */
export const ACCENT = "#81D8D0";
/** Safety orange. Use sparingly: tags, hovers, one accent word per page. */
export const POP = "#FF5C00";

/** Standard borders. Thick = cards/buttons/inputs, thin = small UI. */
export const NB_BORDER = `3px solid ${INK}`;
export const NB_BORDER_THIN = `2px solid ${INK}`;

/** Hard offset shadow, zero blur. Pass PAPER or ACCENT for dark backgrounds. */
export const nbShadow = (px = 4, color: string = INK) =>
  `${px}px ${px}px 0 0 ${color}`;

/** Card on a light background: white surface, ink border, hard shadow. */
export const NB_CARD_SX = {
  bgcolor: SURFACE,
  border: NB_BORDER,
  borderRadius: 0,
  boxShadow: nbShadow(8),
} as const;

/** Card on a dark (ink) background: ink surface, paper border, accent shadow. */
export const NB_CARD_DARK_SX = {
  bgcolor: INK,
  border: `3px solid ${PAPER}`,
  borderRadius: 0,
  boxShadow: nbShadow(8, ACCENT),
} as const;

/** Primary CTA: flat Tiffany blue, ink border, hard shadow, press-down mechanics. */
export const NB_BUTTON_SX = {
  bgcolor: ACCENT,
  color: INK,
  border: NB_BORDER,
  borderRadius: 0,
  boxShadow: nbShadow(4),
  fontWeight: 700,
  textTransform: "uppercase",
  transition: "transform 120ms ease, box-shadow 120ms ease",
  "&:hover": {
    bgcolor: ACCENT,
    transform: "translate(-2px, -2px)",
    boxShadow: nbShadow(6),
  },
  "&:active": {
    transform: "translate(2px, 2px)",
    boxShadow: nbShadow(0),
  },
} as const;

/** Secondary button on dark backgrounds: transparent, paper border/shadow. */
export const NB_BUTTON_OUTLINE_DARK_SX = {
  bgcolor: "transparent",
  color: PAPER,
  border: `3px solid ${PAPER}`,
  borderRadius: 0,
  boxShadow: nbShadow(4, PAPER),
  fontWeight: 700,
  textTransform: "uppercase",
  transition: "transform 120ms ease, box-shadow 120ms ease",
  "&:hover": {
    bgcolor: "transparent",
    borderColor: ACCENT,
    color: ACCENT,
    transform: "translate(-2px, -2px)",
    boxShadow: nbShadow(6, ACCENT),
  },
  "&:active": {
    transform: "translate(2px, 2px)",
    boxShadow: nbShadow(0, PAPER),
  },
} as const;

/** Small square tag/badge on dark backgrounds. */
export const NB_TAG_DARK_SX = {
  px: 1.5,
  py: 0.5,
  border: `2px solid ${PAPER}`,
  borderRadius: 0,
  bgcolor: INK,
  color: PAPER,
  boxShadow: nbShadow(3, ACCENT),
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
} as const;

/* ------------------------------------------------------------------ */
/* Legacy names kept so existing imports keep compiling.               */
/* They now resolve to flat neobrutalist styles: no gradients remain.  */
/* ------------------------------------------------------------------ */

export const BRAND_ACCENT = ACCENT;
export const BRAND_ACCENT_DEEP = POP;

/** Flat accent. Still valid anywhere it was used as a CSS `background`. */
export const BRAND_GRADIENT = ACCENT;

/** Accent text is now flat Tiffany blue. */
export const BRAND_GRADIENT_TEXT_SX = {
  color: ACCENT,
} as const;

/** Primary CTAs now use the neobrutalist button. */
export const BRAND_GRADIENT_BUTTON_SX = NB_BUTTON_SX;
