import $ from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components.forEach(Component => {
      const component = new Component()
      const $component = $.create('div', component.className)
      $component.insertAdjacentHTML('beforeend', component.toHTML())

      $root.append($component)
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
  }
}