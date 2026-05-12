import { useEffect } from "react";
import useBodyClass from "../hooks/useBodyClass.js";

const projects = {
  project1: {
    title: "Tyre Junction | Prajakta Bansod",
    label: "01 / Retail Commerce",
    heading: (
      <>
        Tyre <em>Junction</em>
      </>
    ),
    summary:
      "A product-first storefront concept for the automotive segment, focused on fast catalogue scanning, high-trust buying cues and smoother lead capture for buyers who compare before they commit.",
    pills: ["UI Architecture", "React Frontend", "Conversion UX"],
    image: "/asset/project-tyre-junction.svg",
    imageAlt: "Tyre Junction preview",
    metrics: [
      ["3-step", "shopping path designed for quick enquiry submission"],
      ["Clean SKU", "grouping for brand, size and usage-specific browsing"],
      ["Mobile-first", "layout tuned for users comparing products on the go"],
    ],
    challenge:
      "Automotive storefronts usually feel dense and overly technical. The brief was to make product selection easier without dumbing down the information.",
    approach: [
      "Introduced clearer hierarchy between category, product and CTA zones.",
      "Used cards and filters that reduce scanning effort on long listings.",
      "Kept trust markers close to action points to improve conversion intent.",
    ],
    outcome:
      "The result is a sharper buying flow with cleaner visual structure, better information rhythm and a more premium feel for a practical commerce use case.",
  },
  project2: {
    title: "DocuPitch AI | Prajakta Bansod",
    label: "02 / AI Product",
    heading: (
      <>
        DocuPitch <em>AI</em>
      </>
    ),
    summary:
      "A guided product workflow that helps founders transform scattered notes into investor-facing stories, deck structures and pitch-ready content using LLMs.",
    pills: ["Prompt UX", "Dashboard Design", "Flow Simplification"],
    image: "/asset/project-docupitch-ai.svg",
    imageAlt: "DocuPitch AI preview",
    metrics: [
      ["Input to output", "structured into one guided generation journey"],
      ["AI clarity", "through progressive disclosure instead of prompt overload"],
      ["Deck-ready", "sections shaped for immediate founder use and review"],
    ],
    challenge:
      "AI products become confusing quickly when every input field competes for attention. This concept needed confidence, not complexity.",
    approach: [
      "Organised the workflow into digestible blocks with clear next actions.",
      "Balanced structured forms with generative flexibility for better output.",
      "Used strong status and result states so users always know where they are.",
    ],
    outcome:
      "The interface feels more product-led than experimental, which is critical when AI has to support high-trust business communication.",
  },
  project3: {
    title: "Flux Payments | Prajakta Bansod",
    label: "03 / Fintech Operations",
    heading: (
      <>
        Flux <em>Payments</em>
      </>
    ),
    summary:
      "A monitoring and controls interface for cross-border transaction flows, designed to make approvals, exceptions and settlement status easier to act on.",
    pills: ["Fintech UI", "Data Visibility", "Operational Workflows"],
    image: "/asset/project-flux-payments.svg",
    imageAlt: "Flux Payments preview",
    metrics: [
      ["Realtime", "status visibility for approval and settlement checkpoints"],
      ["Risk-aware", "screen hierarchy built around the most critical actions first"],
      ["Readable", "data presentation simplified for faster operational decisions"],
    ],
    challenge:
      "Payment operations products can collapse into noisy dashboards. The system needed to communicate urgency without overwhelming the user.",
    approach: [
      "Separated high-priority transaction controls from secondary analytics.",
      "Used contrast and spacing to make risk states more immediately legible.",
      "Created card-based modules that can scale with additional workflows later.",
    ],
    outcome:
      "The resulting concept feels cleaner, faster and more executive-ready while preserving the depth required for a serious fintech product.",
  },
};

export default function ProjectDetailPage({ projectId }) {
  const project = projects[projectId] ?? projects.project1;
  useBodyClass("project-detail-page");

  useEffect(() => {
    document.title = project.title;
  }, [project.title]);

  return (
    <main className="project-detail-shell">
      <a className="detail-back" href="/#work">
        ← Back to work
      </a>

      <section className="detail-hero">
        <div>
          <div className="detail-label">{project.label}</div>
          <h1 className="detail-title">{project.heading}</h1>
          <p className="detail-summary">{project.summary}</p>
          <div className="detail-pills">
            {project.pills.map((pill) => (
              <span key={pill}>{pill}</span>
            ))}
          </div>
        </div>

        <div className="detail-visual">
          <img src={project.image} alt={project.imageAlt} />
        </div>
      </section>

      <div className="detail-metrics">
        {project.metrics.map(([value, label]) => (
          <div className="detail-metric" key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <section className="detail-grid">
        <article className="detail-card">
          <h3>Challenge</h3>
          <p>{project.challenge}</p>
        </article>
        <article className="detail-card">
          <h3>Approach</h3>
          <ul className="detail-list">
            {project.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="detail-card">
          <h3>Outcome</h3>
          <p>{project.outcome}</p>
        </article>
      </section>
    </main>
  );
}
