import SiteIcon from "../../components/common/SiteIcon.jsx";
import { services } from "../../data/services.js";

export default function ServicesSection() {
  return (
    <section id="services">
      <div className="services-inner">
        <div className="services-top">
          <div>
            <div className="section-eyebrow">What I Offer</div>
            <h2 className="services-h2">
              Services for
              <br />
              <em>client-ready builds.</em>
            </h2>
          </div>
          <div className="services-side">
            <p className="services-note">
              Clear design, clean React code, and practical full-stack features
              for websites, dashboards, and product interfaces.
            </p>
          </div>
        </div>

        <div className="services-interactive">
          <div className="svc-grid">
            {services.map((service) => (
              <a
                className="svc-card"
                href="#contact"
                key={service.name}
              >
                <div className="svc-card-top">
                  <div className="svc-num">{service.number}</div>
                  <span className="svc-icon">
                    <SiteIcon name={service.icon} size={22} />
                  </span>
                </div>
                <h3 className="svc-name">{service.name}</h3>
                <p className="svc-desc">{service.description}</p>
                <div className="svc-blueprint" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="svc-card-foot">
                  <span className="svc-outcome">{service.outcome}</span>
                  <span className="svc-price">
                    {service.price} <small>{service.unit}</small>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="services-mini-cta">
          <span>Need one of these?</span>
          <a href="#contact">Let's talk</a>
        </div>
      </div>
    </section>
  );
}
