const toButton = button => {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
    <div
      class="button ${button.active ? 'active' : ''}"
      ${meta}
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

export function createToolbar(state) {
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
      value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
      active: state.fontWeight === 'bold'
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