import fotoPrincipal from '../assets/images/fotoprincipal.jpeg'
import logoQuasar from '../assets/images/quasar.jpeg'
import logoReframax from '../assets/images/reframax.jpeg'
import infinityHub from '../assets/images/infinityhub.png'
import desligaAi from '../assets/images/desligaai.png'
import bigBang from '../assets/images/bigbang.mp4'
import VideoProjeto from '../components/VideoProjeto.jsx'

// Ordem provisória: reorganize esta lista do mais antigo ao mais recente
// quando as datas forem confirmadas. Textos, tecnologias, links e mídias ficam aqui.
// Descrições e tecnologias conferidas nos repositórios indicados em cada item.
const projetos = [
  {
    nome: 'Infinity HUB',
    descricao: 'Catálogo de jogos organizado por gênero, com foco em recomendações de jogos.',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'JSON Server'],
    repositorio: 'https://github.com/Evycostzocn/InfinityHUB',
    imagem: infinityHub,
    alt: 'Interface de cadastro e gerenciamento de jogos do Infinity HUB',
  },
  {
    nome: 'DesligaAi',
    descricao: 'Plataforma voltada ao equilíbrio digital, com ferramentas de autoconhecimento, monitoramento de hábitos e incentivo a atividades offline.',
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    repositorio: 'https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-2-ti1-2401100-desligaai',
    imagem: desligaAi,
    alt: 'Página inicial do DesligaAi com a proposta de equilibrar o tempo digital',
  },
  {
    nome: 'Big Bang',
    descricao: 'Jogo de sobrevivência em que dinossauros coletam alimentos e desviam de meteoros em um ambiente pré-histórico.',
    tecnologias: ['Python', 'Pygame', 'Pytest'],
    repositorio: 'https://github.com/defreitassl/Trabalho_Pygame',
    video: bigBang,
  },
]

