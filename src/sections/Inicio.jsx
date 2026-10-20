import GameActions from '../components/GameActions.jsx'
import fotoPrincipal from '../assets/images/fotoprincipal.jpeg'
import { projetos, projetoDestaqueId } from '../data/projects.js'
import VideoProjeto from '../components/VideoProjeto.jsx'

const atalhos = [
  { id: 'projetos', icone: '{}', descricao: 'homeProjectsHint' },
  { id: 'experiencias', icone: '#', descricao: 'homeExperienceHint' },
  { id: 'contato', icone: '〈〉', descricao: 'homeContactHint' },
]

export default function Inicio({ t, onNavegar, onJogar }) {
  const destaque = projetos.find((projeto) => projeto.id === projetoDestaqueId) ?? projetos[0]
  const abrir = (id) => onNavegar(id, 'conteudo')

  return (
    <div className="home">
      <section className="home-hero" aria-labelledby="home-name">
        <div>
          <p className="eyebrow">{t.homeGreeting}</p>
          <h2 id="home-name" className="home-name">Evelyn Costa<span aria-hidden="true">.</span></h2>
          <p className="home-headline">{t.homeHeadline}</p>
          <p className="home-summary">{t.homeSummary}</p>
          <p className="home-code"><span aria-hidden="true">› </span>{t.homeCode}<span className="code-cursor" aria-hidden="true">▍</span></p>
          <div className="home-actions">
            <button type="button" className="action-button" onClick={() => abrir('sobre')}>{t.sobre}</button>
            <button type="button" className="action-button secondary" onClick={() => abrir('projetos')}>{t.homeProjects}</button>
            <button type="button" className="action-button secondary" onClick={() => abrir('contato')}>{t.homeContact}</button>
          </div>
        </div>
        <img className="profile-photo home-photo" src={fotoPrincipal} alt="Evelyn Costa" width="220" height="293" />
      </section>

      <section className="home-explore" aria-labelledby="home-explore-title">
        <h2 id="home-explore-title">{t.homeExplore}</h2>
        <div className="shortcut-grid">
          {atalhos.map((atalho) => (
            <button type="button" className="shortcut" key={atalho.id} onClick={() => abrir(atalho.id)}>
              <span className="file-icon" aria-hidden="true">{atalho.icone}</span>
              <span><strong>{t[atalho.id]}</strong><span className="shortcut-description">{t[atalho.descricao]}</span></span>
              <span className="shortcut-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-featured" aria-labelledby="home-featured-title">
        <h2 id="home-featured-title">{t.homeFeatured}</h2>
        <article className="card featured-card">
          <div>
            <span className="eyebrow" aria-hidden="true">{`// ${destaque.id}`}</span>
            <h3>{destaque.nome}</h3>
            <p>{t[destaque.descricao]}</p>
            <ul className="technologies" aria-label={`${t.technologies} ${destaque.nome}`}>
              {destaque.tecnologias.map((tecnologia) => <li key={tecnologia}>{tecnologia}</li>)}
            </ul>
            {destaque.jogo && <GameActions projeto={destaque} t={t} onJogar={onJogar} />}
            <button type="button" className="action-button secondary" onClick={() => onNavegar('projetos', `projeto-${destaque.id}`)}>{t.homeViewProject} <span aria-hidden="true">↗</span></button>
          </div>
          {destaque.imagem ? <img className="project-media" src={destaque.imagem} alt={t[destaque.alt]} loading="lazy" /> : <VideoProjeto src={destaque.video} nome={destaque.nome} t={t} />}
        </article>
      </section>
    </div>
  )
}
