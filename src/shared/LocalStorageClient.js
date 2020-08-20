import { storage } from '@core/utils'

const storageName = param => `excel:${param}`

export default class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return new Promise(resolve => resolve(storage(this.name)))
  }
}