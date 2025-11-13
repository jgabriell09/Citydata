import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

export default function SensorDetails({ sensor, onClose }) {
  if (!sensor) return null;

  // Mapa de colores por tipo
  const colorMap = {
    TEMPERATURA: "#3b82f6",
    RUIDO: "#ef4444",
    HUMEDAD: "#22c55e",
    CONTAMINACION: "#a855f7",
  };
  const color = colorMap[sensor.type] || "#6b7280";

  // Calcular métricas simples del historial
  const values = sensor.history?.map((r) => parseFloat(r.value)) || [];
  const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : "-";
  const min = values.length ? Math.min(...values).toFixed(1) : "-";
  const max = values.length ? Math.max(...values).toFixed(1) : "-";

  // Rango esperado según tipo
  const ranges = {
    TEMPERATURA: [18, 34],
    RUIDO: [40, 80],
    HUMEDAD: [30, 75],
    CONTAMINACION: [20, 100],
  };
  const [minRange, maxRange] = ranges[sensor.type] || [0, 100];

  const currentValue = parseFloat(sensor.lastReading?.value || 0);

  // Determinar estado
  let estado = "Normal";
  let estadoColor = "text-green-600";
  let icono = <CheckCircle2 className="text-green-500" size={22} />;
  let recomendacion = "Los valores están dentro del rango esperado.";

  if (currentValue < minRange || currentValue > maxRange) {
    estado = "Precaución";
    estadoColor = "text-yellow-600";
    icono = <AlertTriangle className="text-yellow-500" size={22} />;
    recomendacion =
      "El valor está fuera del rango normal. Revisa las condiciones ambientales.";
  }

  // Configurar gráfica con historial real
  const data = {
    labels: sensor.history?.map((_, i) => i + 1) || [],
    datasets: [
      {
        label: sensor.type,
        data: values,
        borderColor: color,
        borderWidth: 2,
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { display: true } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex justify-end z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-l-2xl shadow-xl p-6 w-full sm:w-[90%] md:w-[60%] lg:w-[400px] h-full border-l-4"
          style={{ borderColor: color }}
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
        >
          {/* Encabezado */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{sensor.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
              <X size={20} />
            </button>
          </div>

          <p className="text-sm text-gray-400 uppercase mb-1">{sensor.type}</p>
          <p className="text-5xl font-bold mb-4" style={{ color }}>
            {currentValue} {sensor.unit}
          </p>

          {/* Gráfica */}
          <div className="h-40 mb-6">
            <Line data={data} options={options} />
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-3 text-center mb-6">
            <div>
              <p className="text-gray-400 text-xs">Mínimo</p>
              <p className="font-semibold">{min}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Promedio</p>
              <p className="font-semibold">{avg}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Máximo</p>
              <p className="font-semibold">{max}</p>
            </div>
          </div>

          {/* Estado y recomendación */}
          <div className="flex items-start gap-2">
            {icono}
            <div>
              <p className={`font-semibold ${estadoColor}`}>{estado}</p>
              <p className="text-gray-500 text-sm">{recomendacion}</p>
              <p className="text-gray-400 text-xs mt-1">
                Rango esperado: {minRange} – {maxRange} {sensor.unit}
              </p>
            </div>
          </div>

          {/* Extra opcional */}
          <div className="mt-6 flex items-center text-gray-400 text-xs">
            <TrendingUp size={16} className="mr-1" />
            Última lectura: {sensor.lastReading?.time || "—"}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
