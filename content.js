const cookieTexts = [
  'Aceptar',
  'Accept',
  'Aceptar todo',
  'Allow all',
  'I agree',
  'Accept all',
]

function removeCookieBanners() {
  const buttons =
    document.querySelectorAll('button')

  buttons.forEach((button) => {
    const text =
      button.innerText?.trim()

    if (
      cookieTexts.includes(text)
    ) {
      const banner =
        button.closest('div') ||
        button.parentElement

      if (banner) {
        banner.style.display =
          'none'

        console.log(
          'Banner ocultado'
        )
      }
    }
  })
}

setInterval(
  removeCookieBanners,
  2000
)