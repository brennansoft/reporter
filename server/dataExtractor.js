function firstCellText (row) {
  return row.querySelector('td').innerText.replace(/\s/g, '')
}

function getRows (doc) {
  return Array.from(doc.querySelectorAll('tr'))
}

const CUSTOMER_NAME = /^(?<lastName>[\w\s'\-]+),\s?(?<firstName>[\w\s]+)$/i

function isCustomerName (string) {
  return CUSTOMER_NAME.test(string)
}

function isReservationRow (row) {
  let txt = firstCellText(row)
  return isCustomerName(txt)
}

function getDataRows (doc) {
  let rows = getRows(doc)
  return rows.filter(isReservationRow)
}

function extractRowData (row) {
  let cellsText = Array
    .from(row.querySelectorAll('td'))
    .map(cell => cell.rawText.replace(/^(\s+)|(\s+)$/g, ''))

  let data = {
    'name': cellsText[0],
    'IPCode': cellsText[1],
    'description': cellsText[2],
    'bootSize': cellsText[3],
    'height': cellsText[4],
    'orderID': cellsText[5],
    'extOrderID': cellsText[6]
  }

  // https://stackoverflow.com/questions/11477415/why-does-javascripts-regex-exec-not-always-return-the-same-value
  CUSTOMER_NAME.lastIndex = 0
  let match = CUSTOMER_NAME.exec(cellsText[0])

  if (match) {
    let { firstName, lastName } = match.groups
    data.firstName = firstName
    data.lastName = lastName
  }

  return data
}

exports.isCustomerName = isCustomerName
exports.firstCellText = firstCellText
exports.extractRowData = extractRowData
exports.getDataRows = getDataRows
exports.extractAll = html => getDataRows(html).map(extractRowData)
