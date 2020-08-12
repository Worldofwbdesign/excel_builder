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

  changePageHandler(event) {
    console.info('path', this.activeRoute.path)
    console.info('param', this.activeRoute.param)
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}