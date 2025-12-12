// components/ProdutoCard/ProdutoDetalhe.tsx
import Image from "next/image";
import { Product } from "@/models/interfaces";

/**
 * Exibe todos os detalhes de um produto
 * Usado na página de detalhe (/produtos/[id])
 */
export default function ProdutoDetalhe({ product }: { product: Product }) {
  const img = product.image.startsWith("http")
    ? product.image
    : `https://deisishop.pythonanywhere.com${product.image}`;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-10">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Image
            src={img}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">{product.title}</h1>
          <p className="text-5xl font-bold text-green-600 mb-8">
            {Number(product.price).toFixed(2)}€
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">{product.description}</p>
          <div className="space-y-3 text-gray-600">
            <p><strong>Categoria:</strong> {product.category}</p>
            <p><strong>Avaliação:</strong> {product.rating.rate}★ ({product.rating.count} avaliações)</p>
          </div>
        </div>
      </div>
    </div>
  );
}