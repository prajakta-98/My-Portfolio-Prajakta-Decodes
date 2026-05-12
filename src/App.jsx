import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";

const projectRoutes = {
  "/projects/tyre-junction": "project1",
  "/projects/personal-portfolio-cms": "project1",
  "/projects/docupitch-ai": "project2",
  "/projects/vedic-math-game": "project3",
  "/projects/flux-payments": "project3",
  "/project1.html": "project1",
  "/project2.html": "project2",
  "/project3.html": "project3",
};

export default function App() {
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");
  const projectId = projectRoutes[pathname];

  if (projectId) {
    return <ProjectDetailPage projectId={projectId} />;
  }

  return <HomePage />;
}
