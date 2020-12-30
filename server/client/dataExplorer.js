let state = {
  rentalData: null
}

const parseRentalReport = (state, form, fileInput) => async event => {
  event.preventDefault()
  const formData = new FormData()

  formData.append('file', fileInput.files[0])

  const options = {
    method: 'POST',
    body: formData
  }

  const response = await fetch(form.getAttribute('action'), options)
  state.rentalData = await response.json()
  // renderTable(state)
  envelopesTemplate.render(state)
}

window.addEventListener('load', async () => {
  const form = document.getElementById('uploadForm')
  const fileInput = document.querySelector('#file-input')

  form.onsubmit = event => {
    parseRentalReport(state, form, fileInput)(event)
    document.getElementById('uploadForm').setAttribute('style', 'display: none')
  }
})
