const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const parser = require('node-html-parser')
const extractor = require('./dataExtractor.js')
const orders = require('./orders.js')
const app = express()
const port = 3000

app.use(cors())

app.use(fileUpload({ debug: true }))

app.use('/', express.static('client'))

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  let report = req.files.file
  let html = parser.parse(report.data.toString())
  let rentalOrders = extractor.extractAll(html).reduce(orders.append, {})

  let json = Object.getOwnPropertyNames(rentalOrders).map(id => {
    return {
      id,
      data: rentalOrders[id]
    }
  })

  res.send(json)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
