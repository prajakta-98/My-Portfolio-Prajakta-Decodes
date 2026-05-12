import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import "./ScrambledText.css";

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) {
  const rootRef = useRef(null);
  const wordRefs = useRef([]);
  const text = typeof children === "string" ? children : "";
  const words = useMemo(() => {
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!normalized) return [];
    return normalized.split(" ").map((word, wordIndex, arr) => ({
      letters: Array.from(word),
      trailingSpace: wordIndex < arr.length - 1,
    }));
  }, [text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const chars = wordRefs.current.flat().filter(Boolean);
    const randomChar = () => scrambleChars[Math.floor(Math.random() * scrambleChars.length)] || ".";

    chars.forEach((char) => {
      const width = char.getBoundingClientRect().width;
      char.style.width = `${Math.max(width, 1)}px`;
    });

    const handleMove = (event) => {
      chars.forEach((char) => {
        const original = char.dataset.content || "";
        if (!original.trim()) return;

        const { left, top, width, height } = char.getBoundingClientRect();
        const dx = event.clientX - (left + width / 2);
        const dy = event.clientY - (top + height / 2);
        const distance = Math.hypot(dx, dy);

        if (distance >= radius) return;

        const state = { progress: 0 };
        char._scrambleTween?.kill();
        char._scrambleTween = gsap.to(state, {
          progress: 1,
          overwrite: true,
          duration: Math.max(0.16, duration * (1 - distance / radius)),
          ease: "none",
          onUpdate: () => {
            if (state.progress < 0.82 && Math.random() <= speed) {
              char.textContent = randomChar();
            }
            if (state.progress >= 0.82) {
              char.textContent = original;
            }
          },
          onComplete: () => {
            char.textContent = original;
            char._scrambleTween = null;
          },
        });
      });
    };

    root.addEventListener("pointermove", handleMove);

    return () => {
      root.removeEventListener("pointermove", handleMove);
      chars.forEach((char) => {
        char._scrambleTween?.kill();
        char.textContent = char.dataset.content || "";
      });
    };
  }, [radius, duration, speed, scrambleChars, words.length]);

  return (
    <span ref={rootRef} className={`scrambled-text ${className}`.trim()} style={style}>
      {words.map((word, wordIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <span className="scrambled-word" key={wordIndex}>
          {word.letters.map((letter, letterIndex) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={`${letter}-${letterIndex}`}
              ref={(node) => {
                if (!wordRefs.current[wordIndex]) wordRefs.current[wordIndex] = [];
                wordRefs.current[wordIndex][letterIndex] = node;
              }}
              className="char"
              data-content={letter}
            >
              {letter}
            </span>
          ))}
          {word.trailingSpace ? " " : ""}
        </span>
      ))}
    </span>
  );
}
