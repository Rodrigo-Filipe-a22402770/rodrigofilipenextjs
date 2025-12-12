interface ProjetoProps {
  nome: string;
  url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <p>
      Projeto {nome}: <a href={url} target="_blank" rel="noopener noreferrer">Link</a>
    </p>
  );
}