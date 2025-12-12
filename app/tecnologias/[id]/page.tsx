"use client";
import { useParams } from "next/navigation";
import tecnologias from "@/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard";
import Link from "next/link";

export default function TecnologiaPage() {
  const params = useParams();
  const index = Number(params.id);

  if (Number.isNaN(index) || index < 0 || index >= tecnologias.length) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-xl text-gray-700 mb-6">Tecnologia não encontrada.</p>
          <Link href="/tecnologias">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-lg font-medium">
              ← Voltar
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const tech = tecnologias[index];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/tecnologias">
          <button className="mb-10 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition font-medium">
            ← Voltar
          </button>
        </Link>
        <TecnologiaDetailsCard tech={tech} />
      </div>
    </main>
  );
}