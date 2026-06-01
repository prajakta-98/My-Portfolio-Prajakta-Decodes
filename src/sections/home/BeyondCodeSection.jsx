import { useEffect, useState } from "react";
import SiteIcon from "../../components/common/SiteIcon.jsx";
import beyondCodeCards from "../../data/beyondCodeCards.js";

const PRINT_INTERVAL_MS = 3350;

const introCopy =
  "A small peek at the tabs running behind developer mode: light, process, rhythm, and a serious relationship with tiny details.";

const musicWaveformLevels = [
  3, 5, 7, 6, 9, 12, 8, 4, 5, 10, 14, 11, 7, 5, 9, 13, 16, 12, 8, 6,
  4, 7, 10, 15, 13, 9, 6, 8, 12, 17, 14, 10,
];

export default function BeyondCodeSection() {
  const [printStep, setPrintStep] = useState(0);
  const [activeInterest, setActiveInterest] = useState("photography");
  const photography = beyondCodeCards.find((card) => card.kind === "photography");
  const cooking = beyondCodeCards.find((card) => card.kind === "cooking");
  const singing = beyondCodeCards.find((card) => card.kind === "singing");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPrintStep((step) => step + 1);
    }, PRINT_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const personalApps = [
    {
      kind: "photography",
      icon: "camera",
      label: "Photography",
      caption: "light collector",
      command: "capture --golden-hour",
      image: photography.image,
      imageAlt: photography.imageAlt,
      description: photography.description,
      details: photography.details,
      tabImages: photography.tabImages,
    },
    {
      kind: "cooking",
      icon: "chef",
      label: "Cooking",
      caption: "spice QA",
      command: "recipe --taste-test",
      image: cooking.image,
      imageAlt: cooking.imageAlt,
      description: cooking.description,
      details: cooking.details,
      tabImages: cooking.tabImages,
    },
    {
      kind: "singing",
      icon: "music",
      label: "Singing",
      caption: "playlist drama",
      command: "play --mood-board",
      image: singing.image,
      imageAlt: singing.imageAlt,
      description: singing.description,
      details: singing.details,
      tabImages: singing.tabImages,
      playlist: singing.playlist,
    },
  ];
  const activeApp =
    personalApps.find((app) => app.kind === activeInterest) ?? personalApps[0];
  const activeTabPhotos = activeApp.tabImages?.length
    ? activeApp.tabImages
    : [
        {
          src: activeApp.image,
          alt: activeApp.imageAlt,
          caption: activeApp.label,
        },
      ];
  const activeFeaturePhoto = activeTabPhotos[0];
  const activePlaylist = activeApp.playlist ?? {
    title: "Quiet Performance Mode",
    supportLine:
      "A personal soundtrack for focus, feeling, and a little drama.",
    href: "https://open.spotify.com/playlist/6qcxVVHQGvlG2ODow8NfCa?si=QDPkzYMSThu834LtPwPJqQ",
    ctaLabel: "Open Playlist ↗",
  };

  const printedPhotos = [
    {
      src: photography.image,
      alt: photography.imageAlt,
      caption: "golden hour evidence",
    },
    {
      src: cooking.image,
      alt: cooking.imageAlt,
      caption: "spice experiment passed",
    },
    {
      src: singing.image,
      alt: singing.imageAlt,
      caption: "playlist took over",
    },
    {
      src: "/asset/ColorsAndChaos.jpg",
      alt: "Colorful creative detail photograph",
      caption: "tiny chaos, good color",
    },
    {
      src: "/asset/Flower2.jpg",
      alt: "Close-up of a flower with vibrant colors",
      caption: "flower power, up close",
    },
  ];

  const pilePositions = [
    { x: "2.75rem", y: "8.8rem", tilt: "8deg" },
    { x: "-2.95rem", y: "8.55rem", tilt: "-10deg" },
    { x: "1.85rem", y: "10.45rem", tilt: "5deg" },
    { x: "-2.2rem", y: "11rem", tilt: "-7deg" },
    { x: "-0.35rem", y: "11.35rem", tilt: "-2deg" },
  ];
  const currentPhotoIndex = printStep % printedPhotos.length;
  const stagedPhotos = pilePositions.map((position, stackIndex) => {
    const age = pilePositions.length - stackIndex - 1;
    const photoIndex = (currentPhotoIndex - age + printedPhotos.length) % printedPhotos.length;

    return {
      ...printedPhotos[photoIndex],
      ...position,
      isPrinting: stackIndex === pilePositions.length - 1,
      stackIndex,
    };
  });

  return (
    <section className="beyond-code-compact" id="beyond-code">
      <div className="beyond-code-inner beyond-motion-inner">
        <header className="beyond-code-head beyond-motion-head">
          <div>
            <div className="section-eyebrow sr">Beyond Code</div>
            <h2 className="sr d1">Personal OS, still loading.</h2>
          </div>
          <p className="sr d2">{introCopy}</p>
        </header>

        <div className="personal-lab sr d2" aria-label="Personal interests beyond coding">
          <div className="personal-stage">
            <div className="personal-stage-copy">
              <span>Offline mode</span>
              <h3>Curious. Human. A little dramatic.</h3>
              <p>
                Outside code, I collect details, process, rhythm, and stories;
                the same things I bring into the interfaces I build.
              </p>
            </div>

            <figure
              className="instant-camera-scene"
              aria-label="Animated instant camera printing personal photos"
            >
              <div className="instant-camera" aria-hidden="true">
                <div className="instant-camera-top"></div>
                <div className="instant-flash"></div>
                <div className="instant-lens"></div>
                <div className="instant-button"></div>
                <div className="instant-rainbow"></div>
                <div className="instant-brand">PrajCam</div>
                <div className="instant-slot"></div>
              </div>

              <div className="instant-film-strip">
                {stagedPhotos.map((photo) => (
                  <div
                    className={`instant-print${photo.isPrinting ? " is-printing" : ""}`}
                    key={
                      photo.isPrinting ? `${printStep}-${photo.src}` : photo.src
                    }
                    style={{
                      "--print-x": photo.x,
                      "--print-y": photo.y,
                      "--print-tilt": photo.tilt,
                      "--print-z": photo.stackIndex + 1,
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{photo.caption}</span>
                  </div>
                ))}
              </div>
            </figure>

            <div className="personal-os" aria-label="Interactive personal OS">
              <div className="personal-os-chrome" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div
                className="personal-os-dock"
                role="tablist"
                aria-label="Personal interest apps"
              >
                {personalApps.map((item) => (
                  <button
                    type="button"
                    className={`personal-os-app${activeApp.kind === item.kind ? " is-active" : ""}`}
                    key={item.kind}
                    role="tab"
                    aria-selected={activeApp.kind === item.kind}
                    aria-controls="personal-os-panel"
                    onClick={() => setActiveInterest(item.kind)}
                  >
                    <span className="personal-os-icon">
                      <SiteIcon name={item.icon} size={18} />
                    </span>
                    <span>
                      <strong>{item.label}</strong>
                      <em>{item.caption}</em>
                    </span>
                  </button>
                ))}
              </div>

              <article
                className={`personal-os-panel is-${activeApp.kind}`}
                id="personal-os-panel"
                role="tabpanel"
              >
                <div className="personal-os-copy">
                  <span>{activeApp.command}</span>
                  <h3>{activeApp.label}</h3>
                  <p>{activeApp.description}</p>
                  <ul>
                    {activeApp.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {activeApp.kind === "photography" && (
                  <div
                    className="personal-camera-roll"
                    aria-label="Photography contact sheet"
                  >
                    {activeTabPhotos.map((photo) => (
                      <figure className="personal-polaroid" key={photo.src}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption>{photo.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                {activeApp.kind === "cooking" && (
                  <div
                    className="personal-recipe-ticket"
                    aria-label="Cooking process ticket"
                  >
                    <figure className="personal-feature-polaroid">
                      <img
                        src={activeFeaturePhoto.src}
                        alt={activeFeaturePhoto.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>{activeFeaturePhoto.caption}</figcaption>
                    </figure>
                    <div>
                      <span>Prep list</span>
                      {activeApp.details.map((detail) => (
                        <label key={detail}>
                          <input type="checkbox" checked readOnly />
                          {detail}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {activeApp.kind === "singing" && (
                  <div
                    className="personal-music-player"
                    aria-label="Singing mood player"
                  >
                    <div className="playlist-cover-art" aria-hidden="true">
                      <div className="playlist-cover-core">
                        <SiteIcon name="music" size={34} />
                        <strong>QPM</strong>
                        <span>mood board</span>
                      </div>
                    </div>

                    <div className="playlist-mood-card">
                      <div className="playlist-mood-head">
                        <span>Playlist Mood</span>
                        <h4>{activePlaylist.title}</h4>
                        <p>{activePlaylist.supportLine}</p>
                      </div>

                      <div className="playlist-tags" aria-label="Mood tags">
                        {activeApp.details.map((detail) => (
                          <span key={detail}>{detail}</span>
                        ))}
                      </div>
                    </div>

                    <div className="playlist-player-deck">
                      <div className="personal-waveform" aria-hidden="true">
                        {musicWaveformLevels.map((level, index) => (
                          <span
                            key={index}
                            className={index < 18 ? "is-played" : undefined}
                            style={{ "--level": level }}
                          ></span>
                        ))}
                      </div>

                      <div className="playlist-progress" aria-hidden="true">
                        <span></span>
                      </div>

                      <div className="playlist-player-row">
                        <div className="playlist-controls" aria-hidden="true">
                          <span>
                            <SiteIcon name="chevronLeft" size={15} />
                          </span>
                          <span className="is-main-control">
                            <SiteIcon name="play" size={16} />
                          </span>
                          <span>
                            <SiteIcon name="chevronRight" size={15} />
                          </span>
                        </div>

                        <a
                          className="playlist-cta"
                          href={activePlaylist.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {activePlaylist.ctaLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
