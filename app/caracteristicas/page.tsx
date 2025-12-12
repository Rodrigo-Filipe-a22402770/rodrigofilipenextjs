import { caracteristicas } from "@/data/caracteristicas";
import Caracteristica from "@/components/Caracteristica/Caracteristica";

export default function CaracteristicasPage() {
  return (
    <main className="p-4">
      <h1>Caracteristicas</h1>
      {caracteristicas.map((char, index) => (
        <Caracteristica key={index} caracteristica={char} />
      ))}
    </main>
  );
}