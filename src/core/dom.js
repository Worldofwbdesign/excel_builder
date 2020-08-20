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

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value
    } else {
      return this.$el.textContent
    }
  }

  get data() {
    return this.$el.dataset
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

  findOne(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
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

  getStyles(props = []) {
    return props.reduce((acc, p) => Object.assign(acc, { [p]: this.$el.style[p] }), {})
  }

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':').map(n => Number(n))
      return { row, col }
    }
    return this.$el.dataset.id
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }

    return this.$el.getAttribute(name)
  }

  value(newValue) {
    if (newValue) {
      this.$el.value = newValue
      return this
    }

    return this.$el.value
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