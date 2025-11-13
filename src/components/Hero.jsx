export default function Hero({ lastUpdate, formatTime }) {
  return (
    <section className="text-center py-10 bg-gradient-to-r from-blue-500 to-teal-400 dark:from-blue-900 dark:to-indigo-800 text-white rounded-2xl shadow-md mb-8 transition-all">
      <h1 className="text-4xl font-bold mb-2">CityData Dashboard</h1>
      <p className="text-lg opacity-90">
        Monitoreo ambiental en tiempo real de la ciudad
      </p>

      <div className="mt-4 flex items-center justify-center space-x-2 text-sm">
        <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
        <span>Conectado al servidor</span>
        <span className="ml-2 text-gray-200 dark:text-gray-400">
          • Última actualización: {formatTime(lastUpdate)}
        </span>
      </div>
    </section>
  );
}
