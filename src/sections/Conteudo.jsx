import Contato from './Contato.jsx'
import WakaTime from './WakaTime.jsx'
import Recomendacoes from './Recomendacoes.jsx'
import fotoPrincipal from '../assets/images/fotoprincipal.jpeg'
import logoQuasar from '../assets/images/quasar.jpeg'
import logoReframax from '../assets/images/reframax.jpeg'
import infinityHub from '../assets/images/infinityhub.png'
import desligaAi from '../assets/images/desligaai.png'
import bigBang from '../assets/images/bigbang.mp4'
import VideoProjeto from '../components/VideoProjeto.jsx'

// Ordem provisória: reorganize esta lista do mais antigo ao mais recente
// quando as datas forem confirmadas. As chaves de texto apontam para data/translations.js.
// Descrições e tecnologias conferidas nos repositórios indicados em cada item.
const projetos = [
  {
    nome: 'Infinity HUB',
    descricao: 'infinityDescription',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'JSON Server'],
    repositorio: 'https://github.com/Evycostzocn/InfinityHUB',
    imagem: infinityHub,
    alt: 'infinityAlt',
  },
  {
    nome: 'DesligaAi',
    descricao: 'desligaDescription',
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    repositorio: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-2-ti1-2401100-desligaai',
    imagem: desligaAi,
    alt: 'desligaAlt',
  },
  {
    nome: 'Big Bang',
    descricao: 'bigbangDescription',
    tecnologias: ['Python', 'Pygame', 'Pytest'],
    repositorio: 'https://github.com/defreitassl/Trabalho_Pygame',
    video: bigBang,
  },
]

// Somente a seção selecionada é exibida. Os textos vêm de data/translations.js.
export default function Conteudo({ secaoAtual, t }) {
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
              <article className="card project-card">
                <h2>{projeto.nome}</h2>
                <p>{t[projeto.descricao]}</p>
                <ul className="technologies" aria-label={`${t.technologies} ${projeto.nome}`}>
                  {projeto.tecnologias.map((tecnologia) => <li key={tecnologia}>{tecnologia}</li>)}
                </ul>
                <a className="repository-link" href={projeto.repositorio}>{t.repository} {projeto.nome} ↗</a>
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
