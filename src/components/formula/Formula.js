import $ from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
    this.className = 'excel__formula'
  }

  init(){
    super.init()
    this.$input = this.$root.findOne('#formula-input')

    this.$on('table:select', $cell => this.$input.text($cell.text()))
    this.$on('table:input', $cell => this.$input.text($cell.text()))
    // this.$subscribe(state => console.info('Formula subscribe', state))
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula-input" class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text())
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(e.key === 'Enter')) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}