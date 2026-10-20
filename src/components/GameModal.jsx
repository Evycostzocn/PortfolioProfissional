import { useEffect, useRef, useState } from 'react'

export default function GameModal({ projeto, t, onClose }) {
  const dialogRef = useRef(null)
  const frameRef = useRef(null)
  const [tentativa, setTentativa] = useState(0)
  const [estado, setEstado] = useState('loading')
  const [etapa, setEtapa] = useState('runtime')
  const [detalhe, setDetalhe] = useState('')
  const [disponivel, setDisponivel] = useState(false)
  const url = `${import.meta.env.BASE_URL}${projeto.jogo}`

  useEffect(() => {
    const anterior = document.activeElement
    const overflow = document.body.style.overflow
    const dialog = dialogRef.current
    dialog.showModal() // Modal nativo isola o foco e torna o restante da página inerte.
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      anterior?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let timeout = window.setTimeout(() => setEstado('error'), 90000)
    const receber = (event) => {
      // Somente o iframe desta sessão e da mesma origem pode informar o estado.
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow || event.data?.type !== 'big-bang') return
      const status = event.data.status
      if (status === 'close') onClose()
      if (['package', 'assets', 'starting'].includes(status)) {
        setEtapa(status)
        // O prazo mede falta de progresso, não o tempo total de um download lento.
        window.clearTimeout(timeout)
        timeout = window.setTimeout(() => setEstado('error'), 90000)
      }
      if (status === 'error' || status === 'resource-warning') setDetalhe(String(event.data.detail || '').slice(0, 300))
      if (['ready', 'error', 'exited'].includes(status)) {
        window.clearTimeout(timeout)
        setEstado(status)
      }
    }
    window.addEventListener('message', receber)
    // Evita tratar o fallback HTML do React (ou um 404) como um jogo carregado.
    fetch(url, { signal: controller.signal }).then(async (response) => {
      if (!response.ok || !(await response.text()).includes('portfolio-bridge.js')) throw new Error('Missing game build')
      if (!controller.signal.aborted) setDisponivel(true)
    }).catch(() => {
      if (!controller.signal.aborted) setEstado('error')
    })
    return () => {
      controller.abort()
      window.clearTimeout(timeout)
      window.removeEventListener('message', receber)
    }
  }, [url, tentativa, onClose])

  function reiniciar() {
    setDisponivel(false)
    setEstado('loading')
    setEtapa('runtime')
    setDetalhe('')
    setTentativa((valor) => valor + 1)
  }

  return (
    <dialog ref={dialogRef} className="game-dialog" aria-labelledby="game-title" aria-describedby="game-controls" onCancel={onClose}>
      <div className="game-header">
        <h2 id="game-title">{projeto.nome}</h2>
        <button type="button" className="action-button secondary" onClick={onClose} autoFocus>{t.gameClose}</button>
      </div>
      <p id="game-controls">{t.gameControls}</p>
      <p className="muted">{t.gameKeyboard}</p>
      <p className="muted">{t.gameLanguage}</p>
      <div role="status" aria-live="polite">
        {estado === 'loading' && <><p>{t.gameLoading}</p><p>{t[`gameStage_${etapa}`]}</p></>}
        {estado === 'ready' && <p>{t.gameReady}</p>}
        {estado === 'error' && <><p>{t.gameError}</p>{detalhe && <p className="muted">{detalhe}</p>}</>}
        {estado === 'exited' && <p>{t.gameExited}</p>}
      </div>
      {['error', 'exited'].includes(estado) ? (
        <button className="action-button" type="button" onClick={reiniciar}>{t.retry}</button>
      ) : (
        <div className="game-viewport" aria-busy={estado === 'loading'}>
          {/* Remover o iframe ao fechar encerra Python/WASM, áudio e eventos desta sessão. */}
          {disponivel && <iframe key={tentativa} ref={frameRef} src={url} title={`${projeto.nome} — ${t.gamePlay}`} allow="autoplay; fullscreen" onError={() => setEstado('error')} />}
        </div>
      )}
    </dialog>
  )
}
