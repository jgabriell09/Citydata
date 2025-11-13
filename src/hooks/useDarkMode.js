// src/hooks/useDarkMode.js
import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [mounted, setMounted] = useState(false);
  const getInitial = () => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      // Si no hay guardado, usar preferencia del sistema
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  };

  const [darkMode, setDarkMode] = useState(getInitial);

  useEffect(() => {
    // marcar que ya montó para evitar mismatch SSR-like
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {
      // ignore
    }
  }, [darkMode]);

  return [mounted ? darkMode : getInitial(), setDarkMode];
}
