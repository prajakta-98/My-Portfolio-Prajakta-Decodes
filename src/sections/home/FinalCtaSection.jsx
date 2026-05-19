const trustItems = [
  ["2+", "Years of experience"],
  ["4", "Live projects shipped"],
  ["MIT", "Certified UI/UX designer"],
  ["MCA", "Master's in Computer Applications"],
  ["24h", "Average reply time"],
];

const resumePath = "/asset/prajakta-bansod-resume.pdf";

export default function FinalCtaSection() {
  return (
    <section id="beyond-cta">
      <div className="beyond-cta-inner">
        <div className="cta-scribble sr">so now you know the whole picture</div>
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
          Like the way I think and build? Let's create something together.
        </p>
        <div className="cta-btns sr d2">
          <a href="#contact" className="cta-btn-p">
            Hire Me
          </a>
          <a
            href={resumePath}
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
          <a href="#beyond-code" className="cta-btn-g">
            Beyond Code
          </a>
          <a
            href="https://www.linkedin.com/in/prajakta-bansod/"
            className="cta-btn-g"
            target="_blank"
            rel="noopener noreferrer"
          >
            View LinkedIn
          </a>
        </div>

        <div className="trust-bar sr d3">
          {trustItems.map(([value, label]) => (
            <div className="trust-item" key={label}>
              <div className="tn">{value}</div>
              <div className="tl">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
