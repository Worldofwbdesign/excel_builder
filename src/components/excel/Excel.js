import $ from '@core/dom'
import { Emitter } from '@core/Emitter'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $component = $.create('div', `excel__${Component.name.toLowerCase()}`)
      const component = new Component($component, componentOptions)
      $component.html(component.toHTML($component))
      $root.append($component)

      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(c => c.init())
  }

  destroy() {
    this.components.forEach(c => c.destroy())
  }
}