import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import $ from '@core/dom'
import { getResizeType, isCell, matrix } from './table.utils'
import { TableSelection } from './TableSelection'
import { TableResize } from './TableResize'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
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

  toHTML() {
    return createTable()
  }
}