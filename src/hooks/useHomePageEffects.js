import { useEffect } from "react";
import { runHomePageEffects } from "./homePageEffects.js";

export default function useHomePageEffects() {
  useEffect(() => {
    runHomePageEffects();
  }, []);
}
