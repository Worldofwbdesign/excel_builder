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
      value: { textAlign: 'left' },
      active: state.textAlign === 'left',
    },
    {
      icon: 'format_align_center',
      value: { textAlign: 'center' },
      active: state.textAlign === 'center',
    },
    {
      icon: 'format_align_right',
      value: { textAlign: 'right' },
      active: state.textAlign === 'right',
    },
    {
      icon: 'format_bold',
      value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
      active: state.fontWeight === 'bold'
    },
    {
      icon: 'format_italic',
      value: { fontStyle: state.fontStyle === 'italic' ? 'none' : 'italic' },
      active: state.fontStyle === 'italic',
    },
    {
      icon: 'format_underlined',
      value: { textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline' },
      active: state.textDecoration === 'underline',
    },
  ]

  return buttons.map(toButton).join('')
}