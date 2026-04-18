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
