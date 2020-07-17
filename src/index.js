import { Excel } from '@/components/excel/Excel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'

import './scss/index.scss';
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { initialState } from './redux/initialState'
import { storage } from '@core/utils'

const store = createStore(rootReducer, storage('excelState') || initialState)

store.subscribe(state => state && storage('excelState', state))

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()