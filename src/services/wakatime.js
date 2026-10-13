const base = 'https://wakatime.com/share/@958fb7d8-4f60-43c5-bcdd-fe12e5f3998e/'
export const fontesWaka = [
  { id: 'tempo', titulo: 'wakaTime', url: `${base}65e0c4e9-80f7-4fd1-9de8-a7d5c9db75dc.json` },
  { id: 'linguagens', titulo: 'wakaLanguages', url: `${base}bf72ed0c-764c-4f47-a743-bda803297179.json` },
  { id: 'editores', titulo: 'wakaEditors', url: `${base}4225ad08-6e0d-4f56-96c4-1a56abe9c6f4.json` },
  { id: 'sistemas', titulo: 'wakaSystems', url: `${base}ad609f97-9ef8-48a2-9ae8-586111ebe045.json` },
]
const cache = new Map()
let contador = 0

// JSONP executa somente o script do endereço público do WakaTime, com callback próprio.
export function carregarJSONP(url, signal, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const nome = `portfolioWaka_${Date.now()}_${++contador}`
    const script = document.createElement('script')
    let timer
    let terminou = false
    function concluir(erro, dados) {
      if (terminou) return
      terminou = true
      clearTimeout(timer)
      script.remove()
      delete window[nome]
      signal?.removeEventListener('abort', cancelar)
      if (erro) reject(erro)
      else resolve(dados)
    }
    function cancelar() { concluir(new DOMException('Cancelado', 'AbortError')) }
    if (signal?.aborted) return cancelar()
    window[nome] = (dados, status) => {
      if (status !== undefined && status !== 200) concluir(new Error('WakaTime'))
      else concluir(null, dados)
    }
    script.onerror = () => concluir(new Error('Rede'))
    const endereco = new URL(url)
    endereco.searchParams.set('callback', nome)
    script.src = endereco.href
    script.async = true
    signal?.addEventListener('abort', cancelar, { once: true })
    timer = setTimeout(() => concluir(new Error('Timeout')), timeout)
    document.head.appendChild(script)
  })
}

// Campos conferidos nas respostas reais. Formato inesperado é erro, não dado vazio.
export function prepararDados(resposta, tipo) {
  if (!Array.isArray(resposta?.data)) throw new Error('Formato inválido')
  const dados = resposta.data
  if (tipo === 'tempo') {
    if (!dados.every((dia) => /^\d{4}-\d{2}-\d{2}$/.test(dia.range?.date) && Number.isFinite(dia.grand_total?.total_seconds) && dia.grand_total.total_seconds >= 0)) throw new Error('Formato inválido')
    const datas = dados.map((dia) => dia.range.date).sort()
    // Conferimos os dias recebidos; não renomeamos outro intervalo como 30 dias.
    const trintaDias = new Set(datas).size === 30 && (Date.parse(datas.at(-1)) - Date.parse(datas[0])) / 86400000 === 29
    return { trintaDias, vazio: !dados.length, inicio: datas[0], fim: datas.at(-1), total: dados.reduce((soma, dia) => soma + dia.grand_total.total_seconds, 0), dias: dados.length }
  }
  if (!dados.every((item) => typeof item.name === 'string' && Number.isFinite(item.percent) && item.percent >= 0 && item.percent <= 100)) throw new Error('Formato inválido')
  return { vazio: !dados.length, itens: dados }
}

export async function carregarWaka(fonte, signal) {
  const salvo = cache.get(fonte.id)
  // O cache evita novas consultas ao trocar idioma ou voltar à seção por cinco minutos.
  if (salvo && Date.now() - salvo.instante < 300000) return salvo.dados
  const resposta = await carregarJSONP(fonte.url, signal)
  const dados = prepararDados(resposta, fonte.id)
  cache.set(fonte.id, { instante: Date.now(), dados })
  return dados
}
