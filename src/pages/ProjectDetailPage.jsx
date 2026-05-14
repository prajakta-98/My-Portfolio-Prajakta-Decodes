import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import projectsData from "../data/projectsData.js";
import useBodyClass from "../hooks/useBodyClass.js";

function ProjectNotFound({ projectId }) {
  useEffect(() => {
    document.title = "Project Not Found | Prajakta Bansod";
  }, []);

  return (
    <main className="project-detail-shell">
      <div className="detail-back-row">
        <Link className="detail-back" to="/#work">
          Back to work
        </Link>
        <Link className="detail-back" to="/#work">
          Back to grid
        </Link>
      </div>

      <section className="detail-hero">
        <div>
          <div className="detail-label">Project not found</div>
          <h1 className="detail-title">
            Missing <em>case study</em>
          </h1>
          <p className="detail-summary">
            No project exists for "{projectId}". Choose a project from the work
            section to open a valid case study.
          </p>
          <div className="detail-actions">
            <Link to="/#work">Back to grid</Link>
            <Link to="/#contact">Contact me</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailCard({ eyebrow, title, children, className = "" }) {
  return (
    <article className={`detail-card ${className}`}>
      <span className="detail-card-eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      {children}
    </article>
  );
}

function DetailList({ items }) {
  return (
    <ul className="detail-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ProjectLink({ label, href, placeholder }) {
  if (!href) {
    return (
      <div className="detail-link-card is-empty">
        <span>{label}</span>
        <p>{placeholder}</p>
      </div>
    );
  }

  return (
    <a
      className="detail-link-card"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      <span>{label}</span>
      <p>{href}</p>
    </a>
  );
}

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projectsData[projectId];
  useBodyClass("project-detail-page");

  useEffect(() => {
    if (!project) return;
    document.title = project.title;
  }, [project]);

  if (!project) {
    return <ProjectNotFound projectId={projectId} />;
  }

  return (
    <main className="project-detail-shell">
      <div className="detail-back-row">
        <Link className="detail-back" to="/#work">
          Back to work
        </Link>
        <Link className="detail-back" to="/#work">
          Back to grid
        </Link>
      </div>

      <section className="detail-hero">
        <div>
          <div className="detail-label">{project.label}</div>
          <h1 className="detail-title">
            {project.headingMain} <em>{project.headingEmphasis}</em>
          </h1>
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

      <section className="case-study-layout" aria-label="Project case study">
        <DetailCard
          eyebrow="01"
          title="Project Overview"
          className="detail-card-wide"
        >
          <p>{project.overview}</p>
        </DetailCard>

        <DetailCard eyebrow="02" title="Role">
          <p>{project.role}</p>
        </DetailCard>

        <DetailCard eyebrow="03" title="Tech Stack">
          <div className="detail-tech-tags">
            {project.techStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </DetailCard>

        <DetailCard eyebrow="04" title="Problem">
          <p>{project.problem}</p>
        </DetailCard>

        <DetailCard eyebrow="05" title="Solution">
          <p>{project.solution}</p>
        </DetailCard>

        <DetailCard eyebrow="06" title="Key Features">
          <DetailList items={project.keyFeatures} />
        </DetailCard>

        <DetailCard eyebrow="07" title="My Contribution">
          <DetailList items={project.myContribution} />
        </DetailCard>

        <DetailCard eyebrow="08" title="Outcome" className="detail-card-wide">
          <p>{project.outcome}</p>
        </DetailCard>

        <DetailCard eyebrow="09 / 10" title="Project Links" className="detail-card-wide">
          <div className="detail-link-grid">
            <ProjectLink
              label="Live Demo"
              href={project.links.liveDemo}
              placeholder="Add the live demo URL in projectsData.js."
            />
            <ProjectLink
              label="GitHub"
              href={project.links.github}
              placeholder="Add the GitHub repository URL in projectsData.js."
            />
          </div>
        </DetailCard>
      </section>
    </main>
  );
}
