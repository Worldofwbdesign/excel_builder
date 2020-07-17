import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import $ from '@core/dom'
import { getResizeType, isCell, matrix, getNextSelector } from './table.utils'
import { TableSelection } from './TableSelection'
import { TableResize } from './TableResize'
import * as actions from '@/redux/actions'

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
    this.resize = new TableResize(this.$root, { $dispatch: this.$dispatch.bind(this) })
  }

  init() {
    super.init()
    
    const $firstCell = this.$root.findOne('[data-id="1:0"]')
    $firstCell && this.selection.select($firstCell)
    this.selectCell($firstCell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.saveTextToStorage(text)
    })
    this.$on('formula:done', () => this.selection.current.focus())
  }

  resizeTable(event, resizeType) {
    this.resize.onMousedown(event, resizeType)
  }

  onMousedown(event) {
    const resizeType = getResizeType(event)
    if (resizeType) {
      this.resizeTable(event, resizeType)
    } else if (isCell) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const ids = matrix($target, this.selection.current)

        const $cells = ids.map(id => $(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
        this.$emit('table:select', $cells[0])
      } else {
        this.selectCell($target)
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

  saveTextToStorage(value) {
    this.$dispatch(actions.changeText({
      value,
      id: this.selection.current.id()
    }))
  }

  onInput(event) {
    this.saveTextToStorage($(event.target).text())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  toHTML($root, state) {
    return createTable($root, state)
  }
}