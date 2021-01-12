const request = require('supertest')
const assert = require('assert')
const { app } = require('../app')
const path = require('path')
const { expect } = require('chai')

describe('GET /', () => {
  it('is successfull', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})

describe('POST /upload', () => {
  const testFile = path.join(__dirname, 'fixtures', '20201231.html')

  const postData = () => {
    return request(app)
      .post('/upload')
      .attach('rentalReservation', testFile)
  }

  it('returns json', (done) => {
    postData()
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('returns the expected data', (done) => {
    postData()
      .end((err, res) => {
        if (err) return done(err)

        const WF17155 = res.body.find(({ id }) => id === 'WF17155')

        assert(WF17155 && WF17155.data)

        let names = WF17155.data.map(([_, first]) => first)

        expect(names.sort()).to.eql([
          'Amanda',
          'Barry',
          'Jeffrey',
          'Spencer',
          'Suzanne'
        ])

        done()
      })
  })
})
