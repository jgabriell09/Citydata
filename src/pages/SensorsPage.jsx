import SensorCard from "../components/SensorCard";
import SensorDetails from "../components/SensorDetails";
import { useEffect, useState } from "react";

export default function SensorsPage() {
  const [sensors, setSensors] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedSensor, setSelectedSensor] = useState(null);


  const generateSensorData = (prev = []) => {
    const getPrev = (i, fallback) => {
      const v = parseFloat(prev[i]?.lastReading?.value);
      return isNaN(v) ? fallback : v;
    };

    const makeReading = (val) => ({
      value: val.toString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    });

    return [
      {
        id: 1,
        name: "Temperatura - Centro",
        type: "TEMPERATURA",
        unit: "°C",
        min: 18,
        max: 34,
        lastReading: makeReading(
          (getPrev(0, 25) + (Math.random() - 0.5) * 2).toFixed(1)
        ),
        history: prev[0]?.history
          ? [
              ...prev[0].history.slice(-19),
              makeReading(
                (getPrev(0, 25) + (Math.random() - 0.5) * 2).toFixed(1)
              ),
            ]
          : [],
      },
      {
        id: 2,
        name: "Ruido - Parque",
        type: "RUIDO",
        unit: "dB",
        min: 40,
        max: 90,
        lastReading: makeReading(
          Math.round(getPrev(1, 65) + (Math.random() - 0.5) * 3)
        ),
        history: prev[1]?.history
          ? [
              ...prev[1].history.slice(-19),
              makeReading(
                Math.round(getPrev(1, 65) + (Math.random() - 0.5) * 3)
              ),
            ]
          : [],
      },
      {
        id: 3,
        name: "Humedad - Norte",
        type: "HUMEDAD",
        unit: "%",
        min: 30,
        max: 80,
        lastReading: makeReading(
          Math.round(getPrev(2, 55) + (Math.random() - 0.5) * 2)
        ),
        history: prev[2]?.history
          ? [
              ...prev[2].history.slice(-19),
              makeReading(
                Math.round(getPrev(2, 55) + (Math.random() - 0.5) * 2)
              ),
            ]
          : [],
      },
      {
        id: 4,
        name: "Contaminación - Industrial",
        type: "CONTAMINACION",
        unit: "µg/m³",
        min: 20,
        max: 120,
        lastReading: makeReading(
          (getPrev(3, 70) + (Math.random() - 0.5) * 5).toFixed(1)
        ),
        history: prev[3]?.history
          ? [
              ...prev[3].history.slice(-19),
              makeReading(
                (getPrev(3, 70) + (Math.random() - 0.5) * 5).toFixed(1)
              ),
            ]
          : [],
      },
    ];
  };

  useEffect(() => {
    setSensors(generateSensorData());
    setLastUpdate(new Date());

    const id = setInterval(() => {
      setSensors((prev) => generateSensorData(prev));
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <main className="max-w-7xl mx-auto p-6 pt-28">
        <p className="text-sm text-gray-500 mb-4 text-right">
          Última actualización: {formatTime(lastUpdate)}
        </p>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sensors.map((sensor) => (
            <div key={sensor.id} onClick={() => setSelectedSensor(sensor)}>
              <SensorCard sensor={sensor} />
            </div>
          ))}
        </div>

        {/* Panel lateral */}
        {selectedSensor && (
          <SensorDetails
            sensor={sensors.find((s) => s.id === selectedSensor.id)}
            onClose={() => setSelectedSensor(null)}
          />
        )}
      </main>
    </div>
  );
}
