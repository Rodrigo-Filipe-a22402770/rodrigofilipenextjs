"use client";
import useSWR from "swr";
import { Product } from "@/models/interfaces";
import { useParams } from "next/navigation";
import ProdutoDetalhe from "@/components/ProdutoDetalhe/ProdutoDetalhe";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdutoPage() {
  const params = useParams();
  const id = params.id as string;
  const { data:produto, error, isLoading } = useSWR<Product>(`https://deisishop.pythonanywhere.com/products/${id}`, fetcher);

  if (error) return <p>Erro</p>;
  if (isLoading) return <Spinner />;

  return (
    <main className="p-4">
      {produto && <ProdutoDetalhe product={produto} />}
      <Link href="/produtos">
        <button className="bg-blue-500 text-white p-2 rounded">Voltar</button>
      </Link>
    </main>
  );
}