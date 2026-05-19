import { useEffect, useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    const handleHashChange = () => setMenuOpen(false);

    window.addEventListener("resize", handleResize);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", menuOpen);
    return () => document.body.classList.remove("nav-menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav id="nav" className={menuOpen ? "menu-open" : ""}>
      <a href="#beyond" className="nav-logo" onClick={closeMenu}>
        <span className="nav-logo-text">{"{Praj-Decodes}"}</span>
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="nav-panel"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="nav-panel" id="nav-panel">
        <div className="nav-panel-inner">
          <ul className="nav-links">
            <li><a href="#beyond" onClick={closeMenu}>Get to know me</a></li>
            <li><a href="#work" onClick={closeMenu}>Work</a></li>
            <li><a href="#services" onClick={closeMenu}>Services</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
          <a href="#contact" className="nav-cta" onClick={closeMenu}>Hire Me</a>
        </div>
      </div>
    </nav>
  );
}
