// components/ProdutoCard/ProdutoCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/models/interfaces";

interface Props {
  product: Product;
}

export default function ProdutoCard({ product }: Props) {
  const img = product.image.startsWith("http")
    ? product.image
    : `https://deisishop.pythonanywhere.com${product.image}`;

  return (
    <Link href={`/produtos/${product.id}`} className="block group">
      <div className="bg-white rounded-xl shadow hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <Image
          src={img}
          alt={product.title}
          width={400}
          height={400}
          className="w-full h-64 object-cover rounded-t-xl"
        />
        <div className="p-6">
          <h3 className="font-bold text-lg text-center mb-3 line-clamp-2">{product.title}</h3>
          <p className="text-3xl font-bold text-green-600 text-center mb-6">
            {Number(product.price).toFixed(2)}€
          </p>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Chama a função global do Carrinho
              // @ts-ignore
              window.addToCartGlobal?.(product);
            }}
            className="w-full text-lg py-6"
          >
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </Link>
  );
}