import { useEffect } from "react";
import { runPortfolioEffects } from "./portfolioEffects.js";

export default function usePortfolioEffects() {
  useEffect(() => {
    runPortfolioEffects();
  }, []);
}
