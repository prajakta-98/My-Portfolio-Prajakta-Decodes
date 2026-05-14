import SiteIcon from "../../components/common/SiteIcon.jsx";
import BeyondCodeSection from "./BeyondCodeSection.jsx";
import ContactSection from "./ContactSection.jsx";
import FinalCtaSection from "./FinalCtaSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import WorkSection from "./WorkSection.jsx";

export default function PortfolioSections() {
  return (
    <>
      <section id="beyond">
        <div className="beyond-grain"></div>
        <div
          className="bg-doodle hero-doodle-icon"
          style={{ top: "5%", left: "-3%", transform: "rotate(-8deg)" }}
        >
          <SiteIcon name="camera" size={72} />
        </div>
        <div
          className="bg-doodle hero-doodle-icon"
          style={{ top: "38%", right: "-2%", transform: "rotate(5deg)" }}
        >
          <SiteIcon name="music" size={86} />
        </div>
        <div
          className="bg-doodle hero-doodle-icon"
          style={{ bottom: "10%", left: "5%", transform: "rotate(-3deg)" }}
        >
          <SiteIcon name="chef" size={78} />
        </div>

        <div className="intro-wrap">
          <div className="intro-photo-panel">
            <div className="intro-polaroid">
              <img src="/asset/HeroImage.png" alt="Prajakta Bansod" />
              <div className="intro-polaroid-cap">
                Prajakta, Full-stack Developer | Pune, India
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
            <div className="name-doodle">that's me, btw</div>

            <div className="intro-eyebrow">
              <span className="dot"></span>
              Available for React, MERN and UI/UX projects
            </div>

            <h1 className="intro-direct-h1">
              I design and build client-ready web experiences.
            </h1>

            <h3 className="intro-h1" aria-label="Hello">
              <span className="hello-cycler" aria-hidden="true">
                <span className="hello-word" data-lang="English">
                  Hi
                </span>
                <span className="hello-word" data-lang="Hindi">
                  Namaste
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
                  Ola
                </span>
                <span className="hello-word" data-lang="Marathi">
                  Namaskar
                </span>
              </span>
            </h3>
            <div className="hello-lang-label" aria-live="polite">
              English
            </div>

            <div className="intro-about-blocks">
              <p className="intro-about-line ia1">
                <span className="ia-kicker">I am</span>
                <strong>Prajakta Bansod,</strong> a full-stack developer who
                turns product ideas into clear interfaces, reusable React
                components, and practical MERN applications.
              </p>
              <p className="intro-about-line ia2">
                <span className="ia-kicker">Ever since</span> I started building
                things, I've always had a special interest in crafting
                interfaces that feel as good as they look - from the most
                minimal interaction to the most elaborate UI.
              </p>
              <p className="intro-about-line ia3">
                <span className="ia-kicker">Good fit for</span> freelance
                websites, landing pages, dashboards, UI/UX to code conversion,
                and full-stack product builds.
              </p>
            </div>

            <div className="intro-role-strip">
              <span>React Developer</span>
              <span className="intro-role-dot">*</span>
              <span>UI / UX</span>
              <span className="intro-role-dot">*</span>
              <span>Fullstack</span>
              <span className="intro-role-dot">*</span>
              <span>Creative Coder</span>
            </div>

            <div className="intro-cta-row">
              <a href="#work" className="intro-primary-cta">
                View Work
              </a>
              <a href="#contact" className="intro-secondary-cta">
                Hire Me
              </a>
            </div>
          </div>
        </div>

        <WorkSection />
        <BeyondCodeSection />
        <ServicesSection />
        <ContactSection />
        <FinalCtaSection />
      </section>
    </>
  );
}
