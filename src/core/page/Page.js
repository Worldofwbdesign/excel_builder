export default class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('Method "getRoot" shoule be implemented!')
  }

  afterRender() {
    this.init()
  }

  destroy() {
    this.destroy()
  }

}