/* Executado dentro do iframe, antes do runtime Python. */
window.bigBangStatus = (status, detail = '') => {
  window.parent.postMessage({ type: 'big-bang', status, detail: String(detail).slice(0, 300) }, window.location.origin)
}
window.addEventListener('error', (event) => {
  const resource = event.target
  if (resource && resource !== window) {
    const url = resource.src || resource.href || resource.tagName
    // Falhas opcionais não devem desmontar o iframe e abortar os downloads válidos.
    // O prazo sem progresso continua detectando dependências realmente bloqueadas.
    const critical = resource.id === 'site'
    window.bigBangStatus(critical ? 'error' : 'resource-warning', `Failed to load: ${url}`)
    return
  }
  window.bigBangStatus('error', event.message || 'JavaScript initialization failed')
}, true)
window.addEventListener('unhandledrejection', (event) => {
  // Bloqueio de autoplay não impede jogar; o áudio pode ser liberado por um clique.
  const status = event.reason?.name === 'NotAllowedError' ? 'resource-warning' : 'error'
  window.bigBangStatus(status, event.reason)
})
window.addEventListener('keydown', (event) => {
  // F10 fecha mesmo com foco no canvas. Escape continua disponível na tela de resultado.
  if (event.key === 'F10') {
    event.preventDefault()
    window.bigBangStatus('close')
  }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) event.preventDefault()
})
