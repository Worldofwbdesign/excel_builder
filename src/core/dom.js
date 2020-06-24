class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    } else {
      this.$el.outerHTML.trim()
    }
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  removeChild(child) {
    return this.$el.removeChild(child)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  selectAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  innerText() {
    return this.$el.innerText
  }

  css(newStyles = {}) {
    Object.entries(newStyles).forEach(([key, value]) => {
      this.$el.style[key] = value
    })
  }
}

export default function $(selector) {
  return new Dom(selector)
}

$.create = (tag, classes = '') => {
  const el = document.createElement(tag)
  if (classes) {
    if (typeof classes === 'object') {
      classes.forEach(c => el.classList.add(c))
    } else {
      el.classList.add(classes)
    }
  }

  return $(el)
}