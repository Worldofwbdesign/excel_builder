class Dom {

}

export default function $() {
  return new Dom()
}

$.create = (tag, classes = '') => {
  const el = document.createElement(tag)
  if (classes) {
    el.classList.add(classes)
  }

  return el
}