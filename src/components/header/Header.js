import { ExcelComponent } from '@core/ExcelComponent'
import { createHeader } from './header.template'
import * as actions from '@/redux/actions'
import $ from '@core/dom'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
    this.className = 'excel__header'
  }

  init() {
    super.init()
  }

  onInput(e) {
    this.$dispatch(actions.changeTitle(e.target.value))
  }

  toHTML($root, state) {
    console.info('state', state)
    return createHeader($root, state)
  }
}