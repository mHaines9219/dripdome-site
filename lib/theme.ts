/**
 * ============================================================
 * NEOBRUTALIST DESIGN SYSTEM — single source of truth
 * ============================================================
 * To retheme the site, edit NB_COLORS (and NB_BORDER_WIDTH /
 * NB_SHADOW_OFFSET if you want chunkier or thinner hardware).
 * Nothing below hardcodes a color; every component imports
 * from here.
 */

export const NB_COLORS = {
  /** Page background */
  paper: "#131313",
  /** Raised surfaces: cards, form fields, image plates */
  surface: "#1D1D1B",
  /** Text, borders, inverted bands, primary buttons */
  ink: "#F2F2EF",
  /** Text sitting on ink bands (always the opposite pole of `ink`) */
  paperOnInk: "#131313",
  /** Accent blocks, highlighted cells, hover fills */
  silver: "#C7CAD0",
  /** Subtle fills, alternating cells: one step off `paper` */
  silverLight: "#26282A",
  /** Secondary text, captions, mono metadata (must read on `paper`) */
  steel: "#9CA1A7",
  /** Text on `silver` fills (always dark, silver stays light in any theme) */
  onSilver: "#131313",
  /** Muted text and rules on `ink` bands (low-contrast against `ink`) */
  mutedOnInk: "#5F6367",
  /** Media well behind white logo assets. Keep dark in ANY theme,
   *  the press/brand logo PNGs are white artwork. */
  well: "#0B0B0C",
} as const;

export const NB_BORDER_WIDTH = 2;
export const NB_SHADOW_OFFSET = 6;

/** 2px solid ink rule, the default border everywhere */
export const NB_RULE = `${NB_BORDER_WIDTH}px solid ${NB_COLORS.ink}`;

/** Hard zero-blur offset shadow */
export const nbShadow = (
  px: number = NB_SHADOW_OFFSET,
  color: string = NB_COLORS.ink,
) => `${px}px ${px}px 0 ${color}`;

/* ---------- Typography ---------- */
/** CSS variables are registered in app/layout.tsx via next/font */
export const FONT_DISPLAY =
  "var(--font-display), Impact, 'Arial Black', sans-serif";
export const FONT_MONO =
  "var(--font-mono), 'SFMono-Regular', 'Courier New', monospace";

/** Big blocky headline type */
export const NB_DISPLAY_SX = {
  fontFamily: FONT_DISPLAY,
  textTransform: "uppercase",
  lineHeight: 0.95,
  letterSpacing: "0.01em",
  fontWeight: 400,
} as const;

/** Spec-sheet metadata type: labels, captions, indexes */
export const NB_MONO_SX = {
  fontFamily: FONT_MONO,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
} as const;

/** Outlined (stroke-only) display text on paper */
export const NB_OUTLINE_TEXT_SX = {
  ...NB_DISPLAY_SX,
  color: "transparent",
  WebkitTextStroke: `${NB_BORDER_WIDTH}px ${NB_COLORS.ink}`,
} as const;

/* ---------- Interactive hardware ---------- */

/** Keyboard focus ring: hard silver outline, offset so the 2px ink
 *  border stays visible underneath. Spread into any interactive sx. */
export const NB_FOCUS_VISIBLE_SX = {
  "&:focus-visible": {
    outline: `3px solid ${NB_COLORS.silver}`,
    outlineOffset: "2px",
  },
} as const;

/** Mono label that sits above a form field (pairs with htmlFor/id) */
export const NB_FIELD_LABEL_SX = {
  ...NB_MONO_SX,
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: NB_COLORS.steel,
  mb: 0.75,
} as const;

/** Depth color for the button offset shadow. A mid-tone (not the white
 *  button face) so the raised face and the shadow beneath it read as two
 *  distinct layers — the 3D press effect. Steel is dark enough to step down
 *  from the white face, yet light enough to stay visible on the dark paper
 *  sections where most buttons live. */
const NB_BUTTON_SHADOW = NB_COLORS.steel;

