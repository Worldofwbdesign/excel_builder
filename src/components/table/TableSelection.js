export class TableSelection {
  constructor() {
    this.group = []
    this.current = null
  }

  clear() {
    this.group.forEach($el => $el.removeClass('selected'))
    this.group = []
  }

  select($el) {
    this.clear()
    this.current = $el
    this.group.push($el)
    $el.addClass('selected')
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    $group.forEach($el => $el.addClass('selected'))
  }
}