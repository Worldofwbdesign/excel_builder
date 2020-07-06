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