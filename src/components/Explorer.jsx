// O explorador usa a mesma lista e o mesmo evento de navegação do menu.
export default function Explorer({ secoes, secaoAtual, onNavegar }) {
  return (
    <aside className="explorer">
      <h2>EXPLORADOR</h2>
      <p className="folder"><span aria-hidden="true">⌄</span> Portfólio — Evelyn</p>
      <nav aria-label="Arquivos do portfólio">
        {secoes.map((secao) => (
          <button key={secao.id} type="button" aria-current={secaoAtual === secao.id ? 'page' : undefined}
            onClick={() => onNavegar(secao.id)}>
            <span className="file-icon" aria-hidden="true">{secao.id === 'projetos' ? '{}' : secao.id === 'contato' ? '〈〉' : '#'}</span>
            {secao.arquivo}
          </button>
        ))}
      </nav>
    </aside>
  )
}
