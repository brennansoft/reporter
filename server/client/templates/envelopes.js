const envelopesTemplate = (() => {

  const groupFamilies = order => {
    let families = {}

    order.data.map(person => {
      let [lastName, firstName, product, bootSize] = person

      if (!families.hasOwnProperty(lastName)) {
        families[lastName] = {
          name: lastName,
          members: []
        }
      }

      families[lastName].members.push({
        firstName, product, bootSize
      })
    })

    return Object.values(families)
  }

  const render = async state => {
    let { rentalData } = state

    let envelopes = rentalData.map(order => {

      let families = groupFamilies(order)

      console.log({ families })

      return {
        id: order.id,
        families,
        familyNames: function () {
          return families.map(x => x.name).sort().join(', ')
        }
      }
    })

    fetch('./templates/envelopes.mustache')
      .then(response => response.text())
      .then(template => {
        document
          .getElementById('envelopes-pane')
          .innerHTML = Mustache.render(template, { envelopes })
      })
      .then(() => {
        state.rentalData.forEach(order => {
          JsBarcode('#barcode-' + order.id, order.id)
        })
      })
  }

  return {
    render
  }

})()
