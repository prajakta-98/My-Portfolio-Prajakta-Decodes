export default function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-shell">
        <div className="footer-simple-nav" role="navigation" aria-label="Footer navigation">
          <a href="#beyond" className="footer-mini-brand">{"{Praj-Decodes}"}</a>
          <div className="footer-nav-links">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#beyond-code">Beyond Code</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-connect-block">
          <div className="social-pills-container" id="pills-trigger">
            <a href="https://github.com/prajakta-98" target="_blank" rel="noopener noreferrer" className="social-pill github">
              <span className="pill-icon">Github</span>
            </a>
            <a href="https://www.linkedin.com/in/prajakta-bansod/" target="_blank" rel="noopener noreferrer" className="social-pill linkedin">
              <span className="pill-icon">LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/heyits_prajakta/" target="_blank" rel="noopener noreferrer" className="social-pill instagram">
              <span className="pill-icon">Instagram</span>
            </a>
            <a href="https://www.behance.net/prajaktabansod08" target="_blank" rel="noopener noreferrer" className="social-pill behance">
              <span className="pill-icon">Behance</span>
            </a>
            <a href="mailto:prajaktab777@gmail.com" className="social-pill email">
              <span className="pill-icon">Email</span>
            </a>
          </div>
        </div>

        <div className="footer-brand-stage" aria-label="Prajakta Decodes brand panel">
          <div className="footer-pixel-row" aria-hidden="true">
            <span className="pixel-pal lilac p1"></span>
            <span className="pixel-pal coral p2"></span>
            <span className="pixel-pal gold p3"></span>
            <span className="pixel-pal lime p4"></span>
          </div>
          <h2 className="Brand-name">Prajakta Decodes</h2>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Prajakta. Designed with precision.</p>
          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#beyond-code">Beyond Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
