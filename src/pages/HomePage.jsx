import { useEffect } from "react";
import CustomCursor from "../components/home/CustomCursor.jsx";
import Footer from "../components/home/Footer.jsx";
import Loader from "../components/home/Loader.jsx";
import Navigation from "../components/home/Navigation.jsx";
import useBodyClass from "../hooks/useBodyClass.js";
import useHomePageEffects from "../hooks/useHomePageEffects.js";
import HomeSections from "../sections/home/HomeSections.jsx";

export default function HomePage() {
  useBodyClass("is-loading");
  useHomePageEffects();

  useEffect(() => {
    document.title = "Prajakta Bansod | Full-Stack UI Developer";
  }, []);

  return (
    <>
      <Loader />
      <CustomCursor />
      <Navigation />
      <HomeSections />
      <Footer />
    </>
  );
}
