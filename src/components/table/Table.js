import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import $ from '@core/dom'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup']
    })
    this.className = 'excel__table'
  }

  addResizeMarker(isCol) {
    const $resizerMarker = $.create('div', ['resize-marker', isCol ? '-col' : '-row'])
    this.$root.append($resizerMarker)
    this.$resizeMarker = $resizerMarker
  }

  startResizeCol(event) {
    this.addResizeMarker(true)
    this.resizeTarget = event.target.closest('[data-type="resizable"]')
    this.resizeTargetX = event.pageX
  }

  finishResizeCol() {
    const delta = this.resizeTargetX - this.mousePageX
    const newWidth = this.resizeTarget.offsetWidth - delta + 'px'
    
    const cells = this.$root.selectAll(`[data-col="${this.resizeTarget.innerText}"]`)
    const allCells = [this.resizeTarget, ...cells]
    allCells.forEach(node => node.style.width = newWidth)
    this.mousePageX = null
    this.resizeTargetX = null
  }

  startResizeRow(event) {
    this.addResizeMarker()
    this.resizeTarget = event.target.closest('[data-type="resizable"]')
    this.resizeTargetY = event.pageY
  }

  finishResizeRow() {
    const delta = this.resizeTargetY - this.mousePageY
    const newHeight = this.resizeTarget.offsetHeigth - delta + 'px'
    this.resizeTarget.style.height = newHeight
    this.mousePageX = null
    this.resizeTargetX = null
  }

  onMousemove(e) {
    if (this.resizeType === 'col') {
      this.mousePageX = e.pageX
      this.$resizeMarker.css({ left: e.pageX + 'px' })
    } else if (this.resizeType === 'row') {
      this.mousePageY = e.pageY
      this.$resizeMarker.css({ top: e.pageY + 'px' })
    }
  }

  onMousedown(e) {
    e.preventDefault()
    const resizeTarget = e.target
    const resizeType = resizeTarget.dataset.resize

    this.resizeType = resizeType
    this.onMousemove = this.onMousemove.bind(this)
    if (resizeType === 'col') {
      window.onmousemove = e => this.onMousemove(e, resizeType)
    } else {
      this.$root.onmousemove = e => this.onMousemove(e, resizeType)
    }
    

    if (resizeType === 'col') {
      this.startResizeCol(e)
    } else if (resizeType === 'row') {
      this.startResizeRow(e)
    }
  }

  onMouseup() {
    if (this.resizeTargetX) {
      this.resizeType === 'col' ? this.finishResizeCol() : this.finishResizeRow()
    }


    window.onmousemove = null
    this.$root.removeChild(this.$resizeMarker.$el)
    this.$resizeMarker = null
    this.resizeType = null
  }

  toHTML() {
    return createTable()
  }
}