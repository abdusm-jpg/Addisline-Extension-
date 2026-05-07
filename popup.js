const toggleButton =
  document.getElementById(
    'toggleButton'
  )

const status =
  document.getElementById(
    'status'
  )

let protectionEnabled =
  false

toggleButton.addEventListener(
  'click',
  () => {
    protectionEnabled =
      !protectionEnabled

    if (
      protectionEnabled
    ) {
      status.innerText =
        'Protección activada'

      toggleButton.innerText =
        'Desactivar protección'

      toggleButton.style.background =
        '#ef4444'
    } else {
      status.innerText =
        'Protección desactivada'

      toggleButton.innerText =
        'Activar protección'

      toggleButton.style.background =
        '#22c55e'
    }
  }
)