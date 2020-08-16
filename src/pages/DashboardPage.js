import Page from "@core/Page";
import $ from '@core/dom'

export default class DashboardPage extends Page {
  constructor(...args) {
    super(...args)
  }

  getRoot() {
    return $.create('div', 'container').html(
      `
        <div class="dashboard__header">
          <h1>Excel Dashboard</h1>
        </div>

        <div class="dashboard__new">
          <div class="dashboard__view">
            <a href="#" class="dashboard__create">
              Create <br />
              Table
            </a>
          </div>
        </div>

        <div class="dashboard__table dashboard__view">
          <div class="dashboard__list-header">
            <span>table name</span>
            <span>Last modified</span>
          </div>

          <ul class="dashboard__list">
            <li class="dashboard__record">
              <a href="#">Table #1</a>
              <strong>12.06.2020</strong>
            </li>
            <li class="dashboard__record">
              <a href="#">Table #2</a>
              <strong>12.06.2020</strong>
            </li>
          </ul>
        </div>
      `
    )
  }

  afterRender() {}

  destroy() {}
}