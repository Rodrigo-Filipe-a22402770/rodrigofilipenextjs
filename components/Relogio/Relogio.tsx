"use client";

import { useState, useEffect } from "react";

export default function Relogio() {
  const [hora, setHora] = useState<string>("");

  useEffect(() => {
    // Só começa a atualizar a hora QUANDO ESTIVER NO BROWSER (cliente)
    setHora(new Date().toLocaleTimeString("pt-PT"));

    const id = setInterval(() => {
      setHora(new Date().toLocaleTimeString("pt-PT"));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // Se ainda não tiver hora (primeira renderização no servidor), não mostra nada
  if (!hora) return null;

  return <p>Hora atual: {hora}</p>;
}