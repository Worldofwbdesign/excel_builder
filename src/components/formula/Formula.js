import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    })
    this.className = 'excel__formula'
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(e) {
    this.emitter.emit('formula:input', e.target.textContent.trim())
  }
}