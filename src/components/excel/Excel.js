import $ from '@core/dom'
import { Emitter } from '@core/Emitter'
import { StoreSubscriber } from '@core/StoreSubscriber'
import { updateDate } from '@/redux/actions';
import { preventDefault } from '@core/utils'

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
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(c => c.init())
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('contextmenu', preventDefault)
    }
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(c => c.destroy())
    if (process.env.NODE_ENV === 'development') {
      window.removeEventListener('contextmenu', preventDefault)
    }
  }
}