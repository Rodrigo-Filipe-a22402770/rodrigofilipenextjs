"use client";
import Image from "next/image";
import ContadorPersonalizado from "@/components/ContadorPersonalizado/ContadorPersonalizado";

interface Tech {
  title: string;
  image: string;
  description: string;
  rating: number;
}

interface Props {
  tech: Tech;
}

export default function TecnologiaDetailsCard({ tech }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-gray-100">
      <div className="grid md:grid-cols-2">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-10 flex items-center justify-center">
          <Image
            src={tech.image}
            alt={tech.title}
            width={350}
            height={350}
            className="object-contain rounded-2xl shadow-lg"
          />
        </div>

        <div className="p-10 md:p-16">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">{tech.title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            {tech.description}
          </p>

          <div className="mb-10">
            <p className="text-gray-600 font-semibold mb-3">Nível de domínio:</p>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-4xl ${i < tech.rating ? "text-yellow-500" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
              <span className="ml-4 text-2xl font-bold text-gray-700">
                {tech.rating}/5
              </span>
            </div>
          </div>

          <ContadorPersonalizado title={tech.title} />
        </div>
      </div>
    </div>
  );
}