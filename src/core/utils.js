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

export const isEqual = (a, b) => {
  if (typeof a === 'Object' && typeof b === 'Object') {
    return JSON.stringify(a) === JSON.stringify(a)
  }

  return a === b
}

export const camelToDashCase = str => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export function debounce (fn, wait) {
  let timeout
  return (...args) => {
    function later () {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const parseFormula = (value = '') => {
  if (value.startsWith('=')) {
    try {
      const parsedValue = eval(value.slice(1))
      return parsedValue
    } catch (err) {
      return value
    }
  }

  return value
}

export const preventDefault = event => event.preventDefault()