import { useState } from 'react'
import Header from './components/Header.jsx'
import Explorer from './components/Explorer.jsx'
import Conteudo from './sections/Conteudo.jsx'
import './App.css'

// Esta lista mantém os nomes do menu, dos arquivos e da aba em um só lugar.
const secoes = [
  { id: 'sobre', titulo: 'Sobre mim', arquivo: 'sobre.md' },
  { id: 'projetos', titulo: 'Projetos', arquivo: 'projetos.json' },
  { id: 'experiencias', titulo: 'Experiências', arquivo: 'experiencias.md' },
  { id: 'contato', titulo: 'Contato', arquivo: 'contato.html' },
  { id: 'wakatime', titulo: 'WakaTime', arquivo: 'wakatime.md' },
  { id: 'recomendacoes', titulo: 'Recomendações', arquivo: 'recomendacoes.md' },
]

export default function App() {
  // O estado guarda a seção aberta. Menu e explorador alteram o mesmo estado.
  const [secaoAtual, setSecaoAtual] = useState('sobre')
  const secao = secoes.find((item) => item.id === secaoAtual)

  return (
    <div className="editor">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header secoes={secoes} secaoAtual={secaoAtual} onNavegar={setSecaoAtual} />
      <div className="workspace">
        <Explorer secoes={secoes} secaoAtual={secaoAtual} onNavegar={setSecaoAtual} />
        <div className="editor-body">
          {/* A aba é apenas a identificação do arquivo aberto, sem ação de fechar. */}
          <div className="tabs" aria-live="polite">
            <span className="active-tab">{secao.arquivo}</span>
          </div>
          <main id="conteudo" tabIndex={-1} aria-labelledby="titulo-secao">
            <h1 id="titulo-secao">{secao.titulo}</h1>
            <Conteudo secaoAtual={secaoAtual} />
          </main>
          <section className="terminal" aria-labelledby="titulo-terminal">
            <h2 id="titulo-terminal">Terminal</h2>
            <p className="prompt">evelyn@portfolio:~$ <span aria-hidden="true">▏</span></p>
            <p>Terminal visual · Os comandos serão implementados em uma próxima sprint.</p>
          </section>
        </div>
      </div>
      <footer>
        <span>Evelyn Costa · Portfólio profissional</span>
        <span>Sprint 01 <span aria-hidden="true">·</span> <a href="https://github.com/Evycostzocn">GitHub</a></span>
      </footer>
    </div>
  )
}
