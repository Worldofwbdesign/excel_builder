import $ from '@core/dom'
import ActiveRoute from './ActiveRoute'
import Loader from '../../components/loader/Loader'

export default class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Provide selector to router!')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.loader = new Loader()
    this.changePageHandler = this.changePageHandler.bind(this)
    this.activeRoute = new ActiveRoute
    
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    this.page && this.page.destroy()
    this.$placeholder.clear().append(this.loader)

    const PageClass = this.activeRoute.path.includes('excel') ? this.routes.excel : this.routes.dashboard
    this.page = new PageClass(this.activeRoute.param)
    const root = await this.page.getRoot()
    this.$placeholder.clear().append(root)

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}