import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.storageKeys = options.storageKeys || []
    this.unsubs = []

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() {
    this.initDomListeners()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubs.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storageChanged() {}

  isWatching(key) {
    return this.storageKeys.includes(key)
  }

  on(eventType, callback) {
    this.$root.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$root.$el.removeEventListener(eventType, callback)
  }

  destroy() {
    this.removeDomListeners()
    this.unsubs.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}