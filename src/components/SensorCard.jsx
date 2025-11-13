import SensorChart from "./SensorChart";
import { motion } from "framer-motion";

export default function SensorCard({ sensor, onClick }) {
  const value = parseFloat(sensor.lastReading?.value);
  const min = sensor.min || 0;
  const max = sensor.max || 100;

  // Determinar el estado del sensor
  let status = "Normal";
  let statusColor = "text-green-600";
  let bgColor = "bg-white dark:bg-gray-900";

  const thresholdLow = min + (max - min) * 0.25;
  const thresholdHigh = min + (max - min) * 0.75;

  if (value < thresholdLow || value > thresholdHigh) {
    status = "Precaución";
    statusColor = "text-yellow-600";
    bgColor = "bg-yellow-50 dark:bg-yellow-900/30";
  }
  if (value < min || value > max) {
    status = "Crítico";
    statusColor = "text-red-600";
    bgColor = "bg-red-50 dark:bg-red-900/30";
  }

  const colorMap = {
    TEMPERATURA: "border-blue-400",
    RUIDO: "border-red-400",
    HUMEDAD: "border-green-400",
    CONTAMINACION: "border-purple-400",
  };

  const borderColor = colorMap[sensor.type] || "border-gray-300";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border ${borderColor} shadow-sm p-5 cursor-pointer ${bgColor} transition-all`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{sensor.name}</h3>
        <span className="text-xs text-gray-500">{sensor.type}</span>
      </div>

      <motion.div
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold mb-2"
      >
        {value}
        <span className="text-lg font-medium text-gray-600 ml-2">{sensor.unit}</span>
      </motion.div>

      <p className={`text-sm font-medium ${statusColor}`}>Estado: {status}</p>

      <div className="h-28 mt-2">
        <SensorChart sensor={sensor} />
      </div>
    </motion.div>
  );
}
