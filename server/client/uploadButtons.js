

window.addEventListener('load', async () => {
  const form = document.getElementById('upload-form')

  const rentalInput = document.getElementById('aw-rental-reservation')
  const rentalButton = document.getElementById('aw-rental-reservation-button')

  const withSizesInput = document.getElementById('arrival-with-sizes')

  const hideHeader = () => {
    document.getElementById('header').setAttribute('style', 'display: none')
  }

  rentalButton.addEventListener('click', () => {
    rentalInput.click()
  })

  rentalInput.addEventListener('change', async () => {
    let { inputFiles } = state

    inputFiles.reservations = true
    rentalButton.className = rentalButton.className
      .replace('button-pending', 'button-success')

    await parseRentalReport(state, form, rentalInput, withSizesInput)
    hideHeader()
  })
})
