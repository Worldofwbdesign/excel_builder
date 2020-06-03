import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  constructor(...props) {
    super(...props)
    this.className = 'excel__formula'
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }
}