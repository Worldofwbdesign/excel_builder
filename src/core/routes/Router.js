import $ from '@core/dom'
import ActiveRoute from './ActiveRoute'

export default class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Provide selector to router!')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.activeRoute = new ActiveRoute
    
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    this.page && this.page.destroy()
    this.$placeholder.clear('')

    const PageClass = this.activeRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    this.page = new PageClass(this.activeRoute.param)
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}