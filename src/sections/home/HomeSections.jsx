import BeyondCodeSection from "./BeyondCodeSection.jsx";
import ContactSection from "./ContactSection.jsx";
import FinalCtaSection from "./FinalCtaSection.jsx";
import HeroSection from "./HeroSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import WorkSection from "./WorkSection.jsx";

export default function HomeSections() {
  return (
    <section id="home" className="home-sections">
      <div className="beyond-grain"></div>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <BeyondCodeSection />
      <ContactSection />
      <FinalCtaSection />
    </section>
  );
}
