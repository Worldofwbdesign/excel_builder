export const getResizeType = event => event.target.dataset.resize

export const isCell = event => event.target.dataset.type === 'col'

export const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end]
  }

  return new Array(end - start + 1).fill('').map((__, index) => start + index)
}

export const matrix = ($current, $target) => {
  const target = $target.id(true)
  const current = $current.id(true)

  const rows = range(target.row, current.row)
  const cols = range(target.col, current.col)
  
  return rows.reduce((acc, row) => acc.concat(cols.map(col => `${row}:${col}`)), [])
}

export function getNextSelector(key, { row, col }) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'ArrowRight':
    case 'Tab':
      col++
      break
    case 'ArrowUp':
      row = row - 1 < 1 ? 1 : row - 1
      break
    case 'ArrowLeft':
      col = col - 1 < 0 ? 0 : col - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}