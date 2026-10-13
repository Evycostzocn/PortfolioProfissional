import { useEffect, useState } from 'react'
import { carregarWaka, fontesWaka } from '../services/wakatime.js'

function PainelWaka({ fonte, t }) {
  const [estado, setEstado] = useState({ status: 'carregando' })
  const [tentativa, setTentativa] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    // O pequeno adiamento evita a consulta duplicada do StrictMode no desenvolvimento.
    const inicio = setTimeout(() => {
      carregarWaka(fonte, controller.signal).then(
        (dados) => { if (!controller.signal.aborted) setEstado({ status: 'pronto', dados }) },
        () => { if (!controller.signal.aborted) setEstado({ status: 'erro' }) },
      )
    }, 0)
    return () => { clearTimeout(inicio); controller.abort() }
  }, [fonte, tentativa])

  function tentarNovamente() {
    setEstado({ status: 'carregando' })
    setTentativa((valor) => valor + 1)
  }
  const { dados } = estado
  const numero = new Intl.NumberFormat(t.locale, { maximumFractionDigits: 2 })
  function duracao(segundos) {
    const horas = Math.floor(segundos / 3600)
    const minutos = Math.floor((segundos % 3600) / 60)
    const unidade = (valor, unit) => new Intl.NumberFormat(t.locale, { style: 'unit', unit, unitDisplay: 'short' }).format(valor)
    return `${unidade(horas, 'hour')} ${unidade(minutos, 'minute')}`
  }
  function data(valor) {
    // A data já representa o dia local do serviço; UTC evita deslocá-la para a véspera.
    return new Intl.DateTimeFormat(t.locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${valor}T00:00:00Z`))
  }
  return (
    <article className="card waka-panel" aria-busy={estado.status === 'carregando'}>
      <h2>{t[fonte.titulo]}</h2>
      {estado.status === 'carregando' && <p role="status">{t.wakaLoading}</p>}
      {estado.status === 'erro' && <><p role="alert">{t.wakaError}</p><button className="action-button" onClick={tentarNovamente}>{t.retry}</button></>}
      {dados?.vazio && <p>{t.wakaEmpty}</p>}
      {dados && !dados.vazio && (fonte.id === 'tempo' ? (
        <>
          <p>{dados.trintaDias ? t.wakaLast30 : t.period}: {data(dados.inicio)} — {data(dados.fim)}</p>
          {!dados.trintaDias && <p className="muted">{t.wakaPeriodMismatch}</p>}
          <div className="time-cards">
            <div><span>{t.wakaTotal}</span><strong>{duracao(dados.total)}</strong></div>
            <div><span>{t.wakaAverage}</span><strong>{duracao(dados.total / dados.dias)}</strong></div>
          </div>
        </>
      ) : (
        <>
          <p>{t.wakaRequested30}</p>
          <p className="muted">{t.wakaNoPeriod}</p>
          <ul className="waka-bars">
            {dados.itens.map((item) => (
              <li key={item.name}>
                <div><span>{item.name}</span><span>{numero.format(item.percent)}%</span></div>
                <div className="bar-track" aria-hidden="true"><span style={{ width: `${item.percent}%` }} /></div>
              </li>
            ))}
          </ul>
        </>
      ))}
    </article>
  )
}

export default function WakaTime({ t }) {
  return <div className="waka-panels"><p>{t.wakaIntro}</p>{fontesWaka.map((fonte) => <PainelWaka key={fonte.id} fonte={fonte} t={t} />)}</div>
}
