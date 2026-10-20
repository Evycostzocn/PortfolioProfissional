# 💻 Portfólio Profissional — Evelyn Costa

Portfólio profissional desenvolvido para apresentar minha trajetória, experiências, habilidades e projetos atuais e futuros.

A interface é inspirada no Visual Studio Code: cada seção é representada por um arquivo, que poderá ser acessado pelo menu, explorador lateral ou terminal interativo.

Projeto acadêmico da disciplina de Desenvolvimento e Integração de Aplicações Web (DIAW), do curso de Engenharia de Software da PUC Minas.

## 🎯 Objetivo

Criar um site responsivo com identidade visual própria, permitindo que visitantes conheçam minha formação, atuação profissional, interesses, objetivos e projetos por meio de uma navegação inspirada em um editor de código (VSCODE).

## 🗂️ Seções previstas

| Seção | Arquivo na interface | Conteúdo previsto |
| --- | --- | --- |
| Sobre mim | `sobre.md` | Apresentação em português e inglês, formação, atuação, interesses e objetivos profissionais. |
| Projetos | `projetos.json` | Linha do tempo do mais antigo ao mais recente, com nome, descrição, tecnologias, repositório e imagem ou GIF de cada projeto. |
| Experiências | `experiencias.md` | Empresa ou instituição, cargo ou atividade, período e descrição das experiências. |
| Contato | `contato.html` | Links de contato e formulário com nome, e-mail e mensagem. |
| WakaTime | `wakatime.md` | Espaço planejado para estatísticas de programação; integração a definir. |
| Recomendações | `recomendacoes.md` | Espaço planejado para recomendações profissionais autorizadas. |

Os nomes dos arquivos são elementos da interface e não precisam corresponder aos arquivos físicos do projeto.

## 🎨 Protótipo

O protótipo inicial foi elaborado no Figma a partir de um modelo da comunidade inspirado no VSCode, adaptado à identidade e ao conteúdo do portfólio.

