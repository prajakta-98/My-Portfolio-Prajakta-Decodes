import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";
import BeyondCodeSection from "./BeyondCodeSection.jsx";
import ContactSection from "./ContactSection.jsx";
import FinalCtaSection from "./FinalCtaSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import WorkSection from "./WorkSection.jsx";

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
  "A full-stack UI developer crafting playful interfaces based in Pune, India.";

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

const titleLetters = heroWords.flatMap((word, wordIndex) =>
  Array.from(word.text).map((char, letterIndex) => ({
    char,
    wordIndex,
    letterIndex,
    id: `${wordIndex}-${letterIndex}`,
  })),
);

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

function useHeroPhysics(isActive, stageRef, letterRefs, setBodies) {
  useEffect(() => {
    if (!isActive || !stageRef.current) return undefined;

    const stage = stageRef.current;
    const offsetParent =
      stage.offsetParent instanceof HTMLElement
        ? stage.offsetParent
        : stage.parentElement;
    const parentRect = offsetParent?.getBoundingClientRect() ?? {
      left: 0,
      top: 0,
    };
    const stageRect = {
      left: parentRect.left + stage.offsetLeft,
      top: parentRect.top + stage.offsetTop,
    };
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
      gravity: { x: 0, y: 1.85, scale: 0.00112 },
    });
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
          restitution: 0.24,
          friction: 0.82,
          frictionStatic: 0.9,
          frictionAir: 0.035,
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
        stiffness: 0.18,
        damping: 0.06,
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
      }, index * 24),
    );
    let lastTime = performance.now();
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
      const delta = Math.min(32, time - lastTime);
      lastTime = time;
      Matter.Engine.update(engine, delta);
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

export default function PortfolioSections() {
  const [physicsMode, setPhysicsMode] = useState("idle");
  const [physicsBodies, setPhysicsBodies] = useState([]);
  const physicsStageRef = useRef(null);
  const letterRefs = useRef([]);
  const phaseTimersRef = useRef([]);
  const physicsActive = physicsMode !== "idle";

  useHeroPhysics(
    physicsMode === "expanding" || physicsMode === "collecting",
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
      }, 520),
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
      }, 760),
    ];
  };

  return (
    <>
      <section id="beyond">
        <div className="beyond-grain"></div>

        <motion.div
          className="kinetic-hero"
          aria-labelledby="kinetic-hero-title"
          initial={{ opacity: 0.96 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="kinetic-brand hero-edge">
            <span>Prajakta Bansod</span>
            <span>Pune, India</span>
          </div>

          <div className="kinetic-mini-nav hero-edge" aria-label="Primary navigation">
            <a href="#beyond">Get to know me</a>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a href="#contact" className="kinetic-mini-cta">Hire me</a>
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

          {/* <motion.div
            className="kinetic-polaroid kinetic-reveal"
            whileHover={{ y: -6, rotate: -2, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <img src="/asset/HeroImage.png" alt="Prajakta Bansod" />
            <span>Prajakta, Full-stack Developer</span>
          </motion.div> */}

          <div
            className={`kinetic-hero-copy is-physics-${physicsMode}`}
          >
            <p className="kinetic-kicker kinetic-reveal">
              Full-Stack UI Developer
            </p>
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
                {heroWords.map((word, wordIndex) => (
                  <span
                    className="hero-title-word"
                    key={word.text}
                    tabIndex={physicsActive ? -1 : 0}
                  >
                    {Array.from(word.text).map((char, letterIndex) => {
                      const letterPosition = titleLetters.findIndex(
                        (letter) =>
                          letter.wordIndex === wordIndex &&
                          letter.letterIndex === letterIndex,
                      );
                      return (
                        <span
                          className="hero-title-letter"
                          key={`${word.text}-${letterIndex}`}
                          ref={(node) => {
                            letterRefs.current[letterPosition] = node;
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                    <span className="hero-word-popup" aria-hidden="true">
                      <img src={word.image} alt="" />
                    </span>
                  </span>
                ))}
              </h1>
              <p className="kinetic-subcopy kinetic-reveal">
                Building fast React experiences with careful interaction design
                and practical full-stack delivery.
              </p>
              <button
                type="button"
                className="hero-collector"
                aria-label={
                  physicsActive
                    ? "Reset the intro heading"
                    : "Drop the intro heading into physics"
                }
                aria-pressed={physicsActive}
                onClick={collectHeading}
              >
                <span className="hero-collector-hint">Click</span>
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
                href="https://drive.google.com/file/d/13RQkO5hJcCe2cM1Dp0rHXczJkI5oEKQb/view?usp=drive_link"
                className="kinetic-action-secondary"
                target="_blank"
                rel="noreferrer"
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
            <span>Landing Pages</span>
          </div>

          <div className="kinetic-year hero-edge">2026</div>
        </motion.div>

        <WorkSection />
        <ServicesSection />
        <BeyondCodeSection />
        <ContactSection />
        <FinalCtaSection />
      </section>
    </>
  );
}
