import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";
import SiteIcon from "../../components/common/SiteIcon.jsx";

const heroParticles = [
  {
    x: "16%",
    y: "50%",
    c: "#5647ff",
    sticker: "/asset/Sticker1.png",
    label: "Camera sticker",
    rotate: "-7deg",
  },
  {
    x: "28%",
    y: "31%",
    c: "#ff5248",
    sticker: "/asset/Sticker2.png",
    label: "Creative sticker",
    rotate: "5deg",
  },
  {
    x: "39%",
    y: "76%",
    c: "#f5eed8",
    sticker: "/asset/Sticker3.png",
    label: "Developer sticker",
    rotate: "-3deg",
  },
  {
    x: "63%",
    y: "28%",
    c: "#f6a7d6",
    sticker: "/asset/Sticker4.png",
    label: "Design sticker",
    rotate: "7deg",
  },
  {
    x: "78%",
    y: "50%",
    c: "#f5c842",
    sticker: "/asset/Sticker5.png",
    label: "Music sticker",
    rotate: "-5deg",
  },
  {
    x: "88%",
    y: "70%",
    c: "#7dfff0",
    sticker: "/asset/Sticker6.png",
    label: "Coffee sticker",
    rotate: "4deg",
  },
];

const pixelBlocks = [
  { x: "-34px", y: "-12px" },
  { x: "-14px", y: "-34px" },
  { x: "10px", y: "-28px" },
  { x: "28px", y: "-8px" },
  { x: "-24px", y: "16px" },
  { x: "2px", y: "10px" },
  { x: "32px", y: "30px" },
];

const heroHeadline =
  "A full-stack UI developer who owns the product from first pixel to final deployment.";

const heroPopupImages = [
  "/asset/Sticker3.png",
  "/asset/Sticker4.png",
  "/asset/Sticker1.png",
  "/asset/Sticker2.png",
  "/asset/Sticker6.png",
  "/asset/Sticker5.png",
];

const heroWords = heroHeadline.split(" ").map((text, index) => ({
  text,
  image: heroPopupImages[index % heroPopupImages.length],
}));

const titleLetters = [];
const heroWordsWithLetters = heroWords.map((word, wordIndex) => ({
  ...word,
  letters: Array.from(word.text).map((char, letterIndex) => {
    const titleIndex = titleLetters.length;
    titleLetters.push({
      char,
      wordIndex,
      letterIndex,
      id: `${wordIndex}-${letterIndex}`,
    });
    return { char, letterIndex, titleIndex };
  }),
}));

