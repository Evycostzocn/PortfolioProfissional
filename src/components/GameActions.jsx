// Os dois cards usam a mesma ação e abrem a única instância do modal no App.
export default function GameActions({ projeto, t, onJogar }) {
  return (
    <div className="game-actions">
    <div className="home-actions">
      <button type="button" className="action-button" onClick={() => onJogar(projeto)}>{t.gamePlay}</button>
      <a className="action-button secondary" href={projeto.repositorio} target="_blank" rel="noopener noreferrer" aria-label={`${t.gameGithub} (${t.opensNewTab})`}>{t.gameGithub} ↗</a>
    </div>
    <p className="muted game-requirement">{t.gameKeyboard}</p>
    </div>
  )
}
