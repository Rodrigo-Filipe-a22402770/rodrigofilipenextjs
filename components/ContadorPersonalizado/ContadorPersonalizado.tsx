"use client";

import { useState, useEffect } from "react";

interface Props {
  title: string;
}

export default function ContadorPersonalizado({ title }: Props) {
  // 1. Começa com 0 e só lê localStorage no browser
  const [likes, setLikes] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 2. Quando montar no browser, lê o localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(title);
    if (stored) setLikes(parseInt(stored));
  }, [title]);

  // 3. Só grava no localStorage depois de montado
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(title, `${likes}`);
    }
  }, [likes, mounted]);

  // 4. Se não montou, mostra um botão simples (evita erro)
  if (!mounted) return <button className="px-4 py-2 bg-gray-200 rounded">Carregando...</button>;

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Likes: {likes}
    </button>
  );
}