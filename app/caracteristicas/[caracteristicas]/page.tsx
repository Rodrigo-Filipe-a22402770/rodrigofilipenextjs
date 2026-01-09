"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CaracteristicaPage() {
  const params = useParams();
  const char = params.caracteristica as string;

  return (

    <main className="flex justify-center items-center min-h-screen">
      <div className="p-4 bg-gray-200 rounded">
        <p>{char}</p>
        <Link href="/caracteristicas">
          <button className="bg-blue-500 text-white p-2 rounded">Voltar</button>
        </Link>
      </div>
    </main>
    
  );
}