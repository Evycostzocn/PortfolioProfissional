import { useEffect, useRef, useState } from 'react'

// Este componente cuida apenas do vídeo e da preferência por movimento reduzido.
export default function VideoProjeto({ src, nome }) {
  const videoRef = useRef(null)
  // A preferência é lida antes da primeira renderização para evitar autoplay indevido.
  const [movimentoReduzido, setMovimentoReduzido] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const preferencia = window.matchMedia('(prefers-reduced-motion: reduce)')
    function atualizarPreferencia(event) {
      setMovimentoReduzido(event.matches)
      // Se a preferência mudar com o vídeo aberto, interrompemos a reprodução.
      if (event.matches) videoRef.current?.pause()
    }
    preferencia.addEventListener('change', atualizarPreferencia)
    return () => preferencia.removeEventListener('change', atualizarPreferencia)
  }, [])

  return (
    <video ref={videoRef} className="project-media" src={src}
      autoPlay={!movimentoReduzido} muted loop playsInline controls preload="metadata"
      aria-label={`Demonstração do projeto ${nome}`}>
      Seu navegador não suporta vídeo. <a href={src}>Abrir demonstração de {nome}</a>.
    </video>
  )
}
