import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import $ from '@core/dom'
import { getResizeType, isCell, matrix } from './table.utils'
import { TableSelection } from './TableSelection'
import { TableResize } from './TableResize'

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    })
    this.className = 'excel__table'
  }

  prepare() {
    this.selection = new TableSelection()
    this.resize = new TableResize(this.$root)
  }

  init() {
    super.init()
    
    const $firstCell = this.$root.findOne('[data-id="1:0"]')
    $firstCell && this.selection.select($firstCell)

    this.emitter.subscribe('formula:input', text => this.selection.current.text(text))
  }

  onMousedown(event) {
    const resizeType = getResizeType(event)
    if (resizeType) {
      this.resize.onMousedown(event, resizeType)
    } else if (isCell) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const ids = matrix($target, this.selection.current)

        const $cells = ids.map(id => $(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($(event.target))
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    const { key } = event
    
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const nextSelector = getNextSelector(key, id)
      console.info('nextSelector', nextSelector)
      const $next = this.$root.findOne(nextSelector)
      this.selection.select($next)
    }
  }

  toHTML() {
    return createTable()
  }
}

function getNextSelector(key, { row, col }) {
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