const pixelHeartCells = [
  ...[
    [2, 0], [3, 0], [4, 0], [7, 0], [8, 0], [9, 0],
    [1, 1], [5, 1], [6, 1], [10, 1],
    [0, 2], [11, 2],
    [0, 3], [11, 3],
    [0, 4], [11, 4],
    [1, 5], [10, 5],
    [2, 6], [9, 6],
    [3, 7], [8, 7],
    [4, 8], [7, 8],
    [5, 9], [6, 9],
    [6, 10],
  ].map(([x, y]) => ({ x, y, tone: "outline" })),
  ...[
    [2, 1], [3, 1], [4, 1], [7, 1], [8, 1], [9, 1],
    [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [10, 2],
    [1, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [10, 3],
    [2, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
    [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
    [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
    [5, 7], [6, 7], [7, 7],
    [6, 8],
  ].map(([x, y]) => ({ x, y, tone: "fill" })),
  ...[
    [1, 3], [2, 3],
    [1, 4], [2, 4], [3, 4],
    [2, 5], [3, 5],
    [3, 6], [4, 6],
    [4, 7], [5, 7],
    [5, 8],
  ].map(([x, y]) => ({ x, y, tone: "shade" })),
  ...[
    [8, 2], [9, 2],
    [9, 3],
  ].map(([x, y]) => ({ x, y, tone: "shine" })),
];

const heartPixels = [
  [1, 0],
  [2, 0],
  [4, 0],
  [5, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [1, 3],
  [2, 3],
  [3, 3],
  [4, 3],
  [5, 3],
  [2, 4],
  [3, 4],
  [4, 4],
  [3, 5],
];

const revealPixels = heartPixels.map(([col, row], index) => ({
  iconX: `${(col - 3) * 8}px`,
  iconY: `${(row - 2.5) * 8}px`,
  x: `${((index % 9) - 4) * 1.55}rem`,
  y: `${(Math.floor(index / 9) - 1) * 3.15}rem`,
  delay: `${index * 0.014}s`,
}));

const HERO_PHYSICS_EXPAND_MS = 700;
const HERO_PHYSICS_RELEASE_MS = 900;
const HERO_PHYSICS_STEP = 1000 / 60;

// Uses Matter.js only while the heading is collected, then tears it down on reset.
function useHeroPhysics(isActive, stageRef, letterRefs, setBodies) {
  useEffect(() => {
    if (!isActive || !stageRef.current) return undefined;

    const stage = stageRef.current;
    const width = Math.max(280, stage.offsetWidth);
    const height = Math.max(280, stage.offsetHeight);
    const radius = Math.min(width, height) * 0.475;
    const cx = width / 2;
    const cy = height / 2;
    const measuredLetters = letterRefs.current
      .map((node, index) => ({ node, index }))
      .filter(({ node }) => node instanceof HTMLElement)
      .map(({ node, index }) => ({
        index,
        char: titleLetters[index]?.char ?? node.textContent ?? "",
        rect: node.getBoundingClientRect(),
      }));

    if (!measuredLetters.length) {
      setBodies([]);
      return undefined;
    }

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.5, scale: 0.00102 },
    });
    engine.positionIterations = 9;
    engine.velocityIterations = 7;
    engine.constraintIterations = 4;
    const world = engine.world;

    const wallCount = 64;
    const walls = Array.from({ length: wallCount }).map((_, index) => {
      const angle = (index / wallCount) * Math.PI * 2;
      const wallWidth = (2 * Math.PI * radius) / wallCount + 8;
      return Matter.Bodies.rectangle(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius,
        wallWidth,
        18,
        {
          isStatic: true,
          angle: angle + Math.PI / 2,
          render: { visible: false },
        },
      );
    });

    const letterBodies = [];
    measuredLetters.forEach(({ char, index, rect }) => {
      const bodyWidth = Math.max(10, rect.width * 0.34);
      const bodyHeight = Math.max(15, rect.height * 0.34);
      const columnCount = 12;
      const column = index % columnCount;
      const row = Math.floor(index / columnCount);
      const normalizedColumn = column - (columnCount - 1) / 2;
      const x =
        cx +
        normalizedColumn * radius * 0.112 +
        ((row % 2) - 0.5) * radius * 0.052;
      const y = cy - radius * 0.74 + row * bodyHeight * 0.46;
      const body = Matter.Bodies.rectangle(
        x,
        y,
        bodyWidth,
        bodyHeight,
        {
          chamfer: { radius: Math.min(8, bodyHeight * 0.22) },
          restitution: 0.16,
          friction: 0.88,
          frictionStatic: 0.9,
          frictionAir: 0.052,
          density: 0.0034,
          angle: ((index % 9) - 4) * 0.12,
        },
      );
      Matter.Body.setVelocity(body, {
        x: normalizedColumn * 0.008,
        y: 0.2 + (index % 5) * 0.045,
      });
      Matter.Body.setAngularVelocity(body, ((index % 9) - 4) * 0.034);
      letterBodies.push({ body, char, id: `${index}` });
    });

    const mouse = Matter.Mouse.create(stage);
    mouse.pixelRatio = window.devicePixelRatio || 1;
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.14,
        damping: 0.12,
        render: { visible: false },
      },
    });

    Matter.Composite.add(world, [...walls, mouseConstraint]);

    let frameId = 0;
    const activeBodies = [];
    const bodyTimers = letterBodies.map((item, index) =>
      window.setTimeout(() => {
        activeBodies.push(item);
        Matter.Composite.add(world, item.body);
        syncBodies();
      }, index * 18),
    );
    let lastTime = performance.now();
    let accumulator = 0;
    const syncBodies = () => {
      setBodies(
        activeBodies.map((item) => ({
          id: item.id,
          char: item.char,
          x: item.body.position.x,
          y: item.body.position.y,
          angle: item.body.angle,
        })),
      );
    };
    const tick = (time) => {
      const delta = Math.min(48, time - lastTime);
      lastTime = time;
      accumulator += delta;
      while (accumulator >= HERO_PHYSICS_STEP) {
        Matter.Engine.update(engine, HERO_PHYSICS_STEP);
        accumulator -= HERO_PHYSICS_STEP;
      }
      syncBodies();
      frameId = requestAnimationFrame(tick);
    };

    syncBodies();
    frameId = requestAnimationFrame(tick);

    return () => {
      bodyTimers.forEach((timer) => window.clearTimeout(timer));
      cancelAnimationFrame(frameId);
      Matter.Mouse.clearSourceEvents(mouse);
      Matter.Composite.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, [isActive, letterRefs, setBodies, stageRef]);
}

export default function HeroSection() {
  const [physicsMode, setPhysicsMode] = useState("idle");
  const [physicsBodies, setPhysicsBodies] = useState([]);
  const physicsStageRef = useRef(null);
  const letterRefs = useRef([]);
  const phaseTimersRef = useRef([]);
  const physicsActive = physicsMode !== "idle";

  useHeroPhysics(
    physicsMode === "collecting",
    physicsStageRef,
    letterRefs,
    setPhysicsBodies,
  );

  const clearPhaseTimers = () => {
    phaseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    phaseTimersRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearPhaseTimers();
    };
  }, []);

  const collectHeading = () => {
    if (physicsMode !== "idle") return;
    clearPhaseTimers();
    setPhysicsBodies([]);
    setPhysicsMode("expanding");
    phaseTimersRef.current = [
      window.setTimeout(() => {
        setPhysicsMode("collecting");
      }, HERO_PHYSICS_EXPAND_MS),
    ];
  };

  const releaseHeading = () => {
    if (physicsMode !== "collecting") return;
    clearPhaseTimers();
    setPhysicsMode("releasing");
    phaseTimersRef.current = [
      window.setTimeout(() => {
        setPhysicsBodies([]);
        setPhysicsMode("idle");
      }, HERO_PHYSICS_RELEASE_MS),
    ];
  };

  const releaseFromControl = (event) => {
    event.stopPropagation();
    releaseHeading();
  };

  return (
    <motion.section
      id="home-hero"
      className="kinetic-hero"
      aria-labelledby="kinetic-hero-title"
      initial={{ opacity: 0.96 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="hero-topbar">
        <div className="kinetic-brand">
          <span>Prajakta-Decodes</span>
          <span>Pune, India</span>
        </div>

        <div className="kinetic-pixel-mark" aria-hidden="true">
          {pixelHeartCells.map((cell, index) => (
            <span
              className={`kinetic-heart-pixel is-${cell.tone}`}
              key={`${cell.tone}-${cell.x}-${cell.y}-${index}`}
              style={{
                "--heart-x": cell.x,
                "--heart-y": cell.y,
              }}
            ></span>
          ))}
        </div>

        <div className="kinetic-mini-nav" aria-label="Primary navigation">
          <a href="#beyond-code">Get to know me</a>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="kinetic-mini-cta">
            <span>Hire me</span>
            <SiteIcon
              name="chevronRight"
              className="button-chevron"
              size={16}
            />
          </a>
        </div>
      </div>

      <div className="kinetic-particle-field">
        {heroParticles.map((particle, index) => (
          <button
            type="button"
            className="kinetic-particle"
            key={index}
            aria-label={particle.label}
            style={{
              "--particle-x": particle.x,
              "--particle-y": particle.y,
              "--particle-color": particle.c,
              "--sticker-rotate": particle.rotate,
            }}
          >
            <span className="kinetic-particle-dot"></span>
            <span className="kinetic-sticker-preview" aria-hidden="true">
              <img src={particle.sticker} alt="" />
            </span>
          </button>
        ))}
      </div>

      <div className="hero-pixel-cloud" aria-hidden="true">
        {pixelBlocks.map((block, index) => (
          <span
            className="kinetic-pixel"
            key={index}
            style={{ "--px": block.x, "--py": block.y }}
          ></span>
        ))}
      </div>
      <div className={`kinetic-hero-copy is-physics-${physicsMode}`}>
        <p className="kinetic-kicker kinetic-reveal">Full-Stack UI Developer</p>
        <div className="kinetic-heading-stage">
          <div className="hero-pixel-loader" aria-hidden="true">
            {revealPixels.map((pixel, index) => (
              <span
                key={index}
                style={{
                  "--pixel-end-x": pixel.x,
                  "--pixel-end-y": pixel.y,
                  "--pixel-delay": pixel.delay,
                }}
              ></span>
            ))}
          </div>
          <div className="hero-physics-world" ref={physicsStageRef}>
            {physicsBodies.map((body) => (
              <span
                className="hero-physics-letter"
                key={body.id}
                style={{
                  transform: `translate3d(${body.x}px, ${body.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`,
                }}
              >
                {body.char}
              </span>
            ))}
            <button
              type="button"
              className="hero-release"
              aria-label="Restore heading"
              onPointerDownCapture={releaseFromControl}
              onMouseDownCapture={(event) => event.stopPropagation()}
              onTouchStartCapture={(event) => event.stopPropagation()}
              onClick={releaseHeading}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </button>
          </div>
          <h1
            id="kinetic-hero-title"
            className="kinetic-title"
            aria-hidden={physicsActive}
          >
            {heroWordsWithLetters.map((word) => (
              <span
                className="hero-title-word"
                key={word.text}
                tabIndex={physicsActive ? -1 : 0}
              >
                {word.letters.map((letter) => (
                  <span
                    className="hero-title-letter"
                    key={`${word.text}-${letter.letterIndex}`}
                    ref={(node) => {
                      letterRefs.current[letter.titleIndex] = node;
                    }}
                  >
                    {letter.char}
                  </span>
                ))}
                <span className="hero-word-popup" aria-hidden="true">
                  <img src={word.image} alt="" />
                </span>
              </span>
            ))}
          </h1>
          <p className="kinetic-subcopy kinetic-reveal">
            I write clean code, sweat the details, and ship things people
            actually enjoy using.
          </p>
          <button
            type="button"
            className="hero-collector"
            aria-label={
              physicsActive
                ? "Reset the intro heading"
                : "Click to collect the intro heading animation"
            }
            aria-pressed={physicsActive}
            onClick={collectHeading}
          >
            <span className="hero-collector-hint">Click to collect</span>
            <span className="hero-collector-ring"></span>
            <span className="hero-collector-core"></span>
          </button>
        </div>
        <div className="kinetic-actions kinetic-reveal">
          <motion.a
            href="#work"
            className="kinetic-action-primary"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="https://docs.google.com/document/d/1FRJsIrSjrLJw5nYGrGpvg0pZVnCXBopZ/edit?usp=drive_link&ouid=106543068108250525970&rtpof=true&sd=true"
            className="kinetic-action-secondary"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Resume
          </motion.a>
        </div>
      </div>

      <div className="kinetic-bottom hero-edge">
        <span>React</span>
        <span>MERN</span>
        <span>Dashboards</span>
        <span>UI/UX</span>
        <span>Landing Pages</span>
      </div>

      <div className="kinetic-year hero-edge">2026</div>
    </motion.section>
  );
}
