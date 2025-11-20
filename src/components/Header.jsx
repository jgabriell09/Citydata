import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          CityData<span className="text-gray-800 dark:text-gray-200 font-semibold"> Dashboard</span>
        </Link>

        {/* Navegación */}
        <nav className="flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
          <Link
            to="/"
            className={`${location.pathname === "/" ? "text-blue-500 dark:text-blue-400 font-bold" : ""}`}
          >
            Inicio
          </Link>

          <Link
            to="/sensores"
            className={`${location.pathname === "/sensores" ? "text-blue-500 dark:text-blue-400 font-bold" : ""}`}
          >
            Sensores
          </Link>

          {/* Botón modo oscuro */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-xl 
                     bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                     text-gray-800 dark:text-gray-200 transition-colors duration-300 shadow-sm"
          >
            {darkMode ? (
              <>
                <Sun size={18} /> <span>Claro</span>
              </>
            ) : (
              <>
                <Moon size={18} /> <span>Oscuro</span>
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
