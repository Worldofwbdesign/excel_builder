import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  constructor(...props) {
    super(...props)
    this.className = 'excel__table'
  }

  toHTML() {
    return createTable()
  }
}