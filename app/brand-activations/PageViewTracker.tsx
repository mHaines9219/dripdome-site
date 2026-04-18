"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export default function PageViewTracker() {
  useEffect(() => {
    trackPageView({ page: "brand_activations" });
  }, []);

  return null;
}
