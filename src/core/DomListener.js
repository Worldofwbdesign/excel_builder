import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach(eventType => {
      const method = getMethodName(eventType)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented for ${this.name || ''} Component`)
      }
      this[method] = this[method].bind(this)
      this.on(eventType, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach(eventType => {
      const method = getMethodName(eventType)
      this.off(eventType, this[method])
    })
  }
}

function getMethodName (eventName) {
  return 'on' + capitalize(eventName)
} 