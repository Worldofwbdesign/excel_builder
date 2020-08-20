import Page from "@core/page/Page";
import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import LocalStorageClient from '@/shared/LocalStorageClient'
import StateProcessor from '@core/page/StateProcessor'
import { createStore } from '../core/createStore'
import { rootReducer } from '../redux/rootReducer'
import { initialState } from '../redux/initialState'


export default class ExcelPage extends Page {
  constructor(...args) {
    super(...args)

    this.storeSub = null
    this.processor = new StateProcessor(
      new LocalStorageClient(this.params)
    )
  }

  async getRoot() {
    const state = await this.processor.get()
    const store = createStore(rootReducer, state || initialState)

    // const stateListener = debounce(state => {
    //   state && storage(storageName(params), state)
    // }, 300)

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}