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

  fetch('./templates/reservationOrders.mustache')
    .then((response) => response.text())
    .then((template) => {
      document
        .getElementById('rental-orders')
        .innerHTML = Mustache.render(template, state)
    })
    .then(() => {
      state.rentalData.forEach(order => {
        JsBarcode('#barcode-' + order.id, order.id)
      })
    })
}
