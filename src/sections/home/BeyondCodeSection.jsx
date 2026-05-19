import SiteIcon from "../../components/common/SiteIcon.jsx";
import beyondCodeCards from "../../data/beyondCodeCards.js";

const waveformBars = [34, 52, 28, 64, 42, 58, 32, 48, 68, 38, 56, 30];

export default function BeyondCodeSection() {
  const photography = beyondCodeCards.find((card) => card.kind === "photography");
  const cooking = beyondCodeCards.find((card) => card.kind === "cooking");
  const singing = beyondCodeCards.find((card) => card.kind === "singing");

  return (
    <section className="beyond-code-compact" id="beyond-code">
      <div className="beyond-code-inner">
        <div className="section-eyebrow sr">Beyond Code</div>
        <div className="beyond-code-head">
          <h2 className="sr d1">Creativity with a point of view.</h2>
          <p className="sr d2">
            Creativity does not come from one place. Photography helps me
            notice details, cooking teaches me process and experimentation, and
            singing keeps me connected to rhythm, emotion, and expression.
            Together, they shape the way I design and build digital
            experiences.
          </p>
        </div>

        <div className="beyond-code-studio">
          <article className="beyond-panel beyond-panel-photo sr d2">
            <div className="panel-tag">
              <span>{photography.number}</span>
              <SiteIcon name="camera" size={16} />
            </div>
            <div className="photo-collage" aria-hidden="true">
              <figure className="mini-polaroid mini-polaroid-main">
                <img
                  src={photography.image}
                  alt=""
                  width="900"
                  height="1525"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>golden hour</figcaption>
              </figure>
              {photography.supportingImages.map((image, index) => (
                <figure
                  className={`mini-polaroid mini-polaroid-${index + 2}`}
                  key={image.src}
                >
                  <img
                    src={image.src}
                    alt=""
                    width="800"
                    height="1422"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="panel-copy">
              <div className="panel-copy-text">
                <p className="panel-kicker">Photography</p>
                <h3>{photography.description}</h3>
              </div>
              <div className="panel-chips">
                {photography.details.map((detail) => (
                  <span key={detail}>{detail}</span>
                ))}
              </div>
            </div>
          </article>

          <article className="beyond-panel beyond-panel-cooking sr d3">
            <div className="paper-tape"></div>
            <div className="recipe-note">
              <div className="panel-tag">
                <span>{cooking.number}</span>
                <SiteIcon name="chef" size={16} />
              </div>
              <p className="panel-kicker">Cooking</p>
              <h3>{cooking.description}</h3>
              <div className="recipe-note-body">
                <ul>
                  {cooking.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <img
                  src={cooking.image}
                  alt={cooking.imageAlt}
                  width="1600"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </article>

          <article className="beyond-panel beyond-panel-singing sr d4">
            <div className="music-player-mini">
              <div className="music-player-top">
                <div>
                  <p className="panel-kicker">Singing</p>
                  <h3>{singing.description}</h3>
                </div>
                <div className="panel-tag">
                  <span>{singing.number}</span>
                  <SiteIcon name="music" size={16} />
                </div>
              </div>

              <div className="waveform-mini" aria-hidden="true">
                {waveformBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    style={{
                      "--bar-h": `${height}%`,
                      "--bar-delay": `${index * 0.08}s`,
                    }}
                  ></span>
                ))}
              </div>

              <div className="playlist-mini">
                {singing.details.map((detail, index) => (
                  <div className="playlist-mini-row" key={detail}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
