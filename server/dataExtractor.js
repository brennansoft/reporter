function firstCellText (row) {
  return row.querySelector('td').innerText.replace(/\s/g,'')
}

function getRows (doc) {
  return Array.from(doc.querySelectorAll('tr'))
}

const CUSTOMER_NAME = /^(\w+),(\w+)$/

function isReservationRow (row) {
  return CUSTOMER_NAME.test(firstCellText(row))
}

function getDataRows (doc) {
  let rows = getRows(doc)
  return rows.filter(isReservationRow)
}

function extractRowData (row) {
  let cellsText = Array
    .from(row.querySelectorAll('td'))
    .map(cell => cell.rawText.replace(/^(\s+)|(\s+)$/g, ''))

  return {
    'name': cellsText[0],
    'IPCode': cellsText[1],
    'description': cellsText[2],
    'bootSize': cellsText[3],
    'height': cellsText[4],
    'orderID': cellsText[5],
    'extOrderID': cellsText[6]
  }
}

exports.extractRowData = extractRowData
exports.getDataRows = getDataRows
exports.extractAll = html => getDataRows(html).map(extractRowData)
