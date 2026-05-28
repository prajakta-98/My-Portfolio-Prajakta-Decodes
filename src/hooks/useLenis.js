import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const defaultLenisOptions = {
  anchors: {
    lerp: 0.14,
  },
  autoRaf: true,
  lerp: 0.12,
  smoothWheel: true,
  stopInertiaOnNavigate: true,
  syncTouch: false,
  touchMultiplier: 1,
  wheelMultiplier: 1,
};

let activeLenis = null;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

function resolveScrollTarget(target) {
  if (typeof target !== "string") return target;
  if (target === "#" || target === "") return 0;

  try {
    return document.querySelector(target);
  } catch {
    return null;
  }
}

function nativeScrollToTarget(target, options = {}) {
  const resolvedTarget = resolveScrollTarget(target);
  const behavior =
    options.immediate || prefersReducedMotion() ? "auto" : "smooth";

  if (typeof resolvedTarget === "number") {
    window.scrollTo({ top: resolvedTarget, behavior });
    return;
  }

  resolvedTarget?.scrollIntoView({
    behavior,
    block: options.block ?? "start",
  });
}

export function scrollToTarget(target, options = {}) {
  if (typeof window === "undefined") return;

  const resolvedTarget = resolveScrollTarget(target);
  if (resolvedTarget === null) return;

  if (activeLenis && !prefersReducedMotion()) {
    activeLenis.scrollTo(resolvedTarget, {
      immediate: options.immediate,
      lerp: options.lerp ?? 0.14,
      lock: options.lock,
      offset: options.offset ?? 0,
      onComplete: options.onComplete,
    });
    return;
  }

  nativeScrollToTarget(resolvedTarget, options);
}

export default function useLenis(options) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let instance = null;
    let removeScrollListener = null;

    const destroyLenis = () => {
      removeScrollListener?.();
      removeScrollListener = null;
      instance?.destroy();
      instance = null;
      activeLenis = null;
      setLenis(null);
    };

    const setupLenis = () => {
      destroyLenis();

      if (motionQuery.matches) return;

      instance = new Lenis({
        ...defaultLenisOptions,
        ...(options ?? {}),
      });

      activeLenis = instance;
      removeScrollListener = instance.on("scroll", () => {
        ScrollTrigger.update();
      });
      setLenis(instance);
    };

    setupLenis();

    motionQuery.addEventListener("change", setupLenis);

    return () => {
      motionQuery.removeEventListener("change", setupLenis);
      destroyLenis();
    };
  }, [options]);

  return lenis;
}
