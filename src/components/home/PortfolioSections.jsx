import WorkCardSwap from "./WorkCardSwap.jsx";
import ScrambledText from "../common/ScrambledText/ScrambledText.jsx";
import { useMemo, useState } from "react";

function ClickSpark({ children, className = "" }) {
  const [sparks, setSparks] = useState([]);

  const createSpark = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const sparkId = `${Date.now()}-${Math.random()}`;

    setSparks((currentSparks) => [
      ...currentSparks,
      {
        id: sparkId,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    ]);
  };

  return (
    <div className={`click-spark ${className}`} onPointerDown={createSpark}>
      {children}
      {sparks.map((spark) => (
        <span
          className="click-spark-burst"
          key={spark.id}
          style={{ "--spark-x": `${spark.x}px`, "--spark-y": `${spark.y}px` }}
          onAnimationEnd={() =>
            setSparks((currentSparks) =>
              currentSparks.filter((currentSpark) => currentSpark.id !== spark.id),
            )
          }
        >
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      ))}
    </div>
  );
}

export default function PortfolioSections() {
  const stackSearchRows = [
    ["R", "E", "A", "C", "T", "N", "O", "D", "E"],
    ["F", "I", "G", "M", "A", "U", "I", "C", "X"],
    ["M", "O", "N", "G", "O", "A", "P", "I", "Q"],
    ["C", "S", "S", "G", "I", "T", "J", "S", "Y"],
    ["D", "B", "E", "X", "P", "R", "E", "S", "S"],
  ];

  const stackSearchWords = [
    { name: "React", cells: ["0-0", "0-1", "0-2", "0-3", "0-4"] },
    { name: "Node", cells: ["0-5", "0-6", "0-7", "0-8"] },
    { name: "Figma", cells: ["1-0", "1-1", "1-2", "1-3", "1-4"] },
    { name: "UI", cells: ["1-5", "1-6"] },
    { name: "Mongo", cells: ["2-0", "2-1", "2-2", "2-3", "2-4"] },
    { name: "API", cells: ["2-5", "2-6", "2-7"] },
    { name: "CSS", cells: ["3-0", "3-1", "3-2"] },
    { name: "Git", cells: ["3-3", "3-4", "3-5"] },
    { name: "JS", cells: ["3-6", "3-7"] },
    { name: "Express", cells: ["4-2", "4-3", "4-4", "4-5", "4-6", "4-7", "4-8"] },
  ];
  const [selectedStackCells, setSelectedStackCells] = useState(() => new Set());
  const completedStackWords = useMemo(
    () =>
      stackSearchWords.filter((word) =>
        word.cells.every((cellKey) => selectedStackCells.has(cellKey)),
      ),
    [selectedStackCells],
  );
  const completedStackCells = useMemo(
    () => new Set(completedStackWords.flatMap((word) => word.cells)),
    [completedStackWords],
  );
  const completedStackNames = completedStackWords.map((word) => word.name);

  const toggleStackCell = (cellKey) => {
    setSelectedStackCells((currentCells) => {
      const nextCells = new Set(currentCells);

      if (nextCells.has(cellKey)) {
        nextCells.delete(cellKey);
      } else {
        nextCells.add(cellKey);
      }

      return nextCells;
    });
  };

  return (
    <>
      <section id="beyond">
        <div className="beyond-grain"></div>
        <div
          className="bg-doodle"
          style={{ top: "5%", left: "-3%", transform: "rotate(-8deg)" }}
        >
          📷
        </div>
        <div
          className="bg-doodle"
          style={{
            top: "38%",
            right: "-2%",
            transform: "rotate(5deg)",
            fontSize: "10rem",
          }}
        >
          🎵
        </div>
        <div
          className="bg-doodle"
          style={{
            bottom: "10%",
            left: "5%",
            transform: "rotate(-3deg)",
            fontSize: "9rem",
          }}
        >
          🍳
        </div>

        <div className="intro-wrap">
          <div className="intro-photo-panel">
            <div className="intro-polaroid">
              <img src="/asset/HeroImage.png" alt="Prajakta Bansod" />
              <div className="intro-polaroid-cap">
                Prajakta, Full-stack Developer · Pune, India
              </div>
            </div>

            <img
              src="/asset/Sticker1.png"
              alt="Character sticker"
              className="intro-sticker s-sticker1"
            />
            <img
              src="/asset/Sticker2.png"
              alt="Character sticker"
              className="intro-sticker s-sticker2"
            />
            <img
              src="/asset/Sticker3.png"
              alt="Character sticker"
              className="intro-sticker s-sticker3"
            />
            <img
              src="/asset/Sticker4.png"
              alt="Character sticker"
              className="intro-sticker s-sticker4"
            />
            <img
              src="/asset/Sticker5.png"
              alt="Character sticker"
              className="intro-sticker s-sticker5"
            />
            <img
              src="/asset/Sticker6.png"
              alt="Character sticker"
              className="intro-sticker s-sticker6"
            />
          </div>

          <div className="intro-text-panel">
            <div className="name-doodle">← that's me, btw 👋</div>

            <div className="intro-eyebrow">
              <span className="dot"></span>
              Open for new Projects
            </div>

            <h3 className="intro-h1" aria-label="Hello">
              <span className="hello-cycler" aria-hidden="true">
                <span className="hello-word" data-lang="English">
                  Hi
                </span>
                <span className="hello-word" data-lang="Hindi">
                  नमस्ते
                </span>
                <span className="hello-word" data-lang="French">
                  Bonjour
                </span>
                <span className="hello-word" data-lang="Spanish">
                  Hola
                </span>
                <span className="hello-word" data-lang="Italian">
                  Ciao
                </span>
                <span className="hello-word" data-lang="German">
                  Hallo
                </span>
                <span className="hello-word" data-lang="Portuguese">
                  Olá
                </span>
                <span className="hello-word" data-lang="Marathi">
                  नमस्कार
                </span>
              </span>
            </h3>
            <div className="hello-lang-label" aria-live="polite">
              English
            </div>

            <div className="intro-about-blocks">
              <p className="intro-about-line ia1">
                <span className="ia-kicker">My name is</span>
                <strong>Prajakta Bansod,</strong> I'm a Full-stack Developer
                &amp; creative coder based in Pune, India.
              </p>
              <p className="intro-about-line ia2">
                <span className="ia-kicker">Ever since</span> I started building
                things, I've always had a special interest in crafting
                interfaces that feel as good as they look — from the most
                minimal interaction to the most elaborate UI.
              </p>
              {/* <p className="intro-about-line ia3">
                <span className="ia-kicker">I love to</span>
                <ScrambledText radius={52} duration={0.42} speed={0.7} scrambleChars=".:">
                  discover and experience creative ways to build things — for myself and for others.
                </ScrambledText>
              </p> */}
            </div>

            <div className="intro-role-strip">
              <span>React Developer</span>
              <span className="intro-role-dot">✦</span>
              <span>UI / UX</span>
              <span className="intro-role-dot">✦</span>
              <span>Fullstack</span>
              <span className="intro-role-dot">✦</span>
              <span>Creative Coder</span>
            </div>

            <p
              className="intro-sub"
              style={{ display: "none" }}
              aria-hidden="true"
            >
              I write UI components by day, but when I close the laptop — I'm
              out with my camera chasing the perfect light, stress-cooking
              something that smells incredible, or singing along to a melody
              that's been stuck in my head all week.
              <strong>This is the rest of me.</strong>
            </p>
          </div>
        </div>

        {/* Work section */}
        <section id="work">
          <div className="work-inner work-archive-shell">
            <div className="work-header work-archive-header">
              <div>
                <div className="detail-label">Selected Work</div>
                <h2 className="work-h2">
                  Projects built with <em>care and clarity.</em>
                </h2>
              </div>
              <p className="work-copy">
                A quick look at the websites, apps and interfaces I have
                designed and built.
              </p>
            </div>
            <div className="archive-scene">
              <div className="archive-scene-copy">
                <WorkCardSwap />
                {/* <div className="work-cta-rail"> */}
                {/* <div className="work-cta-presence">
                  <div className="work-avatars" aria-hidden="true">
                    <span>P</span>
                    <span>UI</span>
                    <span>FE</span>
                  </div>
                  <p>
                    Available for websites, dashboards and frontend work that needs
                    thoughtful design and clean code.
                  </p>
                </div> */}
                {/* <a className="work-cta-link" href="#contact">Start a project</a> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </section>

        <div className="passion-block" id="photography">
          <div
            className="music-doodle"
            style={{
              top: "3rem",
              right: "8rem",
              "--fd": "3.5s",
              "--fdl": "0.2s",
              "--fr": "-6deg",
            }}
          >
            🌅 golden hour?
          </div>
          <div
            className="music-doodle"
            style={{
              top: "6rem",
              right: "2rem",
              "--fd": "4s",
              "--fdl": "0.8s",
              "--fr": "4deg",
              fontSize: "0.85rem",
            }}
          >
            click! ✦
          </div>

          <div className="passion-label sr-l">
            <span className="num">01</span> ✦ First Passion
          </div>
          <h2 className="passion-h2 sr">
            <span className="hi">Photography</span>
            <br />
            <span
              style={{
                fontSize: "0.5em",
                fontWeight: 300,
                color: "var(--muted)",
              }}
            >
              — a frame for every feeling.
            </span>
          </h2>

          <div className="photo-layout">
            <div className="photo-left sr-l d1">
              <div className="polaroid-cluster">
                <div className="polaroid pol-1">
                  <div className="pol-ph">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="6" width="20" height="15" rx="2" />
                      <circle cx="12" cy="13" r="4" />
                      <path d="M8 6l2-3h4l2 3" />
                    </svg>
                    <img src="/asset/SunsetPhoto.jpeg" alt="Golden hour" />
                  </div>
                  <div className="pol-caption">golden hour 🌅</div>
                </div>

                <div className="polaroid pol-2">
                  <div className="pol-ph">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="6" width="20" height="15" rx="2" />
                      <circle cx="12" cy="13" r="4" />
                      <path d="M8 6l2-3h4l2 3" />
                    </svg>
                    <img src="/asset/StreetLight.jpg" alt="Street light" />
                  </div>
                  <div className="pol-caption">street light ✨</div>
                </div>

                <div className="polaroid pol-3">
                  <div className="pol-ph">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="6" width="20" height="15" rx="2" />
                      <circle cx="12" cy="13" r="4" />
                      <path d="M8 6l2-3h4l2 3" />
                    </svg>
                    <img
                      src="/asset/CandidMoment.jpg"
                      alt="Candid moment"
                      style={{ top: "190px", left: "120px" }}
                    />
                  </div>
                  <div className="pol-caption">candid moments 🌿</div>
                </div>

                <div className="polaroid pol-4">
                  <div className="pol-ph">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="6" width="20" height="15" rx="2" />
                      <circle cx="12" cy="13" r="4" />
                      <path d="M8 6l2-3h4l2 3" />
                    </svg>
                    <img src="/asset/ColorsAndChaos.jpg" alt="Golden hour" />
                  </div>
                  <div className="pol-caption">colours &amp; chaos 🎨</div>
                </div>
              </div>
            </div>

            <div className="photo-right sr-r d2">
              <p className="photo-copy">
                Photography taught me something coding never could — to
                <strong> slow down and really look.</strong>
                I'm that person who stops mid-conversation because the light
                just hit a wall the perfect way. I shoot mostly on my phone
                (judge me), but the frame always means something.
              </p>

              <div className="filmstrip">
                <div className="film-frame">
                  <div className="film-ph">📷</div>
                </div>
                <div className="film-frame">
                  <div className="film-ph">
                    <img src="/asset/PORTRAIT.jpg" />
                  </div>
                </div>
                <div className="film-frame">
                  <div className="film-ph">
                    <img src="/asset/Flower2.jpg" />
                  </div>
                </div>
                <div className="film-frame">
                  <div className="film-ph">
                    <img src="/asset/Coffee.jpg" />
                  </div>
                </div>
                <div className="film-frame">
                  <div className="film-ph">📷</div>
                </div>
              </div>

              <div className="scribble-note">
                "There's a bug I can't fix, but I <em>can</em> find the perfect
                composition in a cup of chai. Same energy, different medium."
              </div>

              <div className="photo-stats">
                <div className="stat-pill">
                  <span className="emoji">📸</span> Mostly candid
                </div>
                <div className="stat-pill">
                  <span className="emoji">🌅</span> Golden hour fanatic
                </div>
                <div className="stat-pill">
                  <span className="emoji">📱</span> Shot on phone
                </div>
                <div className="stat-pill">
                  <span className="emoji">🎞️</span> Film aesthetic
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="passion-block" id="cooking">
          <div className="steam-doodle" aria-hidden="true">
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
              <path
                d="M15 70 Q10 55 20 45 Q30 35 20 20 Q10 10 18 2"
                stroke="rgba(255,107,107,.5)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M30 72 Q25 57 35 47 Q45 37 35 22 Q25 12 33 4"
                stroke="rgba(245,200,66,.4)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M45 68 Q40 53 50 43 Q58 33 48 18 Q40 8 46 2"
                stroke="rgba(255,107,107,.3)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="passion-label sr-l">
            <span className="num">02</span> ✦ Stress Buster
          </div>
          <h2 className="passion-h2 sr">
            <span className="hi">Cooking</span>
            <br />
            <span
              style={{
                fontSize: "0.5em",
                fontWeight: 300,
                color: "var(--muted)",
              }}
            >
              — the original debugging session.
            </span>
          </h2>

          <div className="cooking-layout">
            <div className="sr-s d1">
              <div className="recipe-card">
                <div className="rc-title">
                  🍳 Prajakta's Stress-Buster Recipe
                </div>
                <div className="rc-sub">
                  Serves: 1 tired developer · Time: however long it takes
                </div>

                <div className="rc-ingredient">
                  <span className="qty">1 bag</span> favourite music playlist
                </div>
                <div className="rc-ingredient">
                  <span className="qty">2 hrs</span> of zero screen time
                </div>
                <div className="rc-ingredient">
                  <span className="qty">½ cup</span> whatever's in the fridge
                </div>
                <div className="rc-ingredient">
                  <span className="qty">1 pinch</span> creativity (always)
                </div>
                <div className="rc-ingredient">
                  <span className="qty">endless</span> chai breaks
                </div>
                <div className="rc-ingredient">
                  <span className="qty">1 tbsp</span> singing while cooking
                </div>

                <div className="rc-note">
                  *Method: put on music. chop things. forget about the bug.
                  <br />
                  the bug usually solves itself by step 3. 🪄
                </div>
              </div>
            </div>

            <div className="cooking-right sr-r d2">
              <div className="cooking-imgs">
                <div className="cook-img-wrap">
                  <img src="/asset/Cooking.jpg" alt="Chopping veggies" />
                  <div className="cook-img-ph">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity=".5"
                    >
                      <path d="M3 11l1-3h16l1 3" />
                      <path d="M2 11h20v7a2 2 0 01-2 2H4a2 2 0 01-2-2v-7z" />
                      <path d="M8 11V7" />
                      <path d="M12 11V5" />
                      <path d="M16 11V7" />
                    </svg>
                    add your
                    <br />
                    food photo
                  </div>
                  <div className="cook-label">the process 🍲</div>
                </div>
                <div className="cook-img-wrap">
                  <img src="/asset/CookingResult.jpg" alt="Cooking result" />
                  <div className="cook-img-ph">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity=".5"
                    >
                      <path d="M3 11l1-3h16l1 3" />
                      <path d="M2 11h20v7a2 2 0 01-2 2H4a2 2 0 01-2-2v-7z" />
                    </svg>
                    the result 🍽️
                    <br />
                    add photo
                  </div>
                  <div className="cook-label">the result ✨</div>
                </div>
              </div>

              <p className="cooking-copy">
                When the code stops making sense, the kitchen always does.
                There's something about{" "}
                <strong>the smell of something cooking</strong>, the rhythm of
                chopping, the steam rising — it resets my brain completely. I
                don't follow recipes. I follow
                <strong>instinct and hunger.</strong>
              </p>

              <div
                className="scribble-note"
                style={{ transform: "rotate(0.5deg)" }}
              >
                "A deploy failed? 10 minutes of cooking later — the solution
                just appeared. Kitchen &gt; rubber duck debugging."
              </div>

              <div className="mood-tags">
                <div className="mood-tag">🌶️ loves spice</div>
                <div className="mood-tag">🎵 always has music on</div>
                <div className="mood-tag">☕ chai mandatory</div>
                <div className="mood-tag">🧪 experimental cook</div>
                <div className="mood-tag">🍜 comfort food</div>
                <div className="mood-tag">✨ no recipe needed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="passion-block" id="singing">
          <div
            className="music-doodle"
            style={{
              top: "2rem",
              right: "12rem",
              "--fd": "3s",
              "--fdl": "0s",
              "--fr": "-8deg",
            }}
          >
            ♪
          </div>
          <div
            className="music-doodle"
            style={{
              top: "4rem",
              right: "6rem",
              "--fd": "4.5s",
              "--fdl": "0.5s",
              "--fr": "5deg",
              fontSize: "1.5rem",
            }}
          >
            ♫
          </div>
          <div
            className="music-doodle"
            style={{
              bottom: "4rem",
              left: "8rem",
              "--fd": "3.5s",
              "--fdl": "0.3s",
              "--fr": "-4deg",
            }}
          >
            🎵
          </div>
          <div
            className="music-doodle"
            style={{
              bottom: "2rem",
              left: "20rem",
              "--fd": "5s",
              "--fdl": "0.8s",
              "--fr": "7deg",
              fontSize: "0.85rem",
            }}
          >
            la la la~
          </div>

          <div className="passion-label sr-l">
            <span className="num">03</span> ✦ Another Passion
          </div>
          <h2 className="passion-h2 sr">
            <span className="hi">Singing</span>
            <br />
            <span
              style={{
                fontSize: "0.5em",
                fontWeight: 300,
                color: "var(--muted)",
              }}
            >
              — my life has a soundtrack.
            </span>
          </h2>

          <div className="singing-layout">
            <div className="sr-l d1">
              <div className="cassette-wrap">
                <div className="cassette">
                  <div className="cassette-label">
                    <div className="cl-title">Prajakta's Mix Tape</div>
                    <div className="cl-sub">
                      Vol. I — "My Life Has a Soundtrack" 🎵
                    </div>
                  </div>
                  <div className="cassette-reels">
                    <div className="reel">
                      <div
                        className="reel-spoke"
                        style={{ transform: "rotate(0deg)" }}
                      ></div>
                      <div
                        className="reel-spoke"
                        style={{ transform: "rotate(120deg)" }}
                      ></div>
                      <div
                        className="reel-spoke"
                        style={{ transform: "rotate(240deg)" }}
                      ></div>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--hand)",
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        textAlign: "center",
                      }}
                    >
                      ▶ playing
                      <br />
                      always
                    </div>
                    <div className="reel">
                      <div
                        className="reel-spoke"
                        style={{ transform: "rotate(0deg)" }}
                      ></div>
                      <div
                        className="reel-spoke"
                        style={{ transform: "rotate(120deg)" }}
                      ></div>
                      <div
                        className="reel-spoke"
                        style={{ transform: "rotate(240deg)" }}
                      ></div>
                    </div>
                  </div>
                  <div className="cassette-tape"></div>

                  <div className="waveform-wrap" id="waveform"></div>
                  <div className="cassette-window">
                    🎵 currently: whatever's in my head
                  </div>
                </div>
              </div>

              <div className="singing-photo-strip sr d3">
                <div className="strip-frame">
                  <div className="strip-ph">
                    add your singing moment photo 🎤
                  </div>
                </div>
                <div className="strip-frame">
                  <div className="strip-ph">add photo here 🎵</div>
                </div>
                <div className="strip-frame">
                  <div className="strip-ph">add photo ♪</div>
                </div>
              </div>
            </div>

            <div className="singing-right sr-r d2">
              <p className="singing-copy">
                Singing isn't something I do on stage — it's something I do
                <strong>everywhere else.</strong> In the kitchen, on the
                commute, at 2am while debugging. My life genuinely has a
                soundtrack and I am always tuned into it. Music is how I process
                everything — joy, stress, boredom, inspiration.
                <strong>If I'm humming, I'm probably focused.</strong>
              </p>

              <div
                className="scribble-note"
                style={{ transform: "rotate(1deg)" }}
              >
                "I once solved a layout bug because the song I was humming had
                the same rhythm as the broken animation. Coincidence? I think
                not."
              </div>

              <div className="playlist sr d3">
                <div className="pl-header">
                  <span>Prajakta's Current Vibes</span>
                  <span>
                    <span className="live-dot"></span>always on
                  </span>
                </div>
                <div className="pl-item now-playing">
                  <span className="pl-num">▶</span>
                  <span className="pl-title">anything with a good melody</span>
                  <span className="pl-vibe">♫ on repeat</span>
                </div>
                <div className="pl-item">
                  <span className="pl-num">02</span>
                  <span className="pl-title">songs that tell a story</span>
                  <span className="pl-vibe">✨ fave genre</span>
                </div>
                <div className="pl-item">
                  <span className="pl-num">03</span>
                  <span className="pl-title">kitchen cooking playlist</span>
                  <span className="pl-vibe">🍳 collab</span>
                </div>
                <div className="pl-item">
                  <span className="pl-num">04</span>
                  <span className="pl-title">2am debugging session mix</span>
                  <span className="pl-vibe">💻 essential</span>
                </div>
                <div className="pl-item">
                  <span className="pl-num">05</span>
                  <span className="pl-title">
                    songs I know every single word of
                  </span>
                  <span className="pl-vibe">🎤 obviously</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Service section */}
        <section id="services">
          <div className="services-inner">
            <div className="services-top sr">
              <div>
                <div className="section-eyebrow">What I Offer</div>
                <h2 className="services-h2">
                  MY
                  <br />
                  <em>SERVICES</em>
                </h2>
              </div>
              <div className="services-side">
                <p className="services-note">
                  From Figma wireframes to deployed MERN applications — I handle
                  the full journey. No middlemen.
                </p>
              </div>
            </div>
            <div className="svc-grid">
              <div className="svc-card sr">
                <div className="svc-num">01 ✦</div>
                <span className="svc-icon">⬡</span>
                <h3 className="svc-name">UI/UX Design</h3>
                <p className="svc-desc">
                  Figma wireframes, interactive prototypes and design systems
                  that convert. Pixel-perfect, mobile-first, user-centred —
                  proven on DocuPitch, Tyre Junction and more.
                </p>
                <div className="svc-price">
                  💬 Starting at ₹8,000 <span>/ project</span>
                </div>
              </div>

              <div className="svc-card sr d1">
                <div className="svc-num">02 ✦</div>
                <span className="svc-icon">◈</span>
                <h3 className="svc-name">Full-Stack Dev</h3>
                <p className="svc-desc">
                  React + Node.js + MongoDB + Express. From REST APIs to full
                  dashboards, JWT auth, protected routes and reusable component
                  libraries — clean, scalable code.
                </p>
                <div className="svc-price">
                  💬 Starting at ₹15,000 <span>/ project</span>
                </div>
              </div>

              <div className="svc-card sr d2">
                <div className="svc-num">03 ✦</div>
                <span className="svc-icon">◎</span>
                <h3 className="svc-name">Admin Dashboards</h3>
                <p className="svc-desc">
                  Role-based CMS panels, CRUD modules, stat cards, charts and
                  slot-booking systems. Full MERN stack, secure and
                  production-ready — like the portfolio CMS I built at
                  SociologiQ.
                </p>
                <div className="svc-price">
                  💬 Starting at ₹20,000 <span>/ project</span>
                </div>
              </div>

              <div className="svc-card sr">
                <div className="svc-num">04 ✦</div>
                <span className="svc-icon">⬟</span>
                <h3 className="svc-name">Landing Pages</h3>
                <p className="svc-desc">
                  High-converting landing pages with stunning UI,
                  micro-animations and SEO-friendly structure. Delivered fast —
                  typically 5–7 working days from Figma to deployed.
                </p>
                <div className="svc-price">
                  💬 Starting at ₹6,000 <span>/ page</span>
                </div>
              </div>

              <div className="svc-card sr d1">
                <div className="svc-num">05 ✦</div>
                <span className="svc-icon">◇</span>
                <h3 className="svc-name">Desktop Apps</h3>
                <p className="svc-desc">
                  Python + PySide6/Qt desktop applications with rich UI,
                  role-based access and data-export features. Already shipped
                  the Vedic Maths platform — cross-platform and
                  production-ready.
                </p>
                <div className="svc-price">
                  💬 Starting at ₹12,000 <span>/ project</span>
                </div>
              </div>

              <div className="svc-card sr d2">
                <div className="svc-num">06 ✦</div>
                <span className="svc-icon">⬖</span>
                <h3 className="svc-name">MVP to Launch</h3>
                <p className="svc-desc">
                  Got a napkin idea? I'll help you scope, design and ship an MVP
                  in 2–4 weeks. One person, full ownership, zero handoff chaos.
                  Let's validate your idea fast.
                </p>
                <div className="svc-price">
                  💬 Starting at ₹25,000 <span>/ MVP</span>
                </div>
              </div>

              <div
                className="svc-card stack-search-card"
                aria-label="Find my stack word search"
              >
                <ClickSpark className="stack-paper">
                  <div className="stack-search-top">
                    <div>
                      <span>Still curious?</span>
                      <strong>Find My Stack</strong>
                    </div>
                    <button
                      type="button"
                      className="stack-reset"
                      onClick={() => setSelectedStackCells(new Set())}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="stack-search-score" aria-live="polite">
                    {completedStackWords.length === stackSearchWords.length
                      ? "Full stack unlocked"
                      : `${completedStackWords.length}/${stackSearchWords.length} found`}
                  </div>
                  <div className="stack-search-grid">
                    {stackSearchRows.map((row, rowIndex) =>
                      row.map((letter, letterIndex) => {
                        const cellKey = `${rowIndex}-${letterIndex}`;
                        const isSelected = selectedStackCells.has(cellKey);
                        const isFound = completedStackCells.has(cellKey);

                        return (
                          <button
                            type="button"
                            className={`stack-cell${isSelected ? " is-selected" : ""}${isFound ? " is-found" : ""}`}
                            key={cellKey}
                            aria-label={`Letter ${letter}`}
                            aria-pressed={isSelected}
                            onClick={() => toggleStackCell(cellKey)}
                          >
                            {letter}
                          </button>
                        );
                      }),
                    )}
                  </div>
                  <div className="stack-search-list">
                    {stackSearchWords.map((word) => (
                      <span
                        className={completedStackNames.includes(word.name) ? "is-complete" : ""}
                        key={word.name}
                      >
                        {word.name}
                      </span>
                    ))}
                  </div>
                  <p className="stack-search-note">
                    Tap letters like sticky keyboard keys. The spark is your tiny high-five.
                  </p>
                </ClickSpark>
              </div>
            </div>

            <div
              className="sr services-process-grid"
              style={{
                marginTop: "4rem",
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "1px",
                background: "var(--border)",
              }}
            >
              <div
                className="services-process-step"
                style={{
                  background: "var(--bg2)",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--hand)",
                    fontSize: "2rem",
                    color: "var(--yellow)",
                    marginBottom: ".4rem",
                  }}
                >
                  01
                </div>
                <div
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: ".85rem",
                    fontWeight: 700,
                    marginBottom: ".4rem",
                    color: "var(--cream)",
                  }}
                >
                  Discovery Call
                </div>
                <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                  Free 30-min call to understand your goals, timeline and budget
                </div>
              </div>
              <div
                className="services-process-step"
                style={{
                  background: "var(--bg2)",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--hand)",
                    fontSize: "2rem",
                    color: "var(--yellow)",
                    marginBottom: ".4rem",
                  }}
                >
                  02
                </div>
                <div
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: ".85rem",
                    fontWeight: 700,
                    marginBottom: ".4rem",
                    color: "var(--cream)",
                  }}
                >
                  Design &amp; Plan
                </div>
                <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                  Wireframes, prototypes and a clear project plan before a
                  single line of code
                </div>
              </div>
              <div
                className="services-process-step"
                style={{
                  background: "var(--bg2)",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--hand)",
                    fontSize: "2rem",
                    color: "var(--yellow)",
                    marginBottom: ".4rem",
                  }}
                >
                  03
                </div>
                <div
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: ".85rem",
                    fontWeight: 700,
                    marginBottom: ".4rem",
                    color: "var(--cream)",
                  }}
                >
                  Build &amp; Review
                </div>
                <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                  Regular updates, weekly demos, feedback at every step — no
                  surprises
                </div>
              </div>
              <div
                className="services-process-step"
                style={{
                  background: "var(--bg2)",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--hand)",
                    fontSize: "2rem",
                    color: "var(--yellow)",
                    marginBottom: ".4rem",
                  }}
                >
                  04
                </div>
                <div
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: ".85rem",
                    fontWeight: 700,
                    marginBottom: ".4rem",
                    color: "var(--cream)",
                  }}
                >
                  Ship &amp; Support
                </div>
                <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                  Deployed, QA tested and 2 weeks of free post-launch support
                  included
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div
            className="f-sticker sr"
            style={{ top: "8%", right: "4%", transform: "rotate(-5deg)" }}
            id="fstk1"
          >
            🔥 open for work!
          </div>
          <div
            className="f-sticker sr d1"
            style={{
              top: "15%",
              right: "16%",
              background: "var(--purple)",
              color: "#fff",
              transform: "rotate(3deg)",
            }}
            id="fstk2"
          >
            👋 drag me!
          </div>
          <div
            className="f-sticker sr d2"
            style={{ bottom: "18%", right: "6%", transform: "rotate(-2deg)" }}
            id="fstk3"
          >
            ☕ reply in &lt;24h
          </div>

          <div className="contact-inner">
            <div className="sr-l">
              <div className="section-eyebrow">Let's Work Together</div>
              <h2 className="contact-h2">
                HAVE AN
                <br />
                <em>IDEA?</em>
                <br />
                LET'S BUILD.
              </h2>
              <p className="contact-blurb">
                I'm Prajakta — a UI Developer who owns the full journey from
                wireframe to deployment. No middlemen, no bloat. Just clean code
                and thoughtful design.
              </p>
              <div>
                <div className="contact-info-row">
                  <span className="cir-label">Email</span>
                  <span className="cir-val">
                    <a href="mailto:prajakta.bansod@gmail.com">
                      prajakta.bansod@gmail.com
                    </a>
                  </span>
                </div>
                <div className="contact-info-row">
                  <span className="cir-label">Location</span>
                  <span className="cir-val">
                    Pune, India · Remote Worldwide 🌍
                  </span>
                </div>
                <div className="contact-info-row">
                  <span className="cir-label">Status</span>
                  <span
                    className="cir-val"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".6rem",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--green)",
                        animation: "blink 2s ease-in-out infinite",
                        flexShrink: "0",
                        display: "inline-block",
                      }}
                    ></span>
                    <span style={{ color: "var(--green)" }}>
                      Available for new projects
                    </span>
                  </span>
                </div>
                <div className="contact-info-row">
                  <span className="cir-label">LinkedIn</span>
                  <span className="cir-val">
                    <a href="#">linkedin.com/in/prajakta-bansod</a>
                  </span>
                </div>
              </div>

              <div className="social-cta-row">
                <a
                  href="https://github.com/prajakta-98"
                  target="_blank"
                  className="social-cta-link"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/prajakta-bansod/"
                  target="_blank"
                  className="social-cta-link"
                >
                  LinkedIn ↗
                </a>
                <a href="#" className="social-cta-link">
                  Dribbble ↗
                </a>
              </div>
            </div>

            <div className="contact-form-area sr-r d1">
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "-8px",
                  position: "relative",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(245,200,66,.7)",
                    width: "80px",
                    height: "12px",
                    transform: "rotate(-1deg)",
                  }}
                ></div>
              </div>
              <div className="form-paper" id="contact-form-paper">
                <div className="form-paper-title">Send me a note ✉️</div>
                <form
                  id="contact-form"
                  data-recipient="prajaktab777@gmail.com"
                  noValidate
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="New portfolio enquiry from Prajakta Beyond the Code"
                  />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="text"
                    name="_honey"
                    className="form-honeypot"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div className="form-row">
                    <div className="f-group">
                      <label className="f-label" htmlFor="cf-name">
                        Your name *
                      </label>
                      <input
                        type="text"
                        className="f-input"
                        id="cf-name"
                        name="name"
                        required
                        placeholder="Priya Sharma"
                        autoComplete="name"
                        aria-describedby="cf-name-error"
                      />
                      <div
                        className="f-error"
                        id="cf-name-error"
                        aria-live="polite"
                      ></div>
                    </div>
                    <div className="f-group">
                      <label className="f-label" htmlFor="cf-email">
                        Email address *
                      </label>
                      <input
                        type="email"
                        className="f-input"
                        id="cf-email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        autoComplete="email"
                        aria-describedby="cf-email-error"
                      />
                      <div
                        className="f-error"
                        id="cf-email-error"
                        aria-live="polite"
                      ></div>
                    </div>
                  </div>
                  <div className="f-group">
                    <label className="f-label" htmlFor="cf-service">
                      What do you need? *
                    </label>
                    <select
                      className="f-input"
                      id="cf-service"
                      name="service"
                      required
                      style={{
                        background: "rgba(255,255,255,.6)",
                        fontFamily: "var(--hand)",
                        fontSize: "1rem",
                        color: "#444",
                      }}
                      aria-describedby="cf-service-error"
                    >
                      <option value="">— pick a service —</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Full-Stack Development">
                        Full-Stack Development
                      </option>
                      <option value="Admin Dashboard / CMS">
                        Admin Dashboard / CMS
                      </option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Desktop App">Desktop App</option>
                      <option value="MVP to Launch">MVP to Launch</option>
                      <option value="Something else!">Something else!</option>
                    </select>
                    <div
                      className="f-error"
                      id="cf-service-error"
                      aria-live="polite"
                    ></div>
                  </div>
                  <div className="f-group">
                    <label className="f-label">Approximate budget? *</label>
                    <div
                      className="budget-opts"
                      id="cf-budget"
                      aria-describedby="cf-budget-error"
                    >
                      <label className="budget-opt">
                        <input type="radio" name="budget" value="Under ₹5k" />{" "}
                        Under ₹5k
                      </label>
                      <label className="budget-opt">
                        <input type="radio" name="budget" value="₹5k – 15k" />{" "}
                        ₹5k – 15k
                      </label>
                      <label className="budget-opt">
                        <input type="radio" name="budget" value="₹15k – 30k" />{" "}
                        ₹15k – 30k
                      </label>
                      <label className="budget-opt">
                        <input type="radio" name="budget" value="₹30k+" /> ₹30k+
                      </label>
                    </div>
                    <div
                      className="f-error"
                      id="cf-budget-error"
                      aria-live="polite"
                    ></div>
                  </div>
                  <div className="f-group">
                    <label className="f-label" htmlFor="cf-msg">
                      Tell me about your project *
                    </label>
                    <textarea
                      className="f-input"
                      id="cf-msg"
                      name="message"
                      required
                      placeholder="What are you building? What's the timeline?"
                      aria-describedby="cf-msg-error"
                    ></textarea>
                    <div
                      className="f-error"
                      id="cf-msg-error"
                      aria-live="polite"
                    ></div>
                  </div>
                  <div
                    className="form-status"
                    id="form-status"
                    aria-live="polite"
                  ></div>
                  <button type="submit" className="f-submit" id="f-btn">
                    <span id="f-btn-txt">Send this note 📬</span>
                    <span id="f-btn-arrow">→</span>
                  </button>
                </form>
                <div
                  id="form-success"
                  style={{
                    display: "none",
                    textAlign: "center",
                    padding: "2rem",
                    fontFamily: "var(--hand)",
                    fontSize: "1.4rem",
                    color: "var(--purple)",
                  }}
                >
                  🎉 Message received! I'll reply within 24 hours.
                </div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  marginTop: ".8rem",
                  fontFamily: "var(--hand)",
                  fontSize: ".85rem",
                  color: "var(--muted)",
                  transform: "rotate(-1deg)",
                }}
              >
                promise I read every single one ✌️
              </div>
            </div>
          </div>
        </section>

        <section id="beyond-cta">
          <div className="beyond-cta-inner">
            <div className="cta-scribble sr">
              so now you know the whole picture →
            </div>
            <h2 className="cta-h2 sr d1">
              developer. photographer.
              <br />
              chef. singer.
              <br />
              <em>all the same person.</em>
            </h2>
            <p
              className="sr d2"
              style={{
                fontFamily: "var(--hand)",
                fontSize: "1.2rem",
                color: "var(--muted)",
                marginBottom: "3rem",
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.6,
              }}
            >
              And she writes really clean UI code too. MIT certified. 3+ years
              shipped. Currently available for freelance projects.
            </p>
            <div className="cta-btns sr d2">
              <a href="#contact" className="cta-btn-p">
                Let's Work Together ↗
              </a>
              <a
                href="https://drive.google.com/file/d/13RQkO5hJcCe2cM1Dp0rHXczJkI5oEKQb/view?usp=drive_link"
                className="cta-btn-resume"
                id="resume-btn"
                download
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
              <a href="#photography" className="cta-btn-g">
                back to the fun stuff 👀
              </a>
            </div>

            <div className="trust-bar sr d3">
              <div className="trust-item">
                <div className="tn">2+</div>
                <div className="tl">Years of experience</div>
              </div>
              <div className="trust-item">
                <div className="tn">4</div>
                <div className="tl">Live projects shipped</div>
              </div>
              <div className="trust-item">
                <div className="tn">MIT</div>
                <div className="tl">Certified UI/UX designer</div>
              </div>
              <div className="trust-item">
                <div className="tn">MCA</div>
                <div className="tl">Master's in Computer Applications</div>
              </div>
              <div className="trust-item">
                <div className="tn">24h</div>
                <div className="tl">Average reply time</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
