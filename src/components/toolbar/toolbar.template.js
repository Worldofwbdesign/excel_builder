const toButton = button => {
  const meta = `data-type="button"`
  return `
    <div
      class="button ${button.active ? 'active' : ''}"
      ${meta}
      data-value='${JSON.stringify(button.value)}'
    >
      <i
        class="material-icons"
        ${meta}
      >
        ${button.icon}
      </i>
    </div>
  `
}

export function createToolbar() {
  const buttons = [
    {
      icon: 'format_align_left',
      value: { textAlign: 'left' }
    },
    {
      icon: 'format_align_center',
      value: { textAlign: 'center' }
    },
    {
      icon: 'format_align_right',
      value: { textAlign: 'right' }
    },
    {
      icon: 'format_bold',
      value: { fontWeight: 'bold' }
    },
    {
      icon: 'format_italic',
      value: { fontStyle: 'italic' }
    },
    {
      icon: 'format_underlined',
      value: { textDecoration: 'underline' }
    },
  ]

  return buttons.map(toButton).join('')
}