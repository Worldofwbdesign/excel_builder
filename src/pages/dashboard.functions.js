import {storage} from '@core/utils'

const toHTML = key => {
  const store = storage(key)
  return `
    <li class="dashboard__record">
      <a href="#excel/${key.split(':')[1]}">${store.title}</a>
      <strong>
        ${new Date(store.openedDate).toLocaleDateString()}
          ${new Date(store.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `
}

const getAllKeys = () => {
  const keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.startsWith('excel:')) {
      continue
    }

    keys.push(key)
  }

  return keys
}

export const createTable = () => {
  const keys = getAllKeys()
  return `
    <div class="dashboard__table dashboard__view">
      <div class="dashboard__list-header">
        <span>table name</span>
        <span>Last modified</span>
      </div>

      <ul class="dashboard__list">
        ${keys.map(toHTML).join('')}
      </ul>
    </div>
  `
}