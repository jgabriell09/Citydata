export default function AnalysisSection({ sensors }) {
  if (!sensors || sensors.length === 0) return null;

  // Calcular estadísticas
  const stats = sensors.map((s) => {
    const val = parseFloat(s.lastReading?.value);
    return {
      name: s.name,
      type: s.type,
      value: val,
      min: s.min,
      max: s.max,
      unit: s.unit,
      status:
        val < s.min ? "bajo" : val > s.max ? "alto" : "normal",
    };
  });

  const iconMap = {
    TEMPERATURA: "🌡️",
    RUIDO: "🔊",
    HUMEDAD: "💧",
    CONTAMINACION: "☣️",
  };

  return (
    <section className="max-w-6xl mx-auto mt-12 p-8 bg-white/90 dark:bg-gray-900/70 backdrop-blur rounded-2xl shadow-xl transition-all">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
        📊 Análisis general del entorno
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, index) => {
          const colorMap = {
            TEMPERATURA: "from-blue-400 to-blue-600",
            RUIDO: "from-red-400 to-red-600",
            HUMEDAD: "from-green-400 to-green-600",
            CONTAMINACION: "from-purple-400 to-purple-600",
          };

          const borderColor =
            s.status === "alto"
              ? "border-red-400"
              : s.status === "bajo"
              ? "border-blue-400"
              : "border-green-400";

          const textStatus =
            s.status === "alto"
              ? "text-red-600 dark:text-red-400"
              : s.status === "bajo"
              ? "text-blue-600 dark:text-blue-400"
              : "text-green-600 dark:text-green-400";

          return (
            <div
              key={index}
              className={`p-5 rounded-xl border ${borderColor} shadow-sm hover:shadow-md bg-gradient-to-br ${colorMap[s.type]} bg-opacity-10 dark:bg-opacity-20 transition`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{iconMap[s.type]}</span>
                <h3 className="font-semibold text-lg">{s.name}</h3>
              </div>

              <p className="text-3xl font-bold">
                {s.value}
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300 ml-1">
                  {s.unit}
                </span>
              </p>

              <p className={`text-sm mt-2 font-medium ${textStatus}`}>
                Estado:{" "}
                {s.status === "alto"
                  ? "Muy alto ⚠️"
                  : s.status === "bajo"
                  ? "Bajo 📉"
                  : "Normal ✅"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
