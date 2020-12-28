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
  let data = {}
  let cellsText = Array
    .from(row.querySelectorAll('td'))
    .map(function (cell) {
      return cell.innerText.replaceAll(/^\s+/g, '');
    })

  return {
    'name': cellsText[0],
    'IPCode': cellsText[1],
    'package': cellsText[2],
    'bootSize': cellsText[3],
    'height': cellsText[4],
    'orderID': cellsText[5],
    'extOrderID': cellsText[6]
  }
}
