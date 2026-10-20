"use client";

import { useEffect, useRef } from "react";
import { HONEYPOT_FIELD } from "@/lib/leadScreen";

export type ContactApiResponse = {
  message?: string;
  error?: string;
  lead?: boolean;
  leadId?: string;
  /** Drive resumable upload URLs, in the order the files were sent */
  uploads?: { folderId: string; token: string; urls: string[] };
  /** Files were attached but Drive could not take them */
  uploadsUnavailable?: boolean;
};

/**
 * Client half of the form spam filter in lib/leadScreen.ts. Render
 * <HoneypotField /> inside the form and spread guardFields(form) into the
 * POST body.
 */
export function useSpamGuard() {
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  return {
    guardFields: (form: HTMLFormElement) => {
      const trap = form.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null;
      return {
        [HONEYPOT_FIELD]: trap?.value ?? "",
        formFillMs: startedAt.current ? Date.now() - startedAt.current : 0,
      };
    },
    // Time the next submission from now, so a second send is checked too
    restart: () => {
      startedAt.current = Date.now();
    },
  };
}
