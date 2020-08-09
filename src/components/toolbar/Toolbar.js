import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar } from './toolbar.template'
import $ from '@core/dom'
import { defaultStyles } from '@/constants'

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      storageKeys: ['currentStyles'],
      ...options
    })
    this.className = 'excel__toolbar'
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const valueObj = JSON.parse($target.data.value)
      this.$emit('toolbar:changeStyle', valueObj)

      const [[key, value]] = Object.entries(valueObj)
      this.setState({ [key]: value })
    }
  }

  prepare() {
    this.initState(defaultStyles)
  }

  storageChanged(changes) {
    this.setState(changes.currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }
}