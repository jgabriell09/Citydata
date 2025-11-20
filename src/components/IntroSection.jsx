import { Activity, Gauge, Radio, Cloud } from "lucide-react";

export default function Intro() {
  return (
    <section className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md py-12 mb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITULO */}
        <div className="text-center mb-10 animate-fadeIn">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Bienvenid@s 
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            CityData es una plataforma diseñada para visualizar, monitorear y analizar datos urbanos 
          en tiempo real. Nuestro objetivo es ofrecer una experiencia clara, moderna y funcional 
          que permita entender fácilmente el comportamiento de sensores distribuidos en la ciudad.
          </p>
        </div>

        {/* TARJETAS DE FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* FEATURE */}
          <div className="p-5 rounded-2xl bg-gray-100/70 dark:bg-gray-800/70 shadow-sm hover:shadow-lg transition-all duration-300 animate-slideUp">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-blue-600 dark:text-blue-400" size={26} />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Actualización en tiempo real</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Los datos se actualizan automáticamente cada pocos segundos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-100/70 dark:bg-gray-800/70 shadow-sm hover:shadow-lg transition-all duration-300 animate-slideUp delay-100">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="text-blue-600 dark:text-blue-400" size={26} />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Historial detallado</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Cada sensor cuenta con gráficas y registros recientes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-100/70 dark:bg-gray-800/70 shadow-sm hover:shadow-lg transition-all duration-300 animate-slideUp delay-200">
            <div className="flex items-center gap-3 mb-2">
              <Radio className="text-blue-600 dark:text-blue-400" size={26} />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Sensores urbanos</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Monitoreo distribuido en varias zonas clave de la ciudad.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-100/70 dark:bg-gray-800/70 shadow-sm hover:shadow-lg transition-all duration-300 animate-slideUp delay-300">
            <div className="flex items-center gap-3 mb-2">
              <Cloud className="text-blue-600 dark:text-blue-400" size={26} />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Datos ambientales</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Temperatura, humedad, ruido y contaminación en un solo panel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
