import $ from '@core/dom'
import { Emitter } from '@core/Emitter'
import { StoreSubscriber } from '@core/StoreSubscriber'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      store: this.store,
      emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $component = $.create('div', `excel__${Component.name.toLowerCase()}`)
      const component = new Component($component, componentOptions)
      $component.html(component.toHTML($component, this.store.getState()))
      $root.append($component)

      return component
    })

    return $root
  }

  init() {
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(c => c.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(c => c.destroy())
  }
}