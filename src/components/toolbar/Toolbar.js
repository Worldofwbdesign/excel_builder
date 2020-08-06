import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar } from './toolbar.template'
import $ from '@core/dom'

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
    this.className = 'excel__toolbar'
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const valueObj = JSON.parse($target.data.value)
      const [[key, value]] = Object.entries(valueObj)
      this.setState({ [key]: value })
      console.info(this.state)
    }
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
    this.initState(initialState)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }
}