// Somente a seção selecionada é exibida. Edite abaixo os textos do portfólio.
export default function Conteudo({ secaoAtual }) {
  if (secaoAtual === 'sobre') {
    return (
      <>
        <h2 className="name">Evelyn Costa</h2>
        <p className="intro">Estudante de Engenharia de Software e desenvolvedora em formação.</p>
        <div className="about-grid">
          {/* O import permite que o Vite encontre a foto também no build de produção. */}
          <img className="profile-photo" src={fotoPrincipal} alt="Evelyn Costa" />
          <div>
            <h3>Olá, seja bem-vindo(a)!</h3>
            <p>Sou estudante de Engenharia de Software na PUC Minas e estagiária em Desenvolvimento Web na Quasar Tecnologia e Gestão. Gosto de transformar ideias em soluções, explorando o desenvolvimento, a pesquisa, o planejamento e os testes. Este portfólio reúne minha trajetória e os projetos que construo ao longo da minha formação.</p>
            <dl className="details">
              <dt>Formação</dt><dd>Engenharia de Software — PUC Minas</dd>
              <dt>Atuação profissional</dt><dd>Estagiária em Desenvolvimento Web — Quasar Tecnologia e Gestão.</dd>
              <dt>Interesses e objetivos</dt><dd>Tenho interesse em desenvolvimento de software e cibersegurança. Busco ampliar meus conhecimentos e ganhar experiência na construção de aplicações, com o objetivo de atuar futuramente na área de cyber.</dd>
            </dl>
          </div>
        </div>
      </>
    )
  }

  if (secaoAtual === 'projetos') {
    return (
      <>
        <p>Conheça alguns dos projetos da minha trajetória.</p>
        <p className="muted">Linha do tempo em organização: a ordem cronológica ainda será confirmada.</p>
        <ol className="timeline">
          {projetos.map((projeto) => (
            <li key={projeto.nome}>
              <article className="card project-card">
                <h2>{projeto.nome}</h2>
                <p>{projeto.descricao}</p>
                <ul className="technologies" aria-label={`Tecnologias de ${projeto.nome}`}>
                  {projeto.tecnologias.map((tecnologia) => <li key={tecnologia}>{tecnologia}</li>)}
                </ul>
                <a className="repository-link" href={projeto.repositorio}>Ver repositório de {projeto.nome} ↗</a>
                {projeto.video ? (
                  <VideoProjeto src={projeto.video} nome={projeto.nome} />
                ) : (
                  <img className="project-media" src={projeto.imagem} alt={projeto.alt} loading="lazy" />
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
          <h2>Modelagem de Processos</h2>
          <dl className="details">
            <dt>Empresa</dt><dd>Quasar Tecnologia e Gestão</dd>
            <dt>Cargo</dt><dd>Estagiária de Analista de Produto</dd>
            <dt>Período</dt><dd>Fevereiro/2026 até Agosto/2026</dd>
            <dt>Descrição</dt><dd>Atuei na criação e modelagem de processos no sistema da empresa, utilizando BPMN para representar fluxos e participando de uma rotina de trabalho orientada por Scrum.</dd>
          </dl>
        </article>
        <article className="card experience-card">
          <img className="company-logo" src={logoQuasar} alt="Quasar Tecnologia e Gestão" />
          <h2>Desenvolvimento Web</h2>
          <dl className="details">
            <dt>Empresa</dt><dd>Quasar Tecnologia e Gestão</dd>
            <dt>Cargo</dt><dd>Estagiária de Desenvolvimento Web</dd>
            <dt>Período</dt><dd>Setembro/2026 até atualmente</dd>
            <dt>Descrição</dt><dd>Atuo no desenvolvimento front-end, com foco na responsividade do sistema e na adaptação das interfaces para diferentes dispositivos e tamanhos de tela.</dd>
          </dl>
        </article>
        <article className="card experience-card">
          <img className="company-logo" src={logoReframax} alt="Reframax" />
          <h2>Jovem aprendiz</h2>
          <dl className="details">
            <dt>Empresa</dt><dd>Reframax</dd>
            <dt>Cargo</dt><dd>Jovem aprendiz no SENAI</dd>
            <dt>Período</dt><dd>Fevereiro/2025 até Dezembro/2025</dd>
            <dt>Descrição</dt><dd>Participei do programa de aprendizagem profissional da Reframax, com formação em Elétrica Predial no SENAI, desenvolvendo conhecimentos teóricos e práticos da área.</dd>
          </dl>
        </article>
      </div>
    )
  }

  if (secaoAtual === 'contato') {
    return (
      <>
        <p>Você pode conhecer meus projetos no <a href="https://github.com/Evycostzocn">GitHub</a>.</p>
        <p className="muted">Outros links de contato serão adicionados depois.</p>
        {/* O evento impede a navegação padrão do formulário. Não há envio nesta sprint. */}
        <form className="contact-form" onSubmit={(event) => event.preventDefault()} aria-describedby="aviso-formulario">
          <p id="aviso-formulario">Prévia do formulário: envio indisponível nesta versão. Os dados não são enviados nem salvos.</p>
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" autoComplete="name" placeholder="Seu nome" />
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="seu@email.com" />
          <label htmlFor="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" rows={5} placeholder="Escreva sua mensagem" />
          <button type="submit" disabled>Envio em breve</button>
        </form>
      </>
    )
  }

  if (secaoAtual === 'wakatime') {
    return (
      <article className="card">
        <span className="eyebrow">Integração futura</span>
        <h2>Estatísticas de programação</h2>
        <p>Espaço reservado para tempo de programação, linguagens e atividade ao longo do tempo.</p>
        <div className="media-placeholder">As estatísticas aparecerão aqui após a definição da integração.</div>
        <p className="muted">Nenhum dado do WakaTime está conectado nesta versão.</p>
      </article>
    )
  }

  return (
    <article className="card">
      <span className="eyebrow">Recomendações profissionais</span>
      <h2>Espaço para futuras recomendações</h2>
      <p>Os depoimentos serão publicados somente com autorização.</p>
      <p className="muted">Cada recomendação poderá incluir nome, cargo ou relação profissional e texto autorizado.</p>
    </article>
  )
}
