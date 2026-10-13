import { useEffect, useRef, useState } from 'react'
import { interpretarComando, secoes } from '../data/navigation.js'

export default function Terminal({ t, onNavegar }) {
  const [aberto, setAberto] = useState(false)
  const [comando, setComando] = useState('')
  // Guardamos tipos e dados, não frases traduzidas. Assim o histórico acompanha o idioma.
  const [historico, setHistorico] = useState([{ tipo: 'inicio' }])
  const historicoRef = useRef(null)
  const campoRef = useRef(null)

  useEffect(() => {
    // Rola somente a área de histórico, sem usar scrollIntoView na página.
    const painel = historicoRef.current
    painel.scrollTop = painel.scrollHeight
  }, [historico, t, aberto])

  function executar(event) {
    event.preventDefault()
    const resposta = interpretarComando(comando)
    if (resposta.tipo === 'limpar') {
      setHistorico([])
    } else if (resposta.tipo !== 'vazio') {
      if (resposta.tipo === 'abrir') onNavegar(resposta.secao)
      // A entrada original é preservada, inclusive maiúsculas e espaços.
      setHistorico((anterior) => [...anterior, { ...resposta, entrada: comando }])
    }
    setComando('')
    campoRef.current.focus({ preventScroll: true })
  }

  return (
    <section className="terminal" aria-labelledby="titulo-terminal">
      <h2 id="titulo-terminal">{t.terminal}</h2>
      <button className="terminal-toggle" type="button" aria-expanded={aberto}
        aria-controls="painel-terminal" onClick={() => setAberto(!aberto)}>
        <span aria-hidden="true">›_</span> {t.terminal}
        <span aria-hidden="true">{aberto ? '▾' : '▸'}</span>
      </button>
      {/* Mantemos o painel montado para preservar os comandos e o histórico ao recolher. */}
      <div id="painel-terminal" className={`terminal-content${aberto ? ' is-open' : ''}`}>
      <div className="terminal-history" ref={historicoRef} role="log"
        aria-label={t.terminalHistory} aria-live="polite" tabIndex={0}>
        {historico.map((item, indice) => (
          <div className="terminal-entry" key={indice}>
            {item.entrada !== undefined && <p className="prompt">evelyn@portfolio:~$ {item.entrada}</p>}
            {item.tipo === 'inicio' && <p>{t.terminalWelcome}</p>}
            {item.tipo === 'desconhecido' && <p>{t.terminalUnknown}</p>}
            {item.tipo === 'abrir' && <p>{t.terminalOpened} {item.arquivo} — {t[item.secao]}</p>}
            {item.tipo === 'ajuda' && (
              <>
                <p>{t.terminalHelp}</p>
                <ul>{secoes.map((secao) => <li key={secao.id}>{secao.arquivo} — {t[secao.id]}</li>)}</ul>
              </>
            )}
          </div>
        ))}
      </div>
      {/* O formulário permite executar com Enter e também com o botão. */}
      <form className="terminal-form" onSubmit={executar}>
        <label className="terminal-prompt" htmlFor="comando-terminal">
          <span aria-hidden="true">evelyn@portfolio:~$</span>
          <span className="sr-only">{t.terminalCommand}</span>
        </label>
        <input ref={campoRef} id="comando-terminal" value={comando}
          onChange={(event) => setComando(event.target.value)}
          autoComplete="off" autoCapitalize="off" spellCheck={false} />
        <button type="submit">{t.terminalRun}</button>
      </form>
      </div>
    </section>
  )
}
