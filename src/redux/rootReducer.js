import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLES, CHANGE_TITLE, UPDATE_DATE } from './types'
import { mergeDeep } from '@core/utils'

export function rootReducer (state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const { data: { id, value, type } } = action
      const key = `${type}State`
      return { ...state, [key]: { ...(state[key] || {}), [id]: value } }
    }
    case CHANGE_TEXT: {
      const { data: { value, id } } = action
      return { ...state, currentText: value, dataState: { ...state.dataState, [id]: value } }
    }
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data }
    case APPLY_STYLES:
      const newTableStyles = action.data.ids.reduce((acc, id) => Object.assign(acc, { [id]: action.data.value }), {})
      return { ...state, tableStyles: mergeDeep(state.tableStyles, newTableStyles) }
    case CHANGE_TITLE:
      return { ...state, title: action.data }
    case UPDATE_DATE:
      return { ...state, openedDate: new Date().toJSON() }
    default:
      return state
  }
}