import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup']
    })
    this.className = 'excel__table'
  }

  toHTML() {
    return createTable()
  }

  startResizeCol(event) {
    this.resizeTarget = event.target.closest('[data-type="resizable"]')
    this.resizeTargetX = event.pageX
  }

  finishResizeCol() {
    const delta = this.resizeTargetX - this.mousePageX
    const newWidth = this.resizeTarget.offsetWidth - delta + 'px'
    this.resizeTarget.style.width = newWidth
    
    const cells = document.querySelectorAll(`[data-col="${this.resizeTarget.innerText}"]`)
    const allCells = [this.resizeTarget, ...cells]
    allCells.forEach(node => node.style.width = newWidth)
  }

  onMousemove(e) {
    this.mousePageX = e.pageX
  }

  onMousedown(e) {
    e.preventDefault()
    const resizeTarget = e.target
    const resizeType = resizeTarget.dataset.resize

    window.onmousemove = mouseMoveEvent => {
      this.mousePageX = mouseMoveEvent.pageX
    }

    if (resizeType === 'col') {
      this.startResizeCol(e)
    }
  }

  onMouseup(e) {
    const resizeTarget = e.target
    const resizeType = resizeTarget.dataset.resize
    if (this.resizeTargetX) {
      this.finishResizeCol()
    }


    window.removeEventListener('mousemove', this.onMousemove)
    this.mousePageX = null
    this.resizeTargetX = null
  }
}