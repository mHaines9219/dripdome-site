import type { MouseEvent } from "react";

/**
 * Click handler for `/#contact` links. When the current page has an intake
 * form, scroll to it in place: a Link to the URL you are already on is a
 * no-op in Next (so a second click on the navbar button did nothing), and
 * from a vertical page it would bounce the visitor home instead of to that
 * page's own, preselected form. Pages without an intake fall through to the
 * link's normal navigation.
 */
export function scrollToIntake(e: MouseEvent<HTMLElement>) {
  const target = document.getElementById("contact");
  if (!target) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", "#contact");
}
