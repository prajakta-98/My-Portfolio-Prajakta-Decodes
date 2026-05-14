import WorkCardSwap from "../../components/work/WorkCardSwap.jsx";

export default function WorkSection() {
  return (
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
            A quick look at the websites, apps and interfaces I have designed and
            built.
          </p>
        </div>
        <div className="archive-scene">
          <div className="archive-scene-copy">
            <WorkCardSwap />
            <div className="section-cta-row">
              <a href="#contact" className="section-primary-cta">
                Discuss a project
              </a>
              <a href="#services" className="section-secondary-cta">
                See services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
