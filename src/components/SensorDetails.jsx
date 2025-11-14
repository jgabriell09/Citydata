import { Line } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = "http://100.30.80.116:4000";

export default function SensorDetails({ sensor, onClose }) {
  const [history, setHistory] = useState([]);

  // 🔥 Cargar historial REAL desde el backend
  useEffect(() => {
    if (!sensor) return;

    const loadHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/sensors/${sensor.id}/history`);
        const data = await res.json();
        setHistory(data.history);
      } catch (err) {
        console.error("Error cargando historial:", err);
      }
    };

    loadHistory();
  }, [sensor]);

  if (!sensor) return null;

  const colorMap = {
    TEMPERATURA: "#3b82f6",
    RUIDO: "#ef4444",
    HUMEDAD: "#22c55e",
    CONTAMINACION: "#a855f7",
  };
  const color = colorMap[sensor.type] || "#6b7280";

  // Usar historial REAL
  const values = history.map((r) => parseFloat(r.value));
  const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : "-";
  const min = values.length ? Math.min(...values).toFixed(1) : "-";
  const max = values.length ? Math.max(...values).toFixed(1) : "-";

  const ranges = {
    TEMPERATURA: [18, 34],
    RUIDO: [40, 80],
    HUMEDAD: [30, 75],
    CONTAMINACION: [20, 100],
  };
  const [minRange, maxRange] = ranges[sensor.type] || [0, 100];

  const currentValue = values.at(-1) || 0;

  // Configurar grafica
  const data = {
    labels: history.map((r) => r.timestamp),
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

          <div className="h-40 mb-6">
            <Line data={data} options={options} />
          </div>

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

          <div className="flex items-start gap-2">
            <TrendingUp size={16} className="mr-1" />
            Última lectura: {history.at(-1)?.timestamp || "—"}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

