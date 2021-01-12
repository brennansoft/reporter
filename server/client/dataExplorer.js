let state = {
  rentalData: null,
  inputFiles: {
    reservations: false,
    withSizes: false
  }
}

const parseRentalReport = async (state, form, rentalInput, withSizesInput) => {
  const formData = new FormData()

  formData.append('rentalReservation', rentalInput.files[0])
  formData.append('arrivalWithSizes', withSizesInput.files[0])

  const options = {
    method: 'POST',
    body: formData
  }

  const response = await fetch(form.getAttribute('action'), options)
  state.rentalData = await response.json()
  // renderTable(state)
  envelopesTemplate.render(state)

  form.setAttribute('style', 'display: none')
}
