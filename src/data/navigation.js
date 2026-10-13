// Os arquivos são os mesmos em português e inglês e também são comandos do terminal.
export const secoes = [
  { id: 'sobre', arquivo: 'sobre.md' },
  { id: 'projetos', arquivo: 'projetos.json' },
  { id: 'experiencias', arquivo: 'experiencias.md' },
  { id: 'contato', arquivo: 'contato.html' },
  { id: 'wakatime', arquivo: 'wakatime.md' },
  { id: 'recomendacoes', arquivo: 'recomendacoes.md' },
]

// Interpretamos apenas a lista permitida. Nenhum comando do sistema é executado.
export function interpretarComando(entrada) {
  const comando = entrada.trim().toLowerCase()
  if (!comando) return { tipo: 'vazio' }
  if (comando === 'ajuda' || comando === 'help') return { tipo: 'ajuda' }
  if (comando === 'limpar' || comando === 'clear') return { tipo: 'limpar' }
  const secao = secoes.find((item) => item.arquivo === comando)
  if (secao) return { tipo: 'abrir', secao: secao.id, arquivo: secao.arquivo }
  return { tipo: 'desconhecido' }
}
