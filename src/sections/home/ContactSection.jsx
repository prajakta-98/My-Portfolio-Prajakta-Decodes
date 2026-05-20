import SiteIcon from "../../components/common/SiteIcon.jsx";

const serviceOptions = [
  "UI/UX Design",
  "Full-Stack Development",
  "Admin Dashboard / CMS",
  "Landing Page",
  "Desktop App",
  "MVP to Launch",
  "Something else!",
];

const budgetOptions = [
  "Under Rs.5k",
  "Rs.5k - 15k",
  "Rs.15k - 30k",
  "Rs.30k+",
];

const availabilityItems = [
  "Freelance websites",
  "Landing pages",
  "React frontend work",
  "UI/UX to code conversion",
  "Full-stack MERN projects",
];

export default function ContactSection() {
  return (
    <section id="contact">
      <div
        className="f-sticker sr"
        style={{ top: "8%", right: "4%", transform: "rotate(-5deg)" }}
        id="fstk1"
      >
        <SiteIcon name="spark" size={16} /> open for work!
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
        <SiteIcon name="cursor" size={16} /> drag me!
      </div>
      <div
        className="f-sticker sr d2"
        style={{ bottom: "18%", right: "6%", transform: "rotate(-2deg)" }}
        id="fstk3"
      >
        <SiteIcon name="clock" size={16} /> reply in &lt;24h
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
            I'm Prajakta - a UI Developer who owns the full journey from
            wireframe to deployment. No middlemen, no bloat. Just clean code and
            thoughtful design.
          </p>
          <div className="contact-identity-card">
            <img
              src="/asset/HeroImage.png"
              alt="Prajakta Bansod"
              width="320"
              height="320"
              loading="lazy"
              decoding="async"
            />
            <div>
              <span>Directly working with</span>
              <strong>Prajakta Bansod</strong>
            </div>
          </div>
          <div className="contact-trust-panel">
            <span>Available for</span>
            <ul>
              {availabilityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
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
              <span className="cir-val contact-icon-text">
                Pune, India | Remote Worldwide <SiteIcon name="globe" size={15} />
              </span>
            </div>
            <div className="contact-info-row">
              <span className="cir-label">Status</span>
              <span
                className="cir-val"
                style={{ display: "flex", alignItems: "center", gap: ".6rem" }}
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
                <a href="https://www.linkedin.com/in/prajakta-bansod/">
                  linkedin.com/in/prajakta-bansod
                </a>
              </span>
            </div>
          </div>

          <div className="social-cta-row">
            <a
              href="https://github.com/prajakta-98"
              target="_blank"
              rel="noopener noreferrer"
              className="social-cta-link"
            >
              GitHub -&gt;
            </a>
            <a
              href="https://www.linkedin.com/in/prajakta-bansod/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-cta-link"
            >
              LinkedIn -&gt;
            </a>
            <a
              href="https://www.behance.net/prajaktabansod08"
              target="_blank"
              rel="noopener noreferrer"
              className="social-cta-link"
            >
              Behance -&gt;
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
            <div className="form-paper-title">
              <SiteIcon name="mail" size={18} /> Send me a note
            </div>
            <form id="contact-form" data-recipient="prajaktab777@gmail.com" noValidate>
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
                  <div className="f-error" id="cf-name-error" aria-live="polite"></div>
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
                  <div className="f-error" id="cf-email-error" aria-live="polite"></div>
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
                  <option value="">- pick a service -</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="f-error" id="cf-service-error" aria-live="polite"></div>
              </div>
              <fieldset className="f-group budget-fieldset">
                <legend className="f-label">Approximate budget? *</legend>
                <div
                  className="budget-opts"
                  id="cf-budget"
                  role="radiogroup"
                  aria-describedby="cf-budget-error"
                  aria-required="true"
                >
                  {budgetOptions.map((option) => (
                    <label className="budget-opt" key={option}>
                      <input type="radio" name="budget" value={option} required /> {option}
                    </label>
                  ))}
                </div>
                <div className="f-error" id="cf-budget-error" aria-live="polite"></div>
              </fieldset>
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
                <div className="f-error" id="cf-msg-error" aria-live="polite"></div>
              </div>
              <div
                className="form-status"
                id="form-status"
                role="status"
                aria-live="polite"
              ></div>
              <button
                type="submit"
                className="f-submit"
                id="f-btn"
                aria-describedby="form-status"
              >
                <span id="f-btn-txt">Send this note</span>
                <span id="f-btn-arrow">
                  <SiteIcon name="send" size={16} />
                </span>
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
              Message received! I'll reply within 24 hours.
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
            promise I read every single one
          </div>
        </div>
      </div>
    </section>
  );
}
