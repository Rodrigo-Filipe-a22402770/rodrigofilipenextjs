// app/produtos/[id]/page.tsx
'use client';

import useSWR from "swr";
import { Product } from "@/models/interfaces";
import ProdutoDetalhe from "@/components/ProdutoDetalhe/ProdutoDetalhe";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "next/navigation";

const fetcher = (url: string) => fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`).then(res => res.json());

/**
 * Página de detalhe de um produto específico
 * Usa rota dinâmica: /produtos/1, /produtos/2, etc.
 */
export default function ProdutoPage() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useSWR<Product>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    fetcher
  );

  if (error) return <div className="text-center py-20 text-2xl text-red-600">Produto não encontrado</div>;
  if (isLoading) return <div className="flex min-h-screen items-center justify-center"><Spinner /></div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/produtos" className="inline-block mb-8 text-blue-600 hover:underline text-lg">
          ← Voltar à loja
        </Link>
        {product && <ProdutoDetalhe product={product} />}
      </div>
    </main>
  );
}