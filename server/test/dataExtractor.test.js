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

describe('isCustomerName', () => {
  const { isCustomerName } = require(path.join(__dirname, '..', 'dataExtractor.js'))

  describe('given two words', () => {
    it('returns true', () => {
      expect(isCustomerName("smith, john")).to.be.true
      expect(isCustomerName("DeWalt, Lisa")).to.be.true
    })
  })

  describe('given an Irish last name', () => {
    it('returns true', () => {
      expect(isCustomerName("O'Bradey, Pat")).to.be.true
    })
  })

  describe('given a Dutch last name', () => {
    it('returns true', () => {
      expect(isCustomerName("Van Der Beek, James")).to.be.true
    })
  })

  describe('given a report info cell', () => {
    let string1 = "Copyright&#169;2003-2020TheActiveNetworkPage2of3"
    let string2 = "UserName=ChrisBoedeker;ReportDate=12/30/202012:50PM;BeginDate=12/31/2020;EndDate=12/31/2020;BusinessUnit=WhitefishMountainResort;RentalLocation=VillageRentals;UseProductDate=Y"
    it('returns false', () => {
      expect(isCustomerName(string1)).to.be.false
      expect(isCustomerName(string2)).to.be.false
    })
  })
})