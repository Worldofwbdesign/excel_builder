import Page from "@core/page/Page";
import $ from '@core/dom'
import { createTable } from './dashboard.functions'

export default class DashboardPage extends Page {
  constructor(...args) {
    super(...args)
  }

  getRoot() {
    const tableId = Date.now().toString()
    return $.create('div', 'container').html(
      `
        <div class="dashboard__header">
          <h1>Excel Dashboard</h1>
        </div>

        <div class="dashboard__new">
          <div class="dashboard__view">
            <a href="#excel/${tableId}" class="dashboard__create">
              Create <br />
              Table
            </a>
          </div>
        </div>
        ${createTable()}
      `
    )
  }

  afterRender() {}

  destroy() {}
}