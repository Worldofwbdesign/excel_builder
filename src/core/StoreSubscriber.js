import { isEqual } from './utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
  }

  subscribeComponents(components) {
    let prevState = this.store.getState()

    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              component.storageChanged(state)
            }
          })
        }
      })
      prevState = this.store.getState()
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}