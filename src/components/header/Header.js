import { ExcelComponent } from '@core/ExcelComponent'
import { createHeader } from './header.template'
import * as actions from '@/redux/actions'
import $ from '@core/dom'
import ActiveRoute from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
    this.activeRoute = new ActiveRoute()
    this.className = 'excel__header'
  }

  init() {
    super.init()
  }

  onInput(e) {
    this.$dispatch(actions.changeTitle(e.target.value))
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.button === 'delete') {
      const confirmed = confirm('Are you sure you want to delete this table?')

      if (confirmed) {
        localStorage.removeItem('excel:' + this.activeRoute.param)
        this.activeRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      this.activeRoute.navigate('')
    }
  }

  toHTML($root, state) {
    console.info('state', state)
    return createHeader($root, state)
  }
}