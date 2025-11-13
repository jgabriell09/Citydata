import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function SensorChart({ sensor }) {
  const [history, setHistory] = useState([]);
  const API_URL = `http://localhost:4000/api/sensors/${sensor.id}/history`;

  // 🧠 Obtiene historial real del backend
  const fetchHistory = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setHistory(data.history || []);
    } catch (err) {
      console.error("⚠️ Error al obtener historial:", err);
    }
  };

  // 🔄 Actualiza el historial cada 5 segundos
  useEffect(() => {
    fetchHistory(); // primera carga
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, [sensor.id]);

  // 🎨 Colores por tipo de sensor
  const colorMap = {
    TEMPERATURA: "#3b82f6",
    RUIDO: "#ef4444",
    HUMEDAD: "#22c55e",
    CONTAMINACION: "#a855f7",
  };
  const color = colorMap[sensor.type] || "#6b7280";

  // 📊 Datos del gráfico
  const data = {
    labels: history.map((item) =>
      new Date(item.timestamp).toLocaleTimeString([], { minute: "2-digit", second: "2-digit" })
    ),
    datasets: [
      {
        data: history.map((item) => item.value),
        borderColor: color,
        backgroundColor: color + "33",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  // 📈 Rango de ejes Y según tipo de sensor
  const yRanges = {
    TEMPERATURA: [15, 35],
    RUIDO: [40, 90],
    HUMEDAD: [30, 80],
    CONTAMINACION: [20, 120],
  };
  const [min, max] = yRanges[sensor.type] || [0, 100];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: { display: false },
      y: {
        min,
        max,
        ticks: { color: "#9ca3af", stepSize: 10 },
        grid: { color: "rgba(156,163,175,0.1)" },
      },
    },
    plugins: { legend: { display: false } },
  };

  return <Line data={data} options={options} />;
}
