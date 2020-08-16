import $ from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { debounce } from '@core/utils';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      storageKeys: ['currentText'],
      ...options,
    })
  }

  init(){
    super.init()
    this.$input = this.$root.findOne('#formula-input')

    

    this.$on('table:select', $cell => {
      this.$input.text($cell.data.formula)
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput.bind(this), 1000)
  }

  storageChanged(state) {
    this.$input.text(state.currentText)
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