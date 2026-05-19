import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import useLenis, { scrollToTarget } from "./hooks/useLenis.js";

function HashScroll({ lenis }) {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToTarget(0, { immediate: true });
      return;
    }

    window.setTimeout(() => {
      scrollToTarget(hash);
    }, 0);
  }, [hash, pathname, lenis]);

  return null;
}

export default function App() {
  const lenis = useLenis();

  return (
    <BrowserRouter>
      <HashScroll lenis={lenis} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
