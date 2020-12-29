const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = 3000

app.use('/', express.static('client'))

app.use(fileUpload({ debug: true }))

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  let report = req.files.report

  res.send(report.data.toString())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
