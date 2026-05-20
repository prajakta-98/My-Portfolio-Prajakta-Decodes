import { useNavigate } from "react-router-dom";
import CardSwap, { Card } from "../common/CardSwap/CardSwap.jsx";
import workProjects from "../../data/workProjects.js";
import { scrollToTarget } from "../../hooks/useLenis.js";

function openProject(event, project, navigate) {
  if (project.href.startsWith("#")) {
    scrollToTarget(project.href);
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  document.body.style.setProperty("--route-x", `${rect.left + rect.width / 2}px`);
  document.body.style.setProperty("--route-y", `${rect.top + rect.height / 2}px`);
  document.body.classList.add("project-routing");
  window.setTimeout(() => {
    navigate(project.href);
    document.body.classList.remove("project-routing");
  }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 520);
}

export default function WorkCardSwap() {
  const navigate = useNavigate();

  return (
    <div className="work-card-swap" aria-label="Selected work carousel">
      <CardSwap
        width="min(92%, 580px)"
        height={360}
        cardDistance={30}
        verticalDistance={42}
        delay={5000}
        pauseOnHover
        skewAmount={2}
        easing="elastic"
      >
        {workProjects.map((project) => (
          <Card
            key={project.title}
            customClass="work-swap-card"
            role="link"
            tabIndex={0}
            onClick={(event) => openProject(event, project, navigate)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              openProject(event, project, navigate);
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
