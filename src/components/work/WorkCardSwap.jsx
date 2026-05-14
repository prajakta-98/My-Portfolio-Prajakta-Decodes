import CardSwap, { Card } from "../common/CardSwap/CardSwap.jsx";
import workProjects from "../../data/workProjects.js";

function openProject(event, project) {
  if (project.href.startsWith("#")) {
    document.querySelector(project.href)?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  document.body.style.setProperty("--route-x", `${rect.left + rect.width / 2}px`);
  document.body.style.setProperty("--route-y", `${rect.top + rect.height / 2}px`);
  document.body.classList.add("project-routing");
  window.setTimeout(() => {
    window.location.href = project.href;
  }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 520);
}

export default function WorkCardSwap() {
  return (
    <div className="work-card-swap" aria-label="Selected work carousel">
      <CardSwap
        width="min(92%, 580px)"
        height={380}
        cardDistance={34}
        verticalDistance={30}
        delay={5000}
        pauseOnHover
        skewAmount={4}
        easing="elastic"
      >
        {workProjects.map((project) => (
          <Card
            key={project.title}
            customClass="work-swap-card"
            role="link"
            tabIndex={0}
            onClick={(event) => openProject(event, project)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              openProject(event, project);
            }}
          >
            <span className="work-swap-number">{project.number}</span>
            <span className="work-swap-content">
              <span className="work-swap-title">{project.title}</span>
              <span className="work-swap-description">{project.description}</span>
            </span>
            <span className="work-swap-meta">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
            <span className="work-swap-cta">{project.cta}</span>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
}
