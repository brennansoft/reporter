const server = require('./app.js')
const port = 3000

server.app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
