import { useMemo, useState } from "react";
import ClickSpark from "../../components/common/ClickSpark.jsx";
import SiteIcon from "../../components/common/SiteIcon.jsx";
import { serviceProcessSteps, services } from "../../data/services.js";
import { stackSearchRows, stackSearchWords } from "../../data/stackSearch.js";

function StackSearchCard() {
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
    <div className="svc-card stack-search-card" aria-label="Find my stack word search">
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
          Interactive UI Experiment: a small frontend interaction built to show
          animation, state handling, and playful UI logic.
        </p>
      </ClickSpark>
    </div>
  );
}

export default function ServicesSection() {
  return (
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
              From Figma wireframes to deployed MERN applications - I handle the
              full journey. No middlemen.
            </p>
          </div>
        </div>
        <div className="svc-grid">
          {services.map((service, index) => (
            <div
              className={`svc-card sr${index % 3 === 1 ? " d1" : ""}${index % 3 === 2 ? " d2" : ""}`}
              key={service.name}
            >
              <div className="svc-num">{service.number}</div>
              <span className="svc-icon">
                <SiteIcon name={service.icon} size={22} />
              </span>
              <h3 className="svc-name">{service.name}</h3>
              <p className="svc-desc">{service.description}</p>
              <div className="svc-price">
                {service.price} <span>{service.unit}</span>
              </div>
            </div>
          ))}

          <StackSearchCard />
        </div>

        <div className="section-cta-row services-cta-row">
          <span>Need one of these?</span>
          <a href="#contact" className="section-primary-cta">
            Let's talk
          </a>
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
          {serviceProcessSteps.map((step) => (
            <div
              className="services-process-step"
              key={step.number}
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
                {step.number}
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
                {step.title}
              </div>
              <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
