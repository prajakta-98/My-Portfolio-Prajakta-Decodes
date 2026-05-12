import CardSwap, { Card } from "../common/CardSwap/CardSwap.jsx";

const projects = [
  {
    number: "No. 02",
    title: "Personal portfolio CMS",
    description:
      "An admin dashboard for managing content, projects and blog posts on my personal portfolio site, built with React and Node.js for seamless updates.",
    href: "/projects/personal-portfolio-cms/",
    tags: ["React UI", "Node.js", "CMS"],
    cta: "Open case study",
  },
  {
    number: "No. 01",
    title: "Automation Service Platform",
    description:
      "A conversion-focused automotive storefront with category clarity, fast product discovery and inquiry-ready purchase flows.",
    href: "/projects/tyre-junction/",
    tags: ["React UI", "Lead Capture", "Design System"],
    cta: "Open case study",
  },
  {
    number: "No. 03",
    title: "DocuPitch AI",
    description:
      "An LLM-assisted workflow that turns raw inputs into polished pitch narratives, decks and investor-facing product stories.",
    href: "/projects/docupitch-ai/",
    tags: ["UX Strategy", "Prompt Flows", "Dashboard UI"],
    cta: "Open case study",
  },
  {
    number: "No. 04",
    title: "Vedic Math Game",
    description:
      "A Python-based educational game that makes learning Vedic math interactive for students, with gameplay and real-time feedback.",
    href: "/projects/vedic-math-game/",
    tags: ["Python", "Qt", "UI Design"],
    cta: "Open case study",
  },
  {
    number: "No. 05",
    title: "Your Next Build",
    description:
      "Open for portfolio sites, product UI and frontend work that needs design thinking and clean implementation in the same loop.",
    href: "#contact",
    tags: ["Freelance", "UI Systems", "Fast Start"],
    cta: "Book a slot",
  },
];

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
        {projects.map((project) => (
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
