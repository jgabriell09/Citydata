import { TrendingUp, Thermometer, Wind, Gauge } from "lucide-react";

export default function CityOverview() {
  const metrics = [
    {
      title: "Temperatura Promedio",
      value: "23.8°C",
      icon: <Thermometer size={26} />,
      change: "+1.2°C",
    },
    {
      title: "Calidad del Aire (AQI)",
      value: "42 - Buena",
      icon: <Wind size={26} />,
      change: "-8 pts",
    },
    {
      title: "Consumo Energético",
      value: "19.4 kWh",
      icon: <Gauge size={26} />,
      change: "+3.1%",
    },
    {
      title: "Índice de Crecimiento",
      value: "7.4%",
      icon: <TrendingUp size={26} />,
      change: "+0.6%",
    },
  ];

  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Estado General de la Ciudad
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl shadow-sm bg-white/80 dark:bg-gray-900/40 
              border border-gray-200 dark:border-gray-700
              backdrop-blur-sm transition-all duration-300
              hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {m.title}
                </span>
                <span className="text-blue-600 dark:text-blue-400">{m.icon}</span>
              </div>

              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {m.value}
              </p>

              <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                {m.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
