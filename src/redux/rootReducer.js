import { TABLE_RESIZE, CHANGE_TEXT } from './types'

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
    default:
      return state
  }
}