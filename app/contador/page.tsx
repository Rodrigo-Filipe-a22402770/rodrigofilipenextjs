// app/contador/page.tsx
'use client';

import Contador from "@/components/Contador/Contador";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContadorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Botão voltar (opcional, mas fica bonito) */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-700 hover:text-green-900 font-medium mb-8 hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao início
        </Link>

        {/* Título da página */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Contador Interativo
          </h1>
          <p className="text-xl text-gray-600">
            Limite: 0 a 10 | Cor muda conforme o valor | Histórico guardado
          </p>
        </div>

        {/* Componente principal do contador */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-purple-100">
          <Contador />
        </div>

      </div>
    </main>
  );
}