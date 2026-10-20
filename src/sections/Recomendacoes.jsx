import fotoJessica from '../assets/images/jessicarec.jpeg'
import fotoAlexia from '../assets/images/alexia.png'

// Para acrescentar recomendações, adicione um item e sua chave de texto nos dois idiomas.
const recomendacoes = [
  {
    id: 'alexia',
    nome: 'Alexia Andrade',
    foto: fotoAlexia,
    texto: 'alexiaRecommendation',
    linkedin: 'https://www.linkedin.com/in/aalexiaandrade/',
  },
  {
    id: 'jessica',
    nome: 'Jéssica Soares Muniz',
    foto: fotoJessica,
    texto: 'jessicaRecommendation',
    linkedin: 'https://www.linkedin.com/in/jessicasoaresmuniz/',
  },
]

export default function Recomendacoes({ t }) {
  return (
    <div className="recommendations-list">
      {recomendacoes.map((recomendacao) => (
        <article className="card recommendation-card" key={recomendacao.id}>
          <div className="recommendation-person social-icons">
            <img className="recommendation-photo" src={recomendacao.foto} alt={recomendacao.nome} />
            <a
              href={recomendacao.linkedin}
              aria-label={`${t.recommendationLinkedIn} ${recomendacao.nome} (${t.opensNewTab})`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.99 0 3.58 1.97 3.58 4.53v5.24Z" />
              </svg>
            </a>
          </div>
          <div className="recommendation-content">
            <blockquote lang={t.locale}>
              {t[recomendacao.texto].split('\n\n').map((paragrafo) => <p key={paragrafo}>{paragrafo}</p>)}
            </blockquote>
            {t.recommendationTranslation && (
              <p className="muted recommendation-translation">{t.recommendationTranslation}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
