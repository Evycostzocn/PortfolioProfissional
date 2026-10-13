import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Explorer from './components/Explorer.jsx'
import Conteudo from './sections/Conteudo.jsx'
import './App.css'

import Terminal from './components/Terminal.jsx'
import { translations } from './data/translations.js'
import { secoes } from './data/navigation.js'

// O navegador pode bloquear o armazenamento. Nesse caso, usamos português.
function lerIdioma() {
  try {
    return localStorage.getItem('portfolio-idioma') === 'en' ? 'en' : 'pt'
  } catch {
    return 'pt'
  }
}

export default function App() {
  // O estado guarda a seção aberta. Menu e explorador alteram o mesmo estado.
  const [secaoAtual, setSecaoAtual] = useState('sobre')
  const [idioma, setIdioma] = useState(lerIdioma)
  const t = translations[idioma]
  const secao = secoes.find((item) => item.id === secaoAtual)

  // Uma única função atende menu, explorador e terminal, mantendo tudo sincronizado.
  function abrirSecao(id) {
    setSecaoAtual(id)
  }

  useEffect(() => {
    document.documentElement.lang = idioma === 'pt' ? 'pt-BR' : 'en'
    document.title = `Evelyn Costa — ${t.portfolio}`
    try {
      localStorage.setItem('portfolio-idioma', idioma)
    } catch {
      // A troca continua funcionando mesmo quando o armazenamento está bloqueado.
    }
  }, [idioma, t])

  return (
    <div className="editor">
      <a className="skip-link" href="#conteudo">{t.skip}</a>
      <Header idioma={idioma} onIdioma={setIdioma} secoes={secoes} secaoAtual={secaoAtual} onNavegar={abrirSecao} t={t} />
      <div className="workspace">
        <Explorer secoes={secoes} secaoAtual={secaoAtual} onNavegar={abrirSecao} t={t} />
        <div className="editor-body">
          {/* A aba é apenas a identificação do arquivo aberto, sem ação de fechar. */}
          <div className="tabs" aria-live="polite">
            <span className="active-tab">{secao.arquivo}</span>
          </div>
          <main id="conteudo" tabIndex={-1} aria-labelledby="titulo-secao">
            <h1 id="titulo-secao">{t[secao.id]}</h1>
            <Conteudo secaoAtual={secaoAtual} t={t} />
          </main>
          <Terminal t={t} onNavegar={abrirSecao} />
        </div>
      </div>
      <footer>
        <span>© 2026 Evelyn Costa</span>
      </footer>
    </div>
  )
}
