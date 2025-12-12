// components/ProdutoCard/Carrinho.tsx
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/models/interfaces";

export default function Carrinho() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [response, setResponse] = useState("");

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Guardar sempre que mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cálculo do total (CORRIGIDO!)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0).toFixed(2);

  // Adicionar ao carrinho (função global para o ProdutoCard usar)
  const addToCart = (product: Product) => {
    setCart(curr => {
      const exists = curr.find(i => i.product.id === product.id);
      if (exists) {
        return curr.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...curr, { product, quantity: 1 }];
    });
  };

  // Expor função globalmente (para o ProdutoCard usar)
  useEffect(() => {
    // @ts-ignore
    window.addToCartGlobal = addToCart;
  }, []);

  const removeOne = (id: number) => {
    setCart(curr =>
      curr
        .map(i => i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);
  const removeDuplicates = () => setCart(curr => curr.map(i => ({ ...i, quantity: 1 })));

  const handleBuy = async () => {
    if (cart.length === 0) {
      setResponse("Carrinho vazio!");
      return;
    }

    const productIds = cart.flatMap(item => Array(item.quantity).fill(item.product.id));

    const payload = {
      products: productIds,
      name: "Aluno DIW",
      student: isStudent,
      coupon: coupon.trim(),
    };

    console.log("Enviando compra:", payload);

    try {
      const res = await fetch("https://deisishop.pythonanywhere.com/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Resposta:", result);

      if (res.ok) {
        setResponse(`Compra efetuada! Total: ${result.totalCost}€ | Ref: ${result.reference}`);
        setCart([]);
        localStorage.removeItem("cart");
      } else {
        setResponse(`Erro: ${result.error || "Compra não autorizada"}`);
      }
    } catch (err) {
      setResponse("Erro de rede");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-12">
      <h2 className="text-3xl font-bold mb-6">Carrinho ({totalItems} itens)</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Carrinho vazio</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {Number(item.product.price).toFixed(2)}€ ={" "}
                    {(item.quantity * Number(item.product.price)).toFixed(2)}€
                  </p>
                </div>
                <Button onClick={() => removeOne(item.product.id)} variant="destructive" size="sm">
                  Remover
                </Button>
              </div>
            ))}
          </div>

          <p className="text-2xl font-bold text-right mb-8">Total: {totalPrice}€</p>

          <div className="flex gap-3 mb-6">
            <Button onClick={removeDuplicates} variant="secondary" size="sm">
              1 de cada
            </Button>
            <Button onClick={clearCart} variant="destructive" size="sm">
              Esvaziar
            </Button>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={isStudent} onChange={e => setIsStudent(e.target.checked)} />
              <span className="text-lg">Estudante DEISI</span>
            </label>
            <input
              type="text"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              placeholder="Cupão (ex: DEISI2025)"
              className="w-full px-4 py-3 border rounded-lg"
            />
            <Button onClick={handleBuy} className="w-full text-lg py-6" size="lg">
              Comprar
            </Button>
          </div>

          {response && (
            <div className={`mt-6 p-4 rounded-lg text-center font-bold text-lg ${response.includes("efetuada") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {response}
            </div>
          )}
        </>
      )}
    </div>
  );
}