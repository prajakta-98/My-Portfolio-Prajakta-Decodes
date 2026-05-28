import { useEffect, useState } from "react";
import beyondCodeCards from "../../data/beyondCodeCards.js";

const PRINT_INTERVAL_MS = 3350;

const introCopy =
  "A small peek at the tabs running behind developer mode: light, process, rhythm, and a serious relationship with tiny details.";

export default function BeyondCodeSection() {
  const [printStep, setPrintStep] = useState(0);
  const photography = beyondCodeCards.find((card) => card.kind === "photography");
  const cooking = beyondCodeCards.find((card) => card.kind === "cooking");
  const singing = beyondCodeCards.find((card) => card.kind === "singing");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPrintStep((step) => step + 1);
    }, PRINT_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const interestMoments = [
    {
      kind: "photo",
      label: "Photography",
      caption: "light collector",
      image: photography.image,
      imageAlt: photography.imageAlt,
    },
    {
      kind: "cooking",
      label: "Cooking",
      caption: "spice QA",
      image: cooking.image,
      imageAlt: cooking.imageAlt,
    },
    {
      kind: "singing",
      label: "Singing",
      caption: "playlist drama",
      image: singing.image,
      imageAlt: singing.imageAlt,
    },
  ];

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

              {/* <figcaption>
                printing proof that offline mode is not idle
              </figcaption> */}
            </figure>

            <div
              className="camera-interest-polaroids"
              aria-label="Personal interests represented as printed moments"
            >
              {interestMoments.map((item) => (
                <article
                  className={`camera-interest-polaroid is-${item.kind}`}
                  key={item.kind}
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
