exports.append = (data, row) => {
  let { extOrderID, firstName, lastName, description, bootSize, height } = row

  if (!data.hasOwnProperty(extOrderID)) {
    data[extOrderID] = []
  }

  data[extOrderID].push([lastName, firstName, description, bootSize, height])

  return data
}
