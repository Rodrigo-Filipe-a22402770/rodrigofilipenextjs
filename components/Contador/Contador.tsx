// components/Contador/Contador.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Contador() {
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // Carrega valor e histórico do localStorage ao montar o componente
  useEffect(() => {
    setMounted(true);

    const storedCount = localStorage.getItem("contador_valor");
    const storedHistory = localStorage.getItem("contador_historico");

    if (storedCount) setCount(Math.min(Math.max(parseInt(storedCount), 0), 10));
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  // Guarda o valor atual no localStorage sempre que mudar
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("contador_valor", count.toString());
    }
  }, [count, mounted]);

  // Atualiza o histórico: só adiciona se for diferente do último
  useEffect(() => {
    if (mounted && history[history.length - 1] !== count) {
      const newHistory = [...history, count];
      setHistory(newHistory);
      localStorage.setItem("contador_historico", JSON.stringify(newHistory));
    }
  }, [count, mounted, history]);

  const increment = () => setCount(prev => Math.min(prev + 1, 10));
  const decrement = () => setCount(prev => Math.max(prev - 1, 0));
  const reset = () => setCount(0);

  // Apaga todo o histórico
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("contador_historico");
  };

  // Cor do número
  const getColor = () => {
    if (count <= 3) return "text-red-600";
    if (count <= 7) return "text-yellow-600";
    return "text-green-600";
  };

  if (!mounted) return <p className="text-center text-gray-500">A carregar contador...</p>;

  return (
    <div className="p-10 bg-white rounded-3xl shadow-2xl border border-purple-100 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contador (0–10)</h2>

      {/* Número grande com cor */}
      <div className={`text-8xl font-extrabold mb-8 ${getColor()} transition-all duration-300`}>
        {count}
      </div>

      {/* Botões principais */}
      <div className="flex justify-center gap-6 mb-10">
        <Button
          onClick={decrement}
          size="lg"
          variant="outline"
          className="text-2xl px-8 py-6 hover:bg-red-50"
        >
          −
        </Button>
        <Button
          onClick={reset}
          size="lg"
          variant="destructive"
          className="px-10 py-6 text-xl"
        >
          Reset
        </Button>
        <Button
          onClick={increment}
          size="lg"
          className="text-2xl px-8 py-6 bg-green-600 hover:bg-green-700"
        >
          +
        </Button>
      </div>

      {/* Histórico */}
      <div className="bg-gray-50 rounded-2xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-700">Histórico de valores</h3>
          {history.length > 0 && (
            <Button onClick={clearHistory} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
              Apagar histórico
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-gray-500 italic">Nenhum valor registado ainda</p>
        ) : (
          <ul className="text-left space-y-1 max-h-60 overflow-y-auto bg-white p-4 rounded-lg border">
            {history.map((val, index) => (
              <li key={index} className="text-lg">
                <span className="text-gray-500">{index + 1}.</span> →{" "}
                <span className="font-semibold">{val}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pequena legenda */}
      <div className="mt-8 flex justify-center gap-8 text-sm">
        <span className="flex items-center gap-2"><div className="w-4 h-4 bg-red-600 rounded"></div> 0–3</span>
        <span className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-600 rounded"></div> 4–7</span>
        <span className="flex items-center gap-2"><div className="w-4 h-4 bg-green-600 rounded"></div> 8–10</span>
      </div>
    </div>
  );
}