const toHTML = key => `
  <li class="dashboard__record">
    <a href="#excel/${key.split(':')[1]}">Table #1</a>
    <strong>12.06.2020</strong>
  </li>
`

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
        ${keys.map(toHTML)}
      </ul>
    </div>
  `
}