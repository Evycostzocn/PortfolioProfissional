import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const events = new Map()
const messages = []
const window = {
  location: { origin: 'http://localhost:5173' },
  parent: { postMessage: (message) => messages.push(message) },
  addEventListener: (type, callback) => events.set(type, callback),
}
vm.runInNewContext(readFileSync(new URL('./portfolio-bridge.js', import.meta.url), 'utf8'), { window })
const error = events.get('error')
error({ target: { tagName: 'SCRIPT', src: 'https://example.com/optional.js' } })
assert.equal(messages.at(-1).status, 'resource-warning')
error({ target: { tagName: 'SCRIPT', id: 'site', src: 'https://example.com/pythons.js' } })
assert.equal(messages.at(-1).status, 'error')
assert.match(messages.at(-1).detail, /pythons.js/)
error({ target: window, message: 'Runtime failed' })
assert.equal(messages.at(-1).status, 'error')
events.get('unhandledrejection')({ reason: { name: 'NotAllowedError' } })
assert.equal(messages.at(-1).status, 'resource-warning')
window.bigBangStatus('ready')
assert.equal(messages.at(-1).status, 'ready')
console.log('OK: recursos opcionais e autoplay não encerram o jogo; erros fatais continuam sinalizados.')
