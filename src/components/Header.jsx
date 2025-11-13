import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // iconos elegantes

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  // 🔄 Detectar si el modo oscuro está activo al cargar
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  // 🌙 Alternar modo oscuro
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* 🔹 Logo o título */}
        <h1 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400 select-none">
          CityData<span className="text-gray-800 dark:text-gray-200 font-semibold"> Dashboard</span>
        </h1>

        {/* 🔹 Botón de modo oscuro */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-xl 
                     bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                     text-gray-800 dark:text-gray-200 transition-colors duration-300 shadow-sm"
        >
          {darkMode ? (
            <>
              <Sun size={18} /> <span>Modo Claro</span>
            </>
          ) : (
            <>
              <Moon size={18} /> <span>Modo Oscuro</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
