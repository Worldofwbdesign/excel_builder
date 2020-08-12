// import { Excel } from '@/components/excel/Excel'
// import { Header } from '@/components/header/Header'
// import { Toolbar } from '@/components/toolbar/Toolbar'
// import { Formula } from '@/components/formula/Formula'
// import { Table } from '@/components/table/Table'
import Router from '@core/routes/Router'

import './scss/index.scss';

new Router('#app', {

})
// import { createStore } from './core/createStore'
// import { rootReducer } from './redux/rootReducer'
// import { initialState } from './redux/initialState'
// import { storage, debounce } from '@core/utils'

// const store = createStore(rootReducer, storage('excelState') || initialState)

// const stateListener = debounce(state => {
//   state && storage('excelState', state)
// }, 300)

// store.subscribe(stateListener)

// const excel = new Excel('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store
// })

// excel.render()