🔗 [Acessar o projeto no Figma](https://www.figma.com/design/SCh7pN4kav3GJIBInlOyKO/Evelyn---Portf%C3%B3lio?node-id=0-1&t=pd9OAWmRXw0VBR3h-1)

### Telas do protótipo

**Sobre mim**

![Tela Sobre mim](<docs/prototipofigma/Sobre mim.png>)

**Projetos**

![Tela Projetos](docs/prototipofigma/Projetos.png)

**Experiências**

![Tela Experiências](docs/prototipofigma/Experiência.png)

**WakaTime**

![Tela WakaTime](docs/prototipofigma/Wakatime.png)

**Contato**

![Tela Contato](docs/prototipofigma/Contato.png)

### Organização visual

- Cabeçalho com identificação, navegação e seletor de idioma.
- Explorador lateral com os arquivos que representam as seções.
- Abas com indicação da seção aberta.
- Área principal para apresentação do conteúdo.
- Terminal interativo e rodapé com identificação e links.
- Adaptação da interface para desktop e dispositivos móveis.

## ⌨️ Terminal interativo

O terminal permitirá acessar as mesmas seções disponíveis no menu. A proposta inicial inclui os seguintes comandos:

| Comando | Ação prevista |
| --- | --- |
| `ajuda` | Exibe os comandos e arquivos disponíveis. |
| `sobre.md` | Abre a seção Sobre mim. |
| `projetos.json` | Abre a seção Projetos. |
| `experiencias.md` | Abre a seção Experiências. |
| `contato.html` | Abre a seção Contato. |
| `wakatime.md` | Abre a seção WakaTime. |
| `recomendacoes.md` | Abre a seção Recomendações. |
| `limpar` | Limpa o histórico do terminal. |

O terminal será uma simulação de navegação no navegador, sem executar comandos do sistema operacional.

## 🛠️ Tecnologias previstas

| Tecnologia | Finalidade |
| --- | --- |
| React | Construção da interface com componentes reutilizáveis e gerenciamento do estado da navegação, abas e terminal. |
| Vite | Configuração do ambiente de desenvolvimento, servidor local e geração da versão de produção. |
| HTML5 | Estrutura e marcação semântica da interface, utilizadas nos componentes por meio de JSX. |
| CSS3 | Estilização, layout e responsividade. |
| JavaScript | Navegação, terminal e interações da interface. |
| Node.js e npm | Ambiente para executar as ferramentas de desenvolvimento e gerenciar as dependências. |
| Figma | Planejamento e prototipação visual. |
| Git e GitHub | Versionamento e hospedagem do repositório. |

O front-end será desenvolvido em React com JavaScript e Vite. Bibliotecas adicionais, serviço de envio de e-mail, integração com WakaTime e hospedagem serão definidos conforme a evolução do projeto. As dependências efetivamente utilizadas serão documentadas neste README.

## 📁 Estrutura inicial prevista

```text
portfolio/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
├── public/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Explorer.jsx
│   │   ├── Tabs.jsx
│   │   ├── Terminal.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Sobre.jsx
│   │   ├── Projetos.jsx
│   │   ├── Experiencias.jsx
│   │   ├── Contato.jsx
│   │   ├── WakaTime.jsx
│   │   └── Recomendacoes.jsx
│   └── styles/
│       └── global.css
└── docs/
    └── prototipofigma/
        ├── Sobre mim.png
        ├── Projetos.png
        ├── Experiência.png
        ├── Contato.png
        └── Wakatime.png
```

O arquivo `main.jsx` inicializará a aplicação React, e `App.jsx` organizará os componentes e a seção selecionada. A pasta `components/` reunirá os elementos compartilhados da interface, enquanto `sections/` conterá os conteúdos de cada arquivo do portfólio.

## 🚀 Execução local

### Pré-requisitos

- Node.js em uma versão compatível com o Vite utilizado no projeto.
- npm.
- Navegador atualizado.

### Instalação e execução

Após a criação do front-end inicial, clone ou baixe o repositório e abra um terminal na pasta do projeto.

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço informado no terminal pelo Vite.

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente a versão gerada:

```bash
npm run preview
```

Os comandos acima correspondem à configuração prevista para React com Vite e serão confirmados após a criação do front-end inicial.

## 📦 Implantação

Hospedagem realizada pela Vercel.

**Endereço público: [Evelyn Costa - Portfólio](https://www.evelyncosta.dev/)**

## ✒️ Autora

**Evelyn Costa** — estudante de Engenharia de Software na PUC Minas.

[GitHub](https://github.com/Evycostzocn)

## 💡 Referências

- Modelo visual: **Diamond — VSCode Inspired Code Editor Design** 🔗 [Acessar o projeto no Figma](https://www.figma.com/community/file/1247868281929098053/diamond-vscode-inspired-code-editor-design), disponível na comunidade do Figma e adaptado neste projeto.
- A proposta de navegação pelo terminal foi inspirada no portfólio do professor João Paulo Aramuni [GitHub](https://github.com/joaopauloaramuni).

## 📄 Licença

A licença do código deste projeto ainda será definida. As condições de uso e atribuição dos materiais de terceiros serão verificadas e respeitadas.

## Integrações adicionadas — WakaTime e contato

### WakaTime público

A seção utiliza os três compartilhamentos públicos configurados em `src/services/wakatime.js`, via JSONP, sem API key, jQuery ou proxy. O helper cria callbacks únicos, aplica timeout de 15 segundos e remove scripts/callbacks ao concluir, falhar ou desmontar a seção. Resultados válidos ficam em memória por cinco minutos para evitar consultas repetidas ao navegar ou trocar o idioma.

O compartilhamento de tempo retorna `data[].range.date` e `data[].grand_total.total_seconds`. Os cards exibem a soma do período e a média pelos dias retornados, incluindo dias com zero. Linguagens e sistemas retornam `data[].name` e `data[].percent`, sem datas: a interface informa que o período desses dois gráficos não foi fornecido. Não há números fictícios de fallback.

### EmailJS

A seção de contato apresenta links para LinkedIn, GitHub e Instagram, identificados por ícones, e um formulário com campos de nome, e-mail e mensagem.

O envio utiliza o **EmailJS**, integrado ao React pelo SDK oficial `@emailjs/browser`, para encaminhar as mensagens ao meu e-mail profissional. O formulário valida os campos, informa o resultado do envio e mantém os dados preenchidos em caso de falha.

A integração foi configurada e testada com recebimento real das mensagens. Os textos e avisos estão disponíveis em português e inglês.

As configurações são definidas por variáveis de ambiente. Para o site publicado, elas também devem ser configuradas na plataforma de hospedagem.
### Página inicial e efeitos visuais

- `src/sections/Inicio.jsx` compõe a apresentação, os atalhos e o projeto em destaque.
- `src/App.jsx` inicia em `inicio` e mantém a navegação centralizada. Os atalhos da página inicial passam um destino para mover o foco ao conteúdo ou ao projeto; o terminal continua controlando seu próprio foco.
- Edite os textos `home*` e `inicio` em `src/data/translations.js`, mantendo as mesmas chaves em PT e EN.
- O catálogo compartilhado fica em `src/data/projects.js`. Altere `projetoDestaqueId` para `infinity-hub`, `desligaai` ou `big-bang`; título, descrição, tecnologias e mídia são reaproveitados na apresentação e na página de projetos.
- Em `src/App.css`, ajuste `--motion-duration` (320ms), `--motion-step` (65ms) e `--motion-distance` (8px) para mudar a entrada. O cursor usa `cursor-blink` por quatro ciclos. `prefers-reduced-motion` desativa animações e transições.
- A aba continua identificando a seção atual, sem fechar arquivos. `inicio.md` também está disponível como comando do terminal.

Verificação local: `npm run lint` e `npm run build`. Para conferir visualmente, execute `npm run dev` e teste os atalhos, PT/EN, teclado e telas pequenas. Não é necessário configurar serviços externos para abrir a página inicial.
