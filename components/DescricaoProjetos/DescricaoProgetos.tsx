import Projeto from "./../Projeto/Projeto";

export default function DescricaoProjetos() {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <p>Fiz vários projetos. Veja no GitHub:</p>
      <a href="https://github.com/Rodrigo-Filipe-a22402770" target="_blank" rel="noopener noreferrer">
        O meu GitHub
      </a>
      <Projeto nome="Loja" url="" />
      <Projeto nome="Site com JS Interativo" url="https://github.com/rodrigofilipe2006/rodrigofilipe2006.github.io" />
    </div>
    //adicionar loja
  );
}