import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import "./CardSwap.css";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()} />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = forwardRef(function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}, ref) {
  const config =
    easing === "elastic"
      ? {
          ease: "power3.out",
          durDrop: 0.68,
          durMove: 0.62,
          durReturn: 0.68,
          promoteOverlap: 0.58,
          returnDelay: 0.12,
        }
      : {
          ease: "power2.inOut",
          durDrop: 0.6,
          durMove: 0.58,
          durReturn: 0.6,
          promoteOverlap: 0.45,
          returnDelay: 0.14,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length],
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const isPausedRef = useRef(false);
  const controlsRef = useRef({
    next: () => {},
    previous: () => {},
    pause: () => {},
    play: () => {},
  });

  useImperativeHandle(
    ref,
    () => ({
      next: () => controlsRef.current.next(),
      previous: () => controlsRef.current.previous(),
      pause: () => controlsRef.current.pause(),
      play: () => controlsRef.current.play(),
      isPaused: () => isPausedRef.current,
    }),
    [],
  );

  useEffect(() => {
    const total = refs.length;
    const shouldAnimate =
      total >= 2 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.matchMedia("(max-width: 768px)").matches;

    const clearAuto = () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };

    const startAuto = () => {
      clearAuto();
      if (!shouldAnimate || isPausedRef.current) return;
      intervalRef.current = window.setInterval(() => swap(), delay);
    };

    const animateToOrder = (nextOrder) => {
      tlRef.current?.kill();
      if (!shouldAnimate) {
        nextOrder.forEach((idx, slotIndex) => {
          placeNow(
            refs[idx].current,
            makeSlot(slotIndex, cardDistance, verticalDistance, total),
            skewAmount,
          );
        });
        order.current = nextOrder;
        return;
      }

      const tl = gsap.timeline();
      tlRef.current = tl;
      nextOrder.forEach((idx, slotIndex) => {
        const slot = makeSlot(slotIndex, cardDistance, verticalDistance, total);
        tl.set(refs[idx].current, { zIndex: slot.zIndex }, 0);
        tl.to(
          refs[idx].current,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: 0.42,
            ease: "power3.out",
          },
          0,
        );
      });
      tl.call(() => {
        order.current = nextOrder;
      });
    };

    const previous = () => {
      if (order.current.length < 2) return;
      clearAuto();
      const nextOrder = [
        order.current[order.current.length - 1],
        ...order.current.slice(0, -1),
      ];
      animateToOrder(nextOrder);
      startAuto();
    };

    const pause = () => {
      isPausedRef.current = true;
      tlRef.current?.pause();
      clearAuto();
    };

    const play = () => {
      isPausedRef.current = false;
      tlRef.current?.play();
      startAuto();
    };

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const dropDistance = Math.min(
        190,
        Math.max(150, elFront.offsetHeight * 0.48),
      );
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: `+=${dropDistance}`,
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.08}`,
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return",
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return",
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    const next = () => {
      clearAuto();
      swap();
      startAuto();
    };

    controlsRef.current = { next, previous, pause, play };
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    if (!shouldAnimate) {
      return () => {
        clearAuto();
        tlRef.current?.kill();
      };
    }

    swap();
    startAuto();

    if (pauseOnHover) {
      const node = container.current;
      const hoverPause = () => {
        tlRef.current?.pause();
        clearAuto();
      };
      const hoverResume = () => {
        if (isPausedRef.current) return;
        tlRef.current?.play();
        startAuto();
      };
      node.addEventListener("mouseenter", hoverPause);
      node.addEventListener("focusin", hoverPause);
      node.addEventListener("mouseleave", hoverResume);
      node.addEventListener("focusout", hoverResume);
      return () => {
        node.removeEventListener("mouseenter", hoverPause);
        node.removeEventListener("focusin", hoverPause);
        node.removeEventListener("mouseleave", hoverResume);
        node.removeEventListener("focusout", hoverResume);
        clearAuto();
        tlRef.current?.kill();
      };
    }

    return () => {
      clearAuto();
      tlRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (event) => {
            child.props.onClick?.(event);
            onCardClick?.(i);
          },
        })
      : child,
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
});

export default CardSwap;
