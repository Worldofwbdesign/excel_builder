import { TABLE_RESIZE } from './types'

export function rootReducer (state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      const { data: { id, value } } = action
      return { ...state, colState: { ...(state.colState || {}), [id]: value } }
    default:
      return state
  }
}