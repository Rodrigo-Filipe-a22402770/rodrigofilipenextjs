import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-green-600 p-4 text-white">
      <nav className="flex justify-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/projetos">Projetos</Link>
        <Link href="/tecnologias">Tecnologias</Link>
        <Link href="/contador">Contador</Link>
        <Link href="/produtos">Produtos</Link>
      </nav>
    </header>
  );
}