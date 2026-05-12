import { useEffect } from "react";
import CustomCursor from "../components/home/CustomCursor.jsx";
import Footer from "../components/home/Footer.jsx";
import Loader from "../components/home/Loader.jsx";
import Navigation from "../components/home/Navigation.jsx";
import PortfolioSections from "../components/home/PortfolioSections.jsx";
import useBodyClass from "../hooks/useBodyClass.js";
import usePortfolioEffects from "../hooks/usePortfolioEffects.js";

export default function HomePage() {
  useBodyClass("is-loading");
  usePortfolioEffects();

  useEffect(() => {
    document.title = "Prajakta - Beyond the Code";
  }, []);

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navigation />
      <PortfolioSections />
      <Footer />
    </>
  );
}
