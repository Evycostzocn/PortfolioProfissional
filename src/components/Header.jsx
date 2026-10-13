// O cabeçalho recebe o estado do App. Cada clique informa qual seção abrir.
export default function Header({ secoes, secaoAtual, onNavegar }) {
  return (
    <header className="header">
      <div className="identity"><span className="brand-mark" aria-hidden="true">◇</span> Evelyn Costa <span className="muted">— Portfólio</span></div>
      <nav className="top-nav" aria-label="Menu principal">
        {secoes.map((secao) => (
          <button key={secao.id} type="button" aria-current={secaoAtual === secao.id ? 'page' : undefined}
            onClick={() => onNavegar(secao.id)}>{secao.titulo}</button>
        ))}
      </nav>
      <span className="language">PT / EN <small>em breve</small></span>
    </header>
  )
}
