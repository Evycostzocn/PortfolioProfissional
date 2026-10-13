import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const configurado = Boolean(serviceId?.trim() && templateId?.trim() && publicKey?.trim())

// SVGs locais: nenhuma biblioteca de ícones é necessária.
const redes = [
  { nome: 'LinkedIn', url: 'https://www.linkedin.com/in/evelyn-costa-889923344/', path: 'M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.75 1.36-1.55 2.79-1.55 2.98 0 3.58 1.96 3.58 4.51v5.29Z' },
  { nome: 'GitHub', url: 'https://github.com/Evycostzocn', path: 'M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.93.1-.72.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.09-1.15 3.09-1.15.62 1.55.23 2.7.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.33-2.63 5.29-5.14 5.57.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z' },
  { nome: 'Instagram', url: 'https://www.instagram.com/evycostz/' },
]

export default function Contato({ t }) {
  const [estado, setEstado] = useState('')
  const enviandoRef = useRef(false)

  async function enviar(event) {
    event.preventDefault()
    if (!configurado || enviandoRef.current) return
    const form = event.currentTarget
    const dados = new FormData(form)
    const nome = dados.get('nome').trim()
    const email = dados.get('email').trim()
    const mensagem = dados.get('mensagem').trim()
    if (!nome || !mensagem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEstado('formInvalid')
      return
    }
    // A ref bloqueia cliques repetidos antes mesmo da próxima renderização.
    enviandoRef.current = true
    setEstado('formSending')
    try {
      const resposta = await emailjs.send(serviceId, templateId,
        { from_name: nome, reply_to: email, message: mensagem }, { publicKey })
      if (resposta.status < 200 || resposta.status >= 300) throw resposta
      setEstado('formSuccess')
      form.reset() // Só limpamos os campos após a confirmação do serviço.
    } catch (erro) {
      if (import.meta.env.DEV) {
        let texto = typeof erro === 'string' ? erro : erro?.text || erro?.message || 'Erro sem detalhes'
        // A resposta pode repetir dados enviados; não registramos o objeto de erro nem o payload.
        for (const valor of [nome, email, mensagem, serviceId, templateId, publicKey].filter(Boolean).sort((a, b) => b.length - a.length)) {
          texto = texto.split(valor).join('[omitido]')
        }
        texto = texto.replace(/[^\s<>"']+@[^\s<>"']+/g, '[email omitido]')
        console.error('[EmailJS] Falha no envio', {
          status: typeof erro?.status === 'number' ? erro.status : null,
          text: texto,
        })
      }
      setEstado('formError')
    } finally {
      enviandoRef.current = false
    }
  }

  return (
    <>
      <nav className="contact-links social-icons" aria-label={t.contactLinks}>
        {redes.map((rede) => (
          <a key={rede.nome} href={rede.url} target="_blank" rel="noopener noreferrer" aria-label={rede.nome} title={rede.nome}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {rede.path ? <path d={rede.path} fill="currentColor" /> : <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" /></g>}
            </svg>
          </a>
        ))}
      </nav>
      <form className="contact-form" onSubmit={enviar} aria-describedby="aviso-formulario" aria-busy={estado === 'formSending'}>
        <p id="aviso-formulario">{configurado ? t.formReady : t.formUnavailable}</p>
        <label htmlFor="nome">{t.name}</label>
        <input id="nome" name="nome" required maxLength={100} autoComplete="name" placeholder={t.namePlaceholder} disabled={estado === 'formSending'} />
        <label htmlFor="email">{t.email}</label>
        <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder={t.emailPlaceholder} disabled={estado === 'formSending'} />
        <label htmlFor="mensagem">{t.message}</label>
        <textarea id="mensagem" name="mensagem" required maxLength={5000} rows={5} placeholder={t.messagePlaceholder} disabled={estado === 'formSending'} />
        <button type="submit" disabled={!configurado || estado === 'formSending'}>{estado === 'formSending' ? t.formSending : t.formSend}</button>
        {estado && <p role={estado === 'formError' || estado === 'formInvalid' ? 'alert' : 'status'}>{t[estado]}</p>}
      </form>
      <a className="mail-link" href="mailto:profissionalevelyncosta@gmail.com">{t.openEmail}</a>
    </>
  )
}
