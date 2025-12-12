"use client";
import useSWR from "swr";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CategoriasPage() {
  const { data, error, isLoading } = useSWR<string[]>("https://deisishop.pythonanywhere.com/categories", fetcher);

  if (error) return <p>Erro</p>;
  if (isLoading) return <Spinner />;

  return (
    <main className="p-4">
      <h1>Categorias</h1>
      <ul>
        {data?.map((cat) => (
          <li key={cat}>
            <Link href={`/categorias/${cat}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}