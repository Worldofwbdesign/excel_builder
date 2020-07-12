import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import $ from '@core/dom'
import { getResizeType, isCell, matrix, getNextSelector } from './table.utils'
import { TableSelection } from './TableSelection'
import { TableResize } from './TableResize'

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
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
    this.selectCell($firstCell)

    this.$on('formula:input', text => this.selection.current.text(text))
    this.$on('formula:done', () => this.selection.current.focus())
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
        this.$emit('table:select', $cells[0])
      } else {
        this.selection.select($target)
        this.$emit('table:select', $target)
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
      this.selectCell(this.$root.findOne(nextSelector))
    }
  }

  onInput() {
    this.$emit('table:input', this.selection.current)
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  toHTML() {
    return createTable()
  }
}