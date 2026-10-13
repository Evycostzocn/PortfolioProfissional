import { useRef, useState } from 'react'

// O explorador usa a mesma lista e o mesmo evento de navegação do menu.
export default function Explorer({ secoes, secaoAtual, onNavegar, t }) {
  const [aberto, setAberto] = useState(false)
  const botaoRef = useRef(null)

  function selecionar(id) {
    onNavegar(id)
    setAberto(false)
    // Devolve o foco ao controle visível quando a lista móvel é recolhida.
    if (window.matchMedia('(max-width: 800px)').matches) botaoRef.current.focus()
  }

  return (
    <aside className="explorer">
      <button className="explorer-toggle" type="button" ref={botaoRef}
        aria-expanded={aberto} aria-controls="arquivos-explorador" onClick={() => setAberto(!aberto)}>
        <span aria-hidden="true">▱</span> {t.filesToggle}
        <span aria-hidden="true">{aberto ? '▾' : '▸'}</span>
      </button>
      <div id="arquivos-explorador" className={`explorer-content${aberto ? ' is-open' : ''}`}>
      <h2>{t.explorer}</h2>
      <p className="folder"><span aria-hidden="true">⌄</span> {t.portfolio} — Evelyn</p>
      <nav aria-label={t.files}>
        {secoes.map((secao) => (
          <button key={secao.id} type="button" aria-current={secaoAtual === secao.id ? 'page' : undefined}
            onClick={() => selecionar(secao.id)}>
            <span className="file-icon" aria-hidden="true">{secao.id === 'projetos' ? '{}' : secao.id === 'contato' ? '〈〉' : '#'}</span>
            {secao.arquivo}
          </button>
        ))}
      </nav>
      </div>
    </aside>
  )
}
