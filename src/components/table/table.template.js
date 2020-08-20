import { camelToDashCase, parseFormula } from '@core/utils'
import { defaultStyles } from '../../constants'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 32

const toChar = charCode => String.fromCharCode(charCode)

const getWidth = (state, key) => (state[key] || DEFAULT_WIDTH) + 'px'

const getHeight = (state, key) => (state[key] || DEFAULT_HEIGHT) + 'px'

const withWidthFrom = state => (content, index) => ({
  content,
  index,
  width: getWidth(state, content)
})

const createCell = (row, state) => (__, col) => {
  const id = `${row}:${col}`
  const style = Object.entries({...defaultStyles, ...(state.tableStyles[id] || {})})
    .map(([key, value]) => `${camelToDashCase(key)}: ${value}`)
    .join(';')
  const width = getWidth(state.colState, toChar(CODES.A + col))
  console.info('width', width)

  return `
    <div
      class="cell"
      data-col=${toChar(CODES.A + col)}
      data-id="${id}"
      data-type="cell"
      data-formula="${state.dataState[id] || ''}"
      style="${style}; width: ${width}; };"
      contenteditable
    >
      ${parseFormula(state.dataState[id]) || ''}
    </div>
  `
}

const createColumn = ({ content, width }) => {
  return `
    <div class="column" data-type="resizable" style="width: ${width};">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

const createRow = (data, index = '', state = {}) => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${getHeight(state, index)}">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${data}</div>
    </div>
  `
}

export const createTable = ($root, state, rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const headerCols = Array(colsCount)
    .fill('')
    .map((_, index) => toChar(CODES.A + index))
    .map(withWidthFrom(state.colState))
    .map(createColumn)
    .join('')

  rows.push(createRow(headerCols))

  for (let i = 1; i <= rowsCount; i++) {
    const cols = Array(colsCount)
      .fill('')
      .map(createCell(i, state))
      .join('')

    rows.push(createRow(cols, i, state.rowState))
  }

  return rows.join('')
}