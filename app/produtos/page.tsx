"use client";

import useSWR from "swr";
import { Product } from "@/models/interfaces";
import { Spinner } from "@/components/ui/spinner";
import ProdutoCard from "@/components/ProdutoCard/ProdutoCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) =>
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then((res) => res.json())
    .then((data) => JSON.parse(data.contents));

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "https://deisishop.pythonanywhere.com/products",
    fetcher
  );

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [order, setOrder] = useState("name-asc");
  const [cart, setCart] = useState<Product[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [response, setResponse] = useState("");

  // Atualiza filteredData quando muda pesquisa ou dados
  useEffect(() => {
    if (!data) return;

    let filtered = data.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );

    // Ordenação
    if (order === "name-asc") filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (order === "name-desc") filtered.sort((a, b) => b.title.localeCompare(a.title));
    if (order === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (order === "price-desc") filtered.sort((a, b) => b.price - a.price);

    setFilteredData(filtered);
  }, [data, search, order]);

  // Guarda carrinho no localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id: number) => setCart((prev) => prev.filter((p) => p.id !== id));
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const buy = () => {
    setResponse("Compra realizada com sucesso! (simulação)");
  };

  if (error) return <p className="text-red-500 text-center text-2xl">Erro ao carregar produtos</p>;
  if (isLoading) return <div className="flex justify-center items-center h-screen"><Spinner /></div>;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">DEISI Shop</h1>

      {/* Pesquisa + Ordenação */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-1"
        />
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="name-asc">Nome (A → Z)</option>
          <option value="name-desc">Nome (Z → A)</option>
          <option value="price-asc">Preço (barato → caro)</option>
          <option value="price-desc">Preço (caro → barato)</option>
        </select>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredData.map((product) => (
          <ProdutoCard
            key={product.id}
            product={product}
            onAdd={() => addToCart(product)}
          />
        ))}
      </div>

      {/* Carrinho */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Carrinho ({cart.length} itens)</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Carrinho vazio</p>
        ) : (
          <>
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center mb-3 p-3 bg-white rounded">
                <span>{product.title}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{product.price}€</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            <div className="text-xl font-bold mt-6">Total: {total}€</div>
          </>
        )}

        <div className="mt-6 space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />
            <span>Estudante DEISI (desconto simulado)</span>
          </label>
          <input
            type="text"
            placeholder="Cupão de desconto"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          <Button onClick={buy} className="w-full text-lg">
            Comprar
          </Button>
          {response && <p className="text-green-600 font-bold text-center">{response}</p>}
        </div>
      </div>
    </main>
  );
}