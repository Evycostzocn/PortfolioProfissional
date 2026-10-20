import GameActions from '../components/GameActions.jsx'
import Contato from './Contato.jsx'
import WakaTime from './WakaTime.jsx'
import Recomendacoes from './Recomendacoes.jsx'
import fotoPrincipal from '../assets/images/fotoprincipal.jpeg'
import logoQuasar from '../assets/images/quasar.jpeg'
import logoReframax from '../assets/images/reframax.jpeg'
import { projetos } from '../data/projects.js'
import VideoProjeto from '../components/VideoProjeto.jsx'
import Inicio from './Inicio.jsx'

// Somente a seção selecionada é exibida. Os textos vêm de data/translations.js.
export default function Conteudo({ secaoAtual, t, onNavegar, onJogar }) {
  if (secaoAtual === 'inicio') return <Inicio t={t} onNavegar={onNavegar} onJogar={onJogar} />

  if (secaoAtual === 'sobre') {
    return (
      <>
        <h2 className="name">Evelyn Costa</h2>
        <p className="intro">{t.intro}</p>
        <div className="about-grid">
          {/* O import permite que o Vite encontre a foto também no build de produção. */}
          <img className="profile-photo" src={fotoPrincipal} alt="Evelyn Costa" />
          <div>
            <h3>{t.welcome}</h3>
            <p>{t.about}</p>
            <dl className="details">
              <dt>{t.educationLabel}</dt><dd>{t.education}</dd>
              <dt>{t.workLabel}</dt><dd>{t.work}</dd>
              <dt>{t.interestsLabel}</dt><dd>{t.interests}</dd>
            </dl>
          </div>
        </div>
      </>
    )
  }

  if (secaoAtual === 'projetos') {
    return (
      <>
        <p>{t.projectsIntro}</p>
        <p className="muted">{t.chronology}</p>
        <ol className="timeline">
          {projetos.map((projeto) => (
            <li key={projeto.nome}>
              <article id={`projeto-${projeto.id}`} tabIndex={-1} className="card project-card">
                <h2>{projeto.nome}</h2>
                <p>{t[projeto.descricao]}</p>
                <ul className="technologies" aria-label={`${t.technologies} ${projeto.nome}`}>
                  {projeto.tecnologias.map((tecnologia) => <li key={tecnologia}>{tecnologia}</li>)}
                </ul>
                {projeto.jogo && <GameActions projeto={projeto} t={t} onJogar={onJogar} />}
                {!projeto.jogo && <a className="repository-link" href={projeto.repositorio}>{t.repository} {projeto.nome} ↗</a>}
                {projeto.video ? (
                  <VideoProjeto src={projeto.video} nome={projeto.nome} t={t} />
                ) : (
                  <img className="project-media" src={projeto.imagem} alt={t[projeto.alt]} loading="lazy" />
                )}
              </article>
            </li>
          ))}
        </ol>
      </>
    )
  }

  if (secaoAtual === 'experiencias') {
    return (
      <div className="experience-list">
        <article className="card experience-card">
          <img className="company-logo" src={logoQuasar} alt="Quasar Tecnologia e Gestão" />
          <h2>{t.processTitle}</h2>
          <dl className="details">
            <dt>{t.company}</dt><dd>Quasar Tecnologia e Gestão</dd>
            <dt>{t.role}</dt><dd>{t.processRole}</dd>
            <dt>{t.period}</dt><dd>{t.processPeriod}</dd>
            <dt>{t.description}</dt><dd>{t.processDescription}</dd>
          </dl>
        </article>
        <article className="card experience-card">
          <img className="company-logo" src={logoQuasar} alt="Quasar Tecnologia e Gestão" />
          <h2>{t.webTitle}</h2>
          <dl className="details">
            <dt>{t.company}</dt><dd>Quasar Tecnologia e Gestão</dd>
            <dt>{t.role}</dt><dd>{t.webRole}</dd>
            <dt>{t.period}</dt><dd>{t.webPeriod}</dd>
            <dt>{t.description}</dt><dd>{t.webDescription}</dd>
          </dl>
        </article>
        <article className="card experience-card">
          <img className="company-logo" src={logoReframax} alt="Reframax" />
          <h2>{t.apprenticeTitle}</h2>
          <dl className="details">
            <dt>{t.company}</dt><dd>Reframax</dd>
            <dt>{t.role}</dt><dd>{t.apprenticeRole}</dd>
            <dt>{t.period}</dt><dd>{t.apprenticePeriod}</dd>
            <dt>{t.description}</dt><dd>{t.apprenticeDescription}</dd>
          </dl>
        </article>
      </div>
    )
  }

  if (secaoAtual === 'contato') return <Contato t={t} />

  if (secaoAtual === 'wakatime') return <WakaTime t={t} />

  if (secaoAtual === 'recomendacoes') return <Recomendacoes t={t} />

  return null
}
