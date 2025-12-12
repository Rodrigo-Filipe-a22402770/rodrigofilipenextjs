interface CaracteristicaProps {
  caracteristica: string;
}

export default function Caracteristica({ caracteristica }: CaracteristicaProps) {
  return (
    <div className="p-2 bg-blue-100 rounded">
      <p>{caracteristica}</p>
      <a href={`/caracteristicas/${caracteristica}`}>Ver Detalhe</a> {/* Simplified index */}
    </div>
  );
}