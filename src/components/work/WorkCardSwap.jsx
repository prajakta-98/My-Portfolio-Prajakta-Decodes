import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardSwap, { Card } from "../common/CardSwap/CardSwap.jsx";
import SiteIcon from "../common/SiteIcon.jsx";
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
  const cardSwapRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const togglePlayback = () => {
    if (isPaused) {
      cardSwapRef.current?.play();
      setIsPaused(false);
      return;
    }

    cardSwapRef.current?.pause();
    setIsPaused(true);
  };

  return (
    <div className="work-card-swap-shell">
      <div className="work-card-swap" aria-label="Selected work carousel">
        <CardSwap
          ref={cardSwapRef}
          width="min(92%, 580px)"
          height={340}
          cardDistance={24}
          verticalDistance={32}
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

      <div className="work-swap-controls" aria-label="Project animation controls">
        <button
          type="button"
          className="work-swap-control"
          aria-label="Previous project"
          onClick={() => cardSwapRef.current?.previous()}
        >
          <SiteIcon name="chevronLeft" size={18} />
        </button>
        <button
          type="button"
          className="work-swap-control is-primary"
          aria-label={isPaused ? "Play project animation" : "Pause project animation"}
          aria-pressed={isPaused}
          onClick={togglePlayback}
        >
          <SiteIcon name={isPaused ? "play" : "pause"} size={18} />
        </button>
        <button
          type="button"
          className="work-swap-control"
          aria-label="Next project"
          onClick={() => cardSwapRef.current?.next()}
        >
          <SiteIcon name="chevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}
