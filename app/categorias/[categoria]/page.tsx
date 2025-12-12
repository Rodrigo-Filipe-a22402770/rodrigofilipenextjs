"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard";
import { Spinner } from "@/components/ui/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategoriaPage() {
  const params = useParams();
  const categoria = params.categoria as string;
  const { data, error, isLoading } = useSWR<Product[]>(`https://deisishop.pythonanywhere.com/products/category/${categoria}`, fetcher);

  if (error) return <p>Erro</p>;
  if (isLoading) return <Spinner />;

  return (
    <main className="p-4">
      <h1>Produtos em {categoria}</h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((product) => (
          <ProdutoCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}