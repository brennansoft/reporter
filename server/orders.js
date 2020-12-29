exports.append = (data, row) => {
  let { extOrderID, name, description, bootSize, height } = row

  if (!data.hasOwnProperty(extOrderID)) {
    data[extOrderID] = []
  }

  data[extOrderID].push([name, description, bootSize, height])

  return data
}
