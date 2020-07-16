const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120

const toChar = charCode => String.fromCharCode(charCode)

const getWidth = (state, key) => (state[key] || DEFAULT_WIDTH) + 'px'

const withWidthFrom = state => (content, index) => ({
  content,
  index,
  width: getWidth(state, content)
})

const createCell = (row, state) => (__, col) => `
  <div
    class="cell"
    data-col=${toChar(CODES.A + col)}
    data-id="${row}:${col}"
    data-type="cell"
    style="width: ${getWidth(state, toChar(CODES.A + col))};"
    contenteditable
  >
  </div>
`

const createColumn = ({ content, width }) => `
  <div class="column" data-type="resizable" style="width: ${width};">
    ${content}
    <div class="col-resize" data-resize="col"></div>
  </div>`

const createRow = (data, index = '') => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
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
      .map(createCell(i, state.colState))
      .join('')

    rows.push(createRow(cols, i))
  }

  return rows.join('')
}