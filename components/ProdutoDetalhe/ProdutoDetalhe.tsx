import Image from "next/image";
import { Product } from "@/models/interfaces";

interface Props {
  product: Product;
}

export default function ProdutoDetalhe({ product }: Props) {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2>{product.title}</h2>
      <Image src={product.image} alt={product.title} width={200} height={200} />
      <p>Preço: {product.price}</p>
      <p>Descrição: {product.description}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    </div>
  );
}