import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  constructor(...props) {
    super(...props)
    this.className = 'excel__header'
  }

  toHTML() {
    return `
      <input type="text" class="input" value="New Table" />
      <div class="btnsWrapp">
        <div class="button">
          <i class="material-icons">
            exit_to_app
          </i>
        </div>
        <div class="button">
          <i class="material-icons">
            delete
          </i>
        </div>
      </div>
    `
  }
}