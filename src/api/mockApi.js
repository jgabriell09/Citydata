// src/api/mockApi.js

// Definimos 4 sensores base
const sensors = [
  { id: 1, name: "Temperatura - Centro", type: "TEMPERATURA", unit: "°C" },
  { id: 2, name: "Ruido - Parque", type: "RUIDO", unit: "dB" },
  { id: 3, name: "Humedad - Norte", type: "HUMEDAD", unit: "%" },
  { id: 4, name: "Contaminación - Industrial", type: "CONTAMINACION", unit: "µg/m³" },
];

// Función para generar un valor aleatorio según el tipo
function generateReading(type) {
  const r = Math.random();
  switch (type) {
    case "TEMPERATURA":
      return (18 + r * 10).toFixed(1); // 18–28 °C
    case "HUMEDAD":
      return (40 + r * 40).toFixed(0); // 40–80 %
    case "RUIDO":
      return (50 + r * 40).toFixed(0); // 50–90 dB
    case "CONTAMINACION":
      return (10 + r * 70).toFixed(1); // 10–80 µg/m³
    default:
      return (r * 100).toFixed(1);
  }
}

// Genera sensores con una lectura reciente
export function getSensors() {
  const now = new Date().toISOString();
  return sensors.map((s) => ({
    ...s,
    lastReading: { value: generateReading(s.type), timestamp: now },
  }));
}

// Genera una lista de lecturas simuladas (para gráficas)
export function getReadings(sensorId, points = 30) {
  const sensor = sensors.find((s) => s.id === sensorId);
  if (!sensor) return [];

  const readings = [];
  const now = Date.now();
  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now - i * 5000); // cada 5s
    readings.push({
      timestamp: time.toISOString(),
      value: parseFloat(generateReading(sensor.type)),
    });
  }
  return readings;
}
