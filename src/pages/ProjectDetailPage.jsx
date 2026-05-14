import { useEffect } from "react";
import projectDetails from "../data/projectDetails.js";
import useBodyClass from "../hooks/useBodyClass.js";

export default function ProjectDetailPage({ projectId }) {
  const project = projectDetails[projectId] ?? projectDetails.project1;
  useBodyClass("project-detail-page");

  useEffect(() => {
    document.title = project.title;
  }, [project.title]);

  return (
    <main className="project-detail-shell">
      <a className="detail-back" href="/#work">
        Back to work
      </a>

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
          <div className="detail-actions">
            <a href={project.liveLink}>Live link</a>
            <a href={project.githubLink}>GitHub</a>
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
          <h3>Role</h3>
          <p>{project.role}</p>
        </article>
        <article className="detail-card">
          <h3>Tech Stack</h3>
          <ul className="detail-list">
            {project.techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="detail-card">
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </article>
        <article className="detail-card">
          <h3>Solution</h3>
          <p>{project.solution}</p>
        </article>
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
