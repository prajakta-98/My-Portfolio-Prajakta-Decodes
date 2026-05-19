import { useEffect } from "react";
import CustomCursor from "../components/home/CustomCursor.jsx";
import Footer from "../components/home/Footer.jsx";
import Loader from "../components/home/Loader.jsx";
import useBodyClass from "../hooks/useBodyClass.js";
import usePortfolioEffects from "../hooks/usePortfolioEffects.js";
import PortfolioSections from "../sections/home/PortfolioSections.jsx";

export default function HomePage() {
  useBodyClass("is-loading");
  usePortfolioEffects();

  useEffect(() => {
    document.title = "Prajakta Bansod | Full-Stack UI Developer";
  }, []);

  return (
    <>
      <Loader />
      <CustomCursor />
      <PortfolioSections />
      <Footer />
    </>
  );
}
