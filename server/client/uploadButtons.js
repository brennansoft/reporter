const AW_RENTAL_INPUT_ID = 'aw-rental-reservation'
const AW_RENTAL_BUTTON_ID = 'aw-rental-reservation-button'

const WITH_SIZES_INPUT_ID = 'arrival-with-sizes'
const WITH_SIZES_BUTTON_ID = 'arrival-with-sizes-button'

window.addEventListener('load', async () => {
  const rentalInput = document.getElementById(AW_RENTAL_INPUT_ID)
  const rentalButton = document.getElementById(AW_RENTAL_BUTTON_ID)

  const withSizesInput = document.getElementById(WITH_SIZES_INPUT_ID)
  const withSizesButton = document.getElementById(WITH_SIZES_BUTTON_ID)

  rentalButton.addEventListener('click', () => rentalInput.click())
})
