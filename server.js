// server.js
import express from "express";
import cors from "cors";
import process from "node:process";

const app = express();
app.disable("x-powered-by");
const allowedOrigins = (
  process.env.CORS_ORIGINS ?? "http://localhost:5173,http://127.0.0.1:5173"
).split(",").map((origin) => origin.trim()).filter(Boolean);

for (const origin of allowedOrigins) {
  const url = new URL(origin);
  if (!["http:", "https:"].includes(url.protocol) || url.origin !== origin) {
    throw new Error(`Origen CORS no válido: ${origin}`);
  }
}

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET"],
  credentials: false,
}));

const PORT = 4000;


const sensors = [
  {
    id: 1,
    name: "Temperatura - Centro",
    type: "TEMPERATURA",
    unit: "°C",
    min: 18,
    max: 34,
    history: [],
  },
  {
    id: 2,
    name: "Ruido - Parque",
    type: "RUIDO",
    unit: "dB",
    min: 40,
    max: 90,
    history: [],
  },
  {
    id: 3,
    name: "Humedad - Norte",
    type: "HUMEDAD",
    unit: "%",
    min: 30,
    max: 80,
    history: [],
  },
  {
    id: 4,
    name: "Contaminación - Industrial",
    type: "CONTAMINACION",
    unit: "µg/m³",
    min: 20,
    max: 120,
    history: [],
  },
];


const updateSensorData = () => {
  sensors.forEach((sensor) => {
    const randomValue =
      sensor.min +
      Math.random() * (sensor.max - sensor.min);

    const value = Number.parseFloat(randomValue.toFixed(1));
    const timestamp = new Date().toISOString();

    
    sensor.history.push({ timestamp, value });
    if (sensor.history.length > 30) sensor.history.shift();
  });
};


setInterval(updateSensorData, 5000);
updateSensorData(); 


app.get("/api/sensors", (req, res) => {
  const current = sensors.map((s) => ({
    id: s.id,
    name: s.name,
    type: s.type,
    unit: s.unit,
    value: s.history.at(-1)?.value || 0,
  }));
  res.json(current);
});

app.get("/api/sensors/:id/history", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const sensor = sensors.find((s) => s.id === id);

  if (!sensor) return res.status(404).json({ error: "Sensor no encontrado" });

  res.json({
    id: sensor.id,
    name: sensor.name,
    type: sensor.type,
    unit: sensor.unit,
    history: sensor.history,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor CityData con historial en http://localhost:${PORT}`);
});
