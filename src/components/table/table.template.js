const CODES = {
  A: 65,
  Z: 90
}

const createCell = (content, index) => `<div class="cell" data-col=${toChar(CODES.A + index)} contenteditable>${content}</div>`

const createColumn = content => `
  <div class="column" data-type="resizable">
    ${content}
    <div class="col-resize" data-resize="col"></div>
  </div>`

const createRow = (data, index = '') => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" resizable>
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${data}</div>
    </div>
  `
}

const toChar = charCode => String.fromCharCode(charCode)

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const headerCols = Array(colsCount)
    .fill('')
    .map((_, index) => toChar(CODES.A + index))
    .map(createColumn)
    .join('')

  rows.push(createRow(headerCols))

  for (let i = 1; i <= rowsCount; i++) {
    const cols = Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

    rows.push(createRow(cols, i))
  }

  return rows.join('')
}