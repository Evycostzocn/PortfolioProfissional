// O cabeçalho recebe o estado do App. Cada clique informa qual seção abrir.
export default function Header({ secoes, secaoAtual, onNavegar, t, idioma, onIdioma }) {
  return (
    <header className="header">
      <div className="identity"><span className="brand-mark" aria-hidden="true">◇</span> Evelyn Costa <span className="muted">— {t.portfolio}</span></div>
      <nav className="top-nav" aria-label={t.mainMenu}>
        {secoes.map((secao) => (
          <button key={secao.id} type="button" aria-current={secaoAtual === secao.id ? 'page' : undefined}
            onClick={() => onNavegar(secao.id)}>{t[secao.id]}</button>
        ))}
      </nav>
      {/* Botões nativos permitem usar Tab, Enter e Espaço para trocar o idioma. */}
      <div className="language" role="group" aria-label={t.language}>
        <button type="button" lang="pt-BR" aria-label="Português" aria-pressed={idioma === 'pt'} onClick={() => onIdioma('pt')}>PT</button>
        <span aria-hidden="true"> | </span>
        <button type="button" lang="en" aria-label="English" aria-pressed={idioma === 'en'} onClick={() => onIdioma('en')}>EN</button>
      </div>
    </header>
  )
}
