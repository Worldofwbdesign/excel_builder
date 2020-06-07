import $ from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $component = $.create('div', `excel__${Component.name.toLowerCase()}`)
      const component = new Component($component)
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
}