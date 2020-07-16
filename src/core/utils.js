export const capitalize = string => {
  if (typeof string !== 'string') {
    return ''
  }
  
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const storage = (key, data) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }

  return localStorage.setItem(key, JSON.stringify(data))
}