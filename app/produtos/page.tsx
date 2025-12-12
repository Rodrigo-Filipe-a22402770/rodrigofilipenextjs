// app/produtos/page.tsx
'use client';

import useSWR from "swr";
import { Product } from "@/models/interfaces";
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard";
import FiltrosCategoria from "@/components/FiltrosCategoria/FiltrosCategoria";
import Carrinho from "@/components/Carrinho/Carrinho";
import { Spinner } from "@/components/ui/spinner";
import { useState, useEffect } from "react";

// Fetcher único e reutilizável (com corsproxy)
const fetcher = (url: string) =>
  fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`).then(res => res.json());

/**
 * Página principal da loja
 */
export default function ProdutosPage() {
  // CORRIGIDO: fetcher como segundo argumento
  const { data: products, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products",
    fetcher
  );

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("name-asc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filtra e ordena produtos
  useEffect(() => {
    if (!products) return;

    let list = [...products];

    if (selectedCategories.length > 0) {
      list = list.filter(p => selectedCategories.includes(p.category));
    }
    if (search) {
      list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    list.sort((a, b) => {
      if (order === "name-asc") return a.title.localeCompare(b.title);
      if (order === "name-desc") return b.title.localeCompare(a.title);
      if (order === "price-asc") return Number(a.price) - Number(b.price);
      if (order === "price-desc") return Number(b.price) - Number(a.price);
      return 0;
    });

    setFilteredProducts(list);
  }, [products, search, order, selectedCategories]);

  // Estados de loading e erro
  if (error) return <div className="text-center py-20 text-2xl text-red-600">Erro ao carregar produtos</div>;
  if (isLoading) return <div className="flex min-h-screen items-center justify-center"><Spinner /></div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">DEISI Shop</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filtros laterais */}
          <FiltrosCategoria
            selectedCategories={selectedCategories}
            onChange={setSelectedCategories}
          />

          {/* Área principal */}
          <div className="flex-1">
            {/* Pesquisa + Ordenação */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 px-5 py-3 border rounded-lg text-lg"
              />
              <select
                value={order}
                onChange={e => setOrder(e.target.value)}
                className="px-5 py-3 border rounded-lg bg-white text-lg"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Preço crescente</option>
                <option value="price-desc">Preço decrescente</option>
              </select>
            </div>

            {/* Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {filteredProducts.map(product => (
                <ProdutoCard key={product.id} product={product} />
              ))}
            </div>

            {/* Carrinho */}
            <Carrinho />
          </div>
        </div>
      </div>
    </main>
  );
}