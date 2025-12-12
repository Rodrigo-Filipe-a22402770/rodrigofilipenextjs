"use client";

import { useState, useEffect } from "react";

export default function Contador() {
  // 1. Só lê o localStorage QUANDO JÁ ESTIVER NO BROWSER
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // 2. Quando o componente "montar" no browser, aí sim lê o localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("count");
    if (stored) setCount(parseInt(stored));
  }, []);

  // 3. Atualiza o localStorage e histórico só quando count mudar
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("count", `${count}`);
      setHistory((prev) => [...prev, count]);
    }
  }, [count, mounted]);

  const increment = () => setCount((prev) => (prev < 10 ? prev + 1 : prev));
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : prev));
  const reset = () => setCount(0);

  // 4. Se ainda não montou no browser, não renderiza nada (evita erro)
  if (!mounted) return <p>A carregar contador...</p>;

  // 5. Cor do número
  const getColor = () => {
    if (count <= 3) return "text-red-600";
    if (count <= 7) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Contador (0–10)</h2>
      <p className={`text-6xl font-bold mb-6 ${getColor()}`}>{count}</p>
      
      <div className="space-x-4 mb-6">
        <button onClick={increment} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          +
        </button>
        <button onClick={decrement} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          -
        </button>
        <button onClick={reset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Reset
        </button>
      </div>

      <details className="mt-6 text-left">
        <summary className="cursor-pointer font-semibold">Histórico de valores</summary>
        <ul className="mt-2 max-h-40 overflow-y-auto bg-white p-3 rounded border">
          {history.length === 0 ? (
            <li className="text-gray-500">Ainda sem histórico</li>
          ) : (
            history.map((val, i) => (
              <li key={i}>→ {val}</li>
            ))
          )}
        </ul>
      </details>
    </div>
  );
}