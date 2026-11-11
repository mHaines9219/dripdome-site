"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pushDataLayer } from "@/lib/analytics";

const SCROLL_MARKS = [25, 50, 75, 90];
/** In-page anchors that hold an inquiry form; a link to one is a CTA. */
const FORM_ANCHORS = ["#contact", "#inquiry"];

const leadForm = (target: EventTarget | null) =>
  target instanceof Element
    ? target.closest<HTMLFormElement>("form[data-form]")?.dataset.form
    : undefined;

/**
 * Mounted once in ClientLayout. Pushes the signals that come before a lead
 * (scroll depth, CTA and email clicks, form starts and submit attempts) to
 * the dataLayer, so there is something to read when leads are few. Event
 * names avoid GA4's automatic ones (form_start, form_submit, scroll, click)
 * so nothing is counted twice.
 */
export default function EngagementTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const startedForms = new Set<string>();
    const reachedMarks = new Set<number>();

    const onFocusIn = (event: FocusEvent) => {
      const form = leadForm(event.target);
      if (!form || startedForms.has(form)) return;
      startedForms.add(form);
      pushDataLayer("lead_form_start", { form_type: form });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = leadForm(event.target);
      if (form) pushDataLayer("lead_form_submit", { form_type: form });
    };

    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      const href = link?.getAttribute("href");
      if (!link || !href) return;
      if (href.startsWith("mailto:")) {
        pushDataLayer("email_click");
      } else if (FORM_ANCHORS.some((anchor) => href.endsWith(anchor))) {
        pushDataLayer("cta_click", {
          // innerText skips the label variants hidden at this breakpoint
          cta_text: link.innerText.trim().slice(0, 80),
          cta_target: href,
        });
      }
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const mark of SCROLL_MARKS) {
        if (percent < mark || reachedMarks.has(mark)) continue;
        reachedMarks.add(mark);
        pushDataLayer("scroll_depth", { percent: mark });
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("submit", onSubmit);
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("submit", onSubmit);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
