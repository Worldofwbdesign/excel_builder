import $ from '@core/dom'

export class TableResize {
  constructor($root) {
    this.$root = $root
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

  onMousedown(e, resizeType) {
    e.preventDefault()
    const $resizeTarget = $(e.target.closest('[data-type="resizable"]'))
    this.resizeType = resizeType
    this.$resizeTarget = $resizeTarget
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)

    if (resizeType === 'col') {
      window.onmousemove = this.onMousemove
    } else if (resizeType === 'row') {
      this.$root.$el.onmousemove = this.onMousemove
    }
    
    window.onmouseup = this.onMouseup

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
    window.onmouseup = null
    if (this.$resizeMarker) {
      this.$root.removeChild(this.$resizeMarker.$el)
    }
    this.$resizeMarker = null
    this.$resizeTarget = null
    this.resizeType = null
  }
}