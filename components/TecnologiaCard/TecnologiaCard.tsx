"use client";

import Image from "next/image";
import Link from "next/link";
import ContadorPersonalizado from "@/components/ContadorPersonalizado/ContadorPersonalizado";

interface TecnologiaCardProps {
  title: string;
  image: string;
  id?: number;
}

export default function TecnologiaCard({ title, image, id }: TecnologiaCardProps) {
  const href = id !== undefined ? `/tecnologias/${id}` : `/tecnologias/${encodeURIComponent(title)}`;

  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
          <Image
            src={image}
            alt={title}
            width={120}
            height={120}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>

          {/* AQUI ESTÁ A SOLUÇÃO — stopPropagation + preventDefault */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="inline-block"
          >
            <ContadorPersonalizado title={title} />
          </div>

          <p className="text-sm text-green-600 font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            → Clica para ver detalhes
          </p>
        </div>
      </div>
    </Link>
  );
}