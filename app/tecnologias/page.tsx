import tecnologias from "@/data/tecnologias.json";
import TecnologiaCard from "@/components/TecnologiaCard/TecnologiaCard";

export default function TecnologiasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-black text-green-600 mb-16 tracking-tight">
          Tecnologias trabalhadas
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 justify-items-center">
          {tecnologias.map((tech, index) => (
            <TecnologiaCard key={index} id={index} title={tech.title} image={tech.image} />
          ))}
        </div>
      </div>
    </main>
  );
}