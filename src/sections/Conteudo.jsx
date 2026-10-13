// Somente a seção selecionada é exibida. Edite aqui os textos do portfólio.
// Os espaços provisórios indicam conteúdos que serão preenchidos nas próximas sprints.
export default function Conteudo({ secaoAtual }) {
  if (secaoAtual === 'sobre') {
    return (
      <>
        <h2 className="name">Evelyn Costa</h2>
        <p className="intro">Estudante de Engenharia de Software e desenvolvedora em formação.</p>
        <div className="about-grid">
          <div className="photo-placeholder">
            <img src="assets/images/fotoprincipal.jpeg" alt="Evelyn"/>
            <span aria-hidden="true">EC</span>
            <small>Espaço para foto de perfil</small>
          </div>
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
        <p>Minha trajetória em projetos, do mais antigo ao mais recente.</p>
        <p className="muted">Estrutura inicial da timeline. Os projetos e períodos serão adicionados depois.</p>
        <ol className="timeline">
          {['Primeiro projeto da timeline', 'Próximo projeto da timeline'].map((titulo) => (
            <li key={titulo}>
              <article className="card">
                <span className="eyebrow">Espaço reservado · período a preencher</span>
                <h2>{titulo}</h2>
                <p>Nome e descrição do projeto a preencher.</p>
                <p className="muted">Tecnologias e link do repositório a adicionar.</p>
                <div className="media-placeholder">Espaço para imagem ou GIF do projeto</div>
              </article>
            </li>
          ))}
        </ol>
      </>
    )
  }

  if (secaoAtual === 'experiencias') {
    return (
      <article className="card">
        <span className="eyebrow">Trajetória profissional · em construção</span>
        <h2>Modelagem de Processos</h2>
        <dl className="details">
          <dt>Empresa</dt><dd>Quasar Tecnologia e Gestão</dd>
          <dt>Cargo</dt><dd>Estagiária de Analista de Produto</dd>
          <dt>Período</dt><dd>Fevereiro/2026 até Agosto/2026</dd>
          <dt>Descrição</dt><dd>Atuei na criação e modelagem de processos no sistema da empresa, utilizando BPMN para representar fluxos e participando de uma rotina de trabalho orientada por Scrum.</dd>
        </dl>
        <p></p>
        <h2>Desenvolvimento Web</h2>
        <dl className="details">
          <dt>Empresa</dt><dd>Quasar Tecnologia e Gestão</dd>
          <dt>Cargo</dt><dd>Estagiária de Desenvolvimento Web</dd>
          <dt>Período</dt><dd>Setembro/2026 até atualmente</dd>
          <dt>Descrição</dt><dd>Atuo no desenvolvimento front-end, com foco na responsividade do sistema e na adaptação das interfaces para diferentes dispositivos e tamanhos de tela.</dd>
        </dl>
        <p></p>
        <h2>Jovem aprendiz</h2>
        <dl className="details">
          <dt>Empresa</dt><dd>Reframax</dd>
          <dt>Cargo</dt><dd>Jovem aprendiz no SENAI</dd>
          <dt>Período</dt><dd>Fevereiro/2025 até Dezembro/2025</dd>
          <dt>Descrição</dt><dd>Participei do programa de aprendizagem profissional da Reframax, com formação em Elétrica Predial no SENAI, desenvolvendo conhecimentos teóricos e práticos da área.</dd>
        </dl>
      </article>
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
