import beyondCodeCards from "../../data/beyondCodeCards.js";

export default function BeyondCodeSection() {
  return (
    <section className="beyond-code-compact" id="beyond-code">
      <div className="beyond-code-inner">
        <div className="section-eyebrow">Beyond Code</div>
        <div className="beyond-code-head">
          <h2>What my interests bring into my work.</h2>
          <p>A shorter glimpse of the person behind the interface - useful, not endless.</p>
        </div>
        <div className="beyond-code-grid">
          {beyondCodeCards.map((card) => (
            <article className="beyond-code-card" key={card.title}>
              <span>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
