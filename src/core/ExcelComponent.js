import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
  }

  on(eventType, callback) {
    this.$root.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$root.$el.removeEventListener(eventType, callback)
  }
}