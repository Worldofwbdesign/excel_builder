import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import $ from '@core/dom'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup']
    })
    this.className = 'excel__table'
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    
    const $firstCell = this.$root.findOne('[data-id="1:0"]')
    $firstCell && this.selection.select($firstCell)
  }

  addResizeMarker(isCol, styles = {}) {
    const $resizerMarker = $.create('div', ['resize-marker', isCol ? '-col' : '-row'])
    $resizerMarker.css(styles)
    this.$root.append($resizerMarker)
    this.$resizeMarker = $resizerMarker
  }

  startResizeCol(event) {
    this.addResizeMarker(true)
    this.resizeTargetX = event.pageX
  }

  finishResizeCol() {
    const coords = this.$resizeTarget.getCoords()
    const delta = this.resizeTargetX - this.mousePageX
    const newWidth = coords.width - delta + 'px'
    
    const cells = this.$root.findAll(`[data-col="${this.$resizeTarget.innerText()}"]`)
    const allCells = [this.$resizeTarget.$el, ...cells]
    allCells.forEach(node => node.style.width = newWidth)
    this.mousePageX = null
    this.resizeTargetX = null
  }

  startResizeRow(event) {
    this.addResizeMarker(false, { top: event.pageY - 98 + 'px' })
    this.resizeTargetY = event.pageY - 98
  }

  finishResizeRow() {
    const coords = this.$resizeTarget.getCoords()
    const delta = this.resizeTargetY - this.mousePageY
    const newHeight = coords.height - delta + 'px'
    this.$resizeTarget.css({ height: newHeight })
    this.mousePageY = null
    this.resizeTargetY = null
  }

  onMousemove(e) {
    if (this.resizeType === 'col') {
      this.mousePageX = e.pageX
      this.$resizeMarker.css({ left: e.pageX + 'px' })
    } else if (this.resizeType === 'row') {
      const yCoord = e.pageY - 98
      this.mousePageY = yCoord
      this.$resizeMarker.css({ top: yCoord + 'px' })
    }
  }

  onMousedown(e) {
    const resizeTarget = e.target
    const resizeType = resizeTarget.dataset.resize
    if (!resizeType) return

    e.preventDefault()
    const $resizeTarget = resizeTarget.closest('[data-type="resizable"]')

    this.resizeType = resizeType
    this.$resizeTarget = $($resizeTarget)
    this.onMousemove = this.onMousemove.bind(this)

    if (resizeType === 'col') {
      window.onmousemove = e => this.onMousemove(e)
    } else if (resizeType === 'row') {
      this.$root.$el.onmousemove = e => this.onMousemove(e)
    }
    

    if (resizeType === 'col') {
      this.startResizeCol(e)
    } else if (resizeType === 'row') {
      this.startResizeRow(e)
    }
  }

  onMouseup() {
    if (this.$resizeTarget) {
      this.resizeType === 'col' ? this.finishResizeCol() : this.finishResizeRow()
    }


    window.onmousemove = null
    this.$root.removeChild(this.$resizeMarker.$el)
    this.$resizeMarker = null
    this.$resizeTarget = null
    this.resizeType = null
  }

  toHTML() {
    return createTable()
  }
}