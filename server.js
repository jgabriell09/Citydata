// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ===============================================================
// 1. Seguridad mínima sin romper el frontend
// ===============================================================

// Evitar iframes maliciosos
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

// Evitar que el navegador adivine tipos MIME
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

// Bloquear archivos ocultos (.git, .hg, .svn, etc.)
app.use((req, res, next) => {
  if (req.path.startsWith("/.")) {
    return res.status(403).send("Access denied");
  }
  next();
});

// ===============================================================
// 2. Configuración de __dirname para ES Modules
// ===============================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================================================
// 3. Servir FRONTEND desde dist/
// ===============================================================
app.use(express.static(path.join(__dirname, "dist")));

// ===============================================================
// 4. API BACKEND
// ===============================================================
app.use(cors());

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
      sensor.min + Math.random() * (sensor.max - sensor.min);

    const value = parseFloat(randomValue.toFixed(1));
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
  const id = parseInt(req.params.id);
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

// ===============================================================
// 5. Redirigir cualquier ruta al frontend (React router)
// ===============================================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ===============================================================
// 6. Iniciar servidor
// ===============================================================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor CityData corriendo en http://<TU-IP>:${PORT}`);
});
