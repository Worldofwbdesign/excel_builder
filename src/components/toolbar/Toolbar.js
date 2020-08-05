import { ExcelComponent } from '@core/ExcelComponent'
import { createToolbar } from './toolbar.template'
import $ from '@core/dom'

export class Toolbar extends ExcelComponent {
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
      console.info($target)
    }
  }

  toHTML() {
    return createToolbar()
  }
}