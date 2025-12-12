import Image from "next/image";
import { Card } from "@/components/ui/card"; // Shadcn
import { Product } from "@/models/interfaces";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
  onAdd?: () => void;
  onRemove?: () => void;
}

export default function ProdutoCard({ product, onAdd, onRemove }: Props) {
  return (
    <Card className="p-4">
      <h3>{product.title}</h3>
      <Image src={"https://deisishop.pythonanywhere.com/" + product.image} alt={product.title} width={100} height={100} />
      <p>Preço: {product.price}</p>
      {onAdd && <Button onClick={onAdd}>Adicionar</Button>}
      {onRemove && <Button onClick={onRemove}>Remover</Button>}
    </Card>
  );
}