const NB_PRESS_MECHANIC = {
  transition: "transform 120ms ease, box-shadow 120ms ease",
  "&:hover": {
    transform: "translate(2px, 2px)",
    boxShadow: nbShadow(NB_SHADOW_OFFSET - 3, NB_BUTTON_SHADOW),
  },
  "&:active": {
    transform: `translate(${NB_SHADOW_OFFSET}px, ${NB_SHADOW_OFFSET}px)`,
    boxShadow: nbShadow(0, NB_BUTTON_SHADOW),
  },
} as const;

/** Primary button: ink block, paper text, press-down mechanic */
export const NB_BUTTON_SX = {
  fontFamily: FONT_MONO,
  fontWeight: 700,
  letterSpacing: "0.1em",
  borderRadius: 0,
  border: NB_RULE,
  bgcolor: NB_COLORS.ink,
  color: NB_COLORS.paperOnInk,
  boxShadow: nbShadow(NB_SHADOW_OFFSET, NB_BUTTON_SHADOW),
  "&:hover": {
    ...NB_PRESS_MECHANIC["&:hover"],
    bgcolor: NB_COLORS.ink,
  },
  "&:active": NB_PRESS_MECHANIC["&:active"],
  ...NB_FOCUS_VISIBLE_SX,
  transition: NB_PRESS_MECHANIC.transition,
} as const;

/** Secondary button: surface block, ink text */
export const NB_BUTTON_OUTLINE_SX = {
  fontFamily: FONT_MONO,
  fontWeight: 700,
  letterSpacing: "0.1em",
  borderRadius: 0,
  border: NB_RULE,
  bgcolor: NB_COLORS.surface,
  color: NB_COLORS.ink,
  boxShadow: nbShadow(NB_SHADOW_OFFSET, NB_BUTTON_SHADOW),
  "&:hover": {
    ...NB_PRESS_MECHANIC["&:hover"],
    bgcolor: NB_COLORS.silverLight,
  },
  "&:active": NB_PRESS_MECHANIC["&:active"],
  ...NB_FOCUS_VISIBLE_SX,
  transition: NB_PRESS_MECHANIC.transition,
} as const;

/** Dark button for LIGHT (silver) bands: paper face, ink text. A white
 *  button washes out on a silver background; this dark face keeps the CTA
 *  high-contrast. Same border, press mechanic, and depth shadow. */
export const NB_BUTTON_DARK_SX = {
  fontFamily: FONT_MONO,
  fontWeight: 700,
  letterSpacing: "0.1em",
  borderRadius: 0,
  border: NB_RULE,
  bgcolor: NB_COLORS.paper,
  color: NB_COLORS.ink,
  boxShadow: nbShadow(NB_SHADOW_OFFSET, NB_BUTTON_SHADOW),
  "&:hover": {
    ...NB_PRESS_MECHANIC["&:hover"],
    bgcolor: NB_COLORS.paper,
  },
  "&:active": NB_PRESS_MECHANIC["&:active"],
  ...NB_FOCUS_VISIBLE_SX,
  transition: NB_PRESS_MECHANIC.transition,
} as const;

/** Square bordered tag / chip */
export const NB_TAG_SX = {
  ...NB_MONO_SX,
  display: "inline-flex",
  alignItems: "center",
  px: 1.5,
  py: 0.5,
  border: NB_RULE,
  bgcolor: NB_COLORS.surface,
  color: NB_COLORS.ink,
  fontWeight: 500,
} as const;

/* ============================================================
 * LEGACY champagne-gold tokens.
 * Still imported by interior routes (blog, portfolio, services,
 * brand-activations) that have not been converted yet. Do not
 * use in new work.
 * ============================================================ */

export const BRAND_ACCENT = "#E5C767";
export const BRAND_ACCENT_DEEP = "#C9A227";

export const BRAND_GRADIENT =
  "linear-gradient(135deg, #E5C767 0%, #E89B3C 100%)";

export const BRAND_GRADIENT_TEXT_SX = {
  background: BRAND_GRADIENT,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
} as const;

export const BRAND_GRADIENT_BUTTON_SX = {
  background: BRAND_GRADIENT,
  color: "black",
  "&:hover": { filter: "brightness(0.92)", background: BRAND_GRADIENT },
} as const;
