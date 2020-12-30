const path = require('path')
const fs = require('fs')
const { expect } = require('chai')
const parser = require('node-html-parser')

describe('getDataRows', () => {
  const { getDataRows } = require(path.join(__dirname, '..', 'dataExtractor.js'))
  const testFilePath = path.join(__dirname, 'fixtures', '20201231.html')

  let output
  let html

  beforeEach(() => {
    html = fs.readFileSync(testFilePath, { encoding: 'utf-8' }).toString()
    output = getDataRows(parser.parse(html))
  })

  it('returns an array', () => {
    expect(output).to.be.an.instanceof(Array)
  })

  it('includes expected data', () => {

  })
})
