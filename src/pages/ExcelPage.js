import Page from "@core/Page";
import { storage, debounce } from '@core/utils'
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '../core/createStore'
import { rootReducer } from '../redux/rootReducer'
import { initialState } from '../redux/initialState'

const storageName = param => `excel:${param}`

export default class ExcelPage extends Page {
  constructor(...args) {
    super(...args)
  }

  getRoot() {
    const store = createStore(rootReducer, storage(storageName(this.params)) || initialState)

    const stateListener = debounce(state => {
      state && storage(storageName(this.params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.init()
  }
}