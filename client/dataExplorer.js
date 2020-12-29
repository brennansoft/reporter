const header = function () {
  let { id } = this;
  return id;
}

const rowspan = function () {
  return this.data.length + 1;
}

const renderTable = state => {
  state.rentalData.forEach(order => {
    order.rowspan = rowspan
    order.header = header
  })

  fetch('./templates/reservationOrder.mustache')
    .then((response) => response.text())
    .then((template) => {
      document
        .getElementById('rental-orders')
        .innerHTML = Mustache.render(template, state)
    })
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
  console.log(state.rentalData)
  renderTable(state)
}

let state = {
  rentalData: null
}

window.addEventListener('load', async () => {
  const form = document.getElementById('uploadForm')
  const fileInput = document.querySelector('#file-input')

  form.onsubmit = parseRentalReport(state, form, fileInput)
})
