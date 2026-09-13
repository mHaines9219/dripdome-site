"use client";

import { useCallback, useRef, type PointerEvent, type RefObject } from "react";

const DRAG_THRESHOLD_PX = 4;
const SETTLE_FALLBACK_MS = 450;

/**
 * Mouse drag-to-scroll for a horizontal scroll-snap track. Touch and pen keep
 * the browser's native panning; this only handles mouse pointers, which have no
 * native way to drag an overflow container. While dragging, scroll snap is
 * switched off so the track follows the cursor 1:1; on release the track
 * smooth-scrolls to the nearest frame and snap is restored.
 *
 * Spread the returned handlers on the scroll container, e.g. `<Box {...drag} />`.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  const state = useRef({
    active: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    startLeft: 0,
  });

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const el = ref.current;
      if (!el) return;
      state.current = {
        active: true,
        dragging: false,
        pointerId: e.pointerId,
        startX: e.clientX,
        startLeft: el.scrollLeft,
      };
    },
    [ref],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const s = state.current;
      const el = ref.current;
      if (!s.active || !el) return;
      const dx = e.clientX - s.startX;
      if (!s.dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
        s.dragging = true;
        el.setPointerCapture(s.pointerId);
        el.style.scrollSnapType = "none";
        el.style.scrollBehavior = "auto";
        el.style.cursor = "grabbing";
      }
      e.preventDefault();
      el.scrollLeft = s.startLeft - dx;
    },
    [ref],
  );

  const settle = useCallback((el: HTMLElement) => {
    // Snap is off, so pick the frame whose left edge is nearest and glide to
    // it. Restore snap once the glide ends (scrollend, with a timer fallback
    // for browsers that do not fire it).
    const frames = Array.from(el.children) as HTMLElement[];
    let target = el.scrollLeft;
    let best = Infinity;
    for (const frame of frames) {
      const d = Math.abs(frame.offsetLeft - el.scrollLeft);
      if (d < best) {
        best = d;
        target = frame.offsetLeft;
      }
    }
    const maxLeft = el.scrollWidth - el.clientWidth;
    target = Math.max(0, Math.min(target, maxLeft));

    let done = false;
    const restore = () => {
      if (done) return;
      done = true;
      el.removeEventListener("scrollend", restore);
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
    };

    if (Math.abs(target - el.scrollLeft) < 1) {
      restore();
      return;
    }
    el.addEventListener("scrollend", restore);
    window.setTimeout(restore, SETTLE_FALLBACK_MS);
    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const end = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const s = state.current;
      const el = ref.current;
      if (!s.active) return;
      s.active = false;
      if (!s.dragging || !el) return;
      s.dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
      settle(el);
    },
    [ref, settle],
  );

  // Images inside the track would otherwise start a native drag on mousedown.
  const onDragStart = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: end,
    onPointerCancel: end,
    onDragStart,
  